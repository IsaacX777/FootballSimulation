import { createContext, useContext, useState, ReactNode } from 'react'
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
    roster: Map<string, Player[]>
    setRoster: (roster: Map<string, Player[]>) => void
    starters: Map<String, Player[]>
    setStarters: (starters: Map<string, Player[]>) => void
    usedNames: string[]
    setUsedNames: (usedNames: string[]) => void
    teams: Map<string, Map<string, string[]>>
    setTeams: (teams: Map<string, Map<string, string[]>>) => void
}

const AppContext = createContext<AppContextType>({
    roster: new Map(),
    setRoster: () => {},
    starters: new Map(),
    setStarters: () => {},
    usedNames: [],
    setUsedNames: () => {},
    teams: teamsMap,
    setTeams: () => {}
})

export const AppProvider = ({ children }: { children: ReactNode }) => {
    const [roster, setRoster] = useState<Map<string, Player[]>>(new Map())
    const [starters, setStarters] = useState<Map<string, Player[]>>(new Map())
    const [usedNames, setUsedNames] = useState<string[]>([])
    const [teams, setTeams] = useState<Map<string, Map<string, string[]>>>(teamsMap)

    return(
        <AppContext.Provider value={{roster, setRoster, starters, setStarters, usedNames, setUsedNames, teams, setTeams}}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => useContext(AppContext)