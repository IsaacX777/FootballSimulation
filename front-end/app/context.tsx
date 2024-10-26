import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import Player from './classes/player'
import Contract from './classes/contract'
import Attributes from './classes/attributes'
import Stats from './classes/stats'

const teamsMap = new Map([
    ["AFC", new Map([
        ["East", ["Buffalo", "Miami", "New York(J)", "New England"]],
        ["West", ["Kansas City", "Los Angeles(C)", "Denver", "Las Vegas"]],
        ["North", ["Baltimore", "Pittsburgh", "Cincinnati", "Cleveland"]],
        ["South", ["Houston", "Indianapolis", "Tennessee", "Jacksonville"]]
    ])],
    ["NFC", new Map([
        ["East", ["Washington", "Philedelphia", "Dallas", "New York(G)"]],
        ["West", ["San Fransisco", "Seattle", "Arizona", "Los Angeles(R)"]],
        ["North", ["Minnesota", "Detroit", "Chicago", "Green Bay"]],
        ["South", ["Atlanta", "Tampa Bay", "New Orleans", "Carolina"]]
    ])]
])

interface AppContextType {
    roster: Map<string, Map<string, Player>>
    setRoster: (roster: Map<string, Map<string, Player>>) => void
    playerDictionary: Map<string, Player>
    setPlayerDictionary: (playerDictionary: Map<string, Player>) => void
    teams: Map<string, Map<string, string[]>>
    setTeams: (teams: Map<string, Map<string, string[]>>) => void
    selectedSave: string
    setSelectedSave: (selectedSave: string) => void
}

const AppContext = createContext<AppContextType>({
    roster: new Map(),
    setRoster: () => {},
    playerDictionary: new Map(),
    setPlayerDictionary: () => {},
    teams: teamsMap,
    setTeams: () => {},
    selectedSave: "",
    setSelectedSave: () => {}
})

const constructPlayer = (playerData: any) => {
    var careerStats = new Map<string, Map<string, Stats>>()
    for (const year of Object.keys(playerData._stats)) {
        const yearlyStats = new Map<string, Stats>()
        for (const game of Object.keys(playerData._stats[year])) {
            const gameData = playerData._stats[year][game]
            yearlyStats.set(
                game,
                new Stats(
                    gameData._passingYD,
                    gameData._passingTD,
                    gameData._intsThrown,
                    gameData._passingATT,
                    gameData._completions,
                    gameData._rushingYD,
                    gameData._rushingTD,
                    gameData._rushingATT,
                    gameData._fumbles,
                    gameData._targets,
                    gameData._receptions,
                    gameData._receivingYD,
                    gameData._receivingTD,
                    gameData._blockWinRate,
                    gameData._sacksAllowed,
                    gameData._tackles,
                    gameData._sacks,
                    gameData._defensiveTD,
                    gameData._interceptions,
                    gameData._forcedFumbles,
                    gameData._fumbleRecoveries,
                    gameData._extraPointATT,
                    gameData._extraPointGood,
                    gameData._fieldGoalATT,
                    gameData._fieldGoalGood,
                    gameData._puntATT,
                    gameData._puntYD,
                    gameData._kickReturnATT,
                    gameData._kickReturnYD,
                    gameData._kickReturnTD,
                    gameData._puntReturnATT,
                    gameData._puntReturnYD,
                    gameData._puntReturnTD
                )
            )
        }
        careerStats.set(year, yearlyStats)
    }
    return new Player(
        playerData._position,
        new Contract(playerData._contract._salary, playerData._contract._years, playerData._contract._endYear),
        new Attributes(playerData._attributes._age,
            playerData._attributes._skill,
            playerData._attributes._speed,
            playerData._attributes._strength,
            playerData._attributes._endurance,
            playerData._attributes._skillPotential,
            playerData._attributes._speedPotential,
            playerData._attributes._strengthPotential,
            playerData._attributes._endurancePotential
        ),
        careerStats,
        playerData._injuryWeeks,
        playerData._isStarter
    )
}

const initialRoster = () => {
    const savedRoster = localStorage.getItem('roster')
    if (!savedRoster) return new Map<string, Map<string, Player>>()

    const parsedRoster: [string, [string, Player][]][] = JSON.parse(savedRoster)
    const rosterMap = new Map<string, Map<string, Player>>(
        parsedRoster.map(([key, innerArray]: [string, [string, any][]]) => [
            key,
            new Map<string, Player>(
                innerArray.map(([innerKey, playerData]: [string, any]) => [
                    innerKey,
                    constructPlayer(playerData)
                ])
            )
        ])
    )
    for(const position of rosterMap.keys()){
        const entriesArray = Array.from(rosterMap.get(position)!.entries())
        const sortedEntries = entriesArray.sort((a, b) => b[1].attributes.overall - a[1].attributes.overall)
        rosterMap.set(position, new Map(sortedEntries))
    }
    return rosterMap
}

const initialPlayerDictionary = () => {
    const savedPlayerDictionary = localStorage.getItem('playerDictionary')
    if (!savedPlayerDictionary) return new Map<string, Player>()

    const parsedDictionary: [string, any][] = JSON.parse(savedPlayerDictionary)
    return new Map<string, Player>(
        parsedDictionary.map(([key, playerData]: [string, any]) => {
            return [key, constructPlayer(playerData)]
        })
    )
}

const initialSelectedSave = () => {
    const savedSelectedSave = localStorage.getItem('selectedSave')
    if (savedSelectedSave === null) return ""
    return JSON.parse(savedSelectedSave)
}

export const AppProvider = ({ children }: { children: ReactNode }) => {
    const [roster, setRoster] = useState<Map<string, Map<string, Player>>>(initialRoster())
    const [playerDictionary, setPlayerDictionary] = useState<Map<string, Player>>(initialPlayerDictionary())
    const [teams, setTeams] = useState<Map<string, Map<string, string[]>>>(teamsMap)
    const [selectedSave, setSelectedSave] = useState<string>(initialSelectedSave())

    useEffect(() => {
        const serializedRoster = Array.from(roster.entries()).map(([key, innerMap]) => {
            return [key, Array.from(innerMap.entries())]
        })
        localStorage.setItem('roster', JSON.stringify(serializedRoster))
        localStorage.setItem('playerDictionary', JSON.stringify(Array.from(playerDictionary.entries())))
        localStorage.setItem('selectedSave', JSON.stringify(selectedSave))
    }, [roster, playerDictionary, selectedSave])

    return(
        <AppContext.Provider value={{roster, setRoster, playerDictionary, setPlayerDictionary, teams, setTeams, selectedSave, setSelectedSave}}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => useContext(AppContext)