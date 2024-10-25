import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import Player from './classes/player'

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
    starters: Map<string, Map<string, Player>>
    setStarters: (starters: Map<string, Map<string, Player>>) => void
    playerDictionary: Map<string, Player>
    setPlayerDictionary: (playerDictionary: Map<string, Player>) => void
    teams: Map<string, Map<string, string[]>>
    setTeams: (teams: Map<string, Map<string, string[]>>) => void
}

const AppContext = createContext<AppContextType>({
    roster: new Map(),
    setRoster: () => {},
    starters: new Map(),
    setStarters: () => {},
    playerDictionary: new Map(),
    setPlayerDictionary: () => {},
    teams: teamsMap,
    setTeams: () => {}
})

export const AppProvider = ({ children }: { children: ReactNode }) => {
    const [roster, setRoster] = useState<Map<string, Map<string, Player>>>(new Map())
    const [starters, setStarters] = useState<Map<string, Map<string, Player>>>(new Map())
    const [playerDictionary, setPlayerDictionary] = useState<Map<string, Player>>(new Map())
    const [teams, setTeams] = useState<Map<string, Map<string, string[]>>>(teamsMap)

    useEffect(() => {
        const savedRoster = localStorage.getItem('roster');
        const savedStarters = localStorage.getItem('starters');
        const savedPlayerDictionary = localStorage.getItem('playerDictionary');
        
        if (savedRoster) {
            setRoster(new Map(JSON.parse(savedRoster)));
        }

        if (savedStarters) {
            setStarters(new Map(JSON.parse(savedStarters)));
        }

        if (savedPlayerDictionary) {
            setPlayerDictionary(new Map(JSON.parse(savedPlayerDictionary)));
        }
    }, [])

    useEffect(() => {
        const serializedRoster = Array.from(roster.entries()).map(([key, innerMap]) => {
            return [key, Array.from(innerMap.entries())]
        })
        localStorage.setItem('roster', JSON.stringify(serializedRoster));
        localStorage.setItem('starters', JSON.stringify(Array.from(starters.entries())));
        localStorage.setItem('playerDictionary', JSON.stringify(Array.from(playerDictionary.entries())));
    }, [roster, starters, playerDictionary])

    return(
        <AppContext.Provider value={{roster, setRoster, starters, setStarters, playerDictionary, setPlayerDictionary, teams, setTeams}}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => useContext(AppContext)