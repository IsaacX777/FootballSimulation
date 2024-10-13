import { createContext, useContext, useState, ReactNode } from 'react';
import Player from './classes/player';
import Contract from './classes/contract';

const defaultRoster: Map<string, Player[]> = new Map([
    ["QB", new Array<Player>(new Player("joe mama", "QB", new Contract(100000, 1, 2025)))],
    ["WR", new Array<Player>(new Player("joe mama", "QB", new Contract(100000, 1, 2025)))],
    ["RB", new Array<Player>(new Player("joe mama", "QB", new Contract(100000, 1, 2025)))],
    ["TE", new Array<Player>(new Player("joe mama", "QB", new Contract(100000, 1, 2025)))],
    ["OL", new Array<Player>(new Player("joe mama", "QB", new Contract(100000, 1, 2025)))],
    ["DL", new Array<Player>(new Player("joe mama", "QB", new Contract(100000, 1, 2025)))],
    ["LB", new Array<Player>(new Player("joe mama", "QB", new Contract(100000, 1, 2025)))],
    ["CB", new Array<Player>(new Player("joe mama", "QB", new Contract(100000, 1, 2025)))],
    ["S", new Array<Player>(new Player("joe mama", "QB", new Contract(100000, 1, 2025)))],
    ["K", new Array<Player>(new Player("joe mama", "QB", new Contract(100000, 1, 2025)))],
    ["P", new Array<Player>(new Player("joe mama", "QB", new Contract(100000, 1, 2025)))]
])

const defaultStarters: Map<string, Player[]> = new Map([

])

interface AppContextType {
    roster: Map<string, Player[]>
    setRoster: (roster: Map<string, Player[]>) => void
    starters: Map<String, Player[]>
    setStarters: (starters: Map<string, Player[]>) => void
}

const AppContext = createContext<AppContextType>({
    roster: defaultRoster,
    setRoster: () => {},
    starters: defaultStarters,
    setStarters: () => {}
})

export const AppProvider = ({ children }: { children: ReactNode }) => {
    const [roster, setRoster] = useState<Map<string, Player[]>>(defaultRoster)
    const [starters, setStarters] = useState<Map<string, Player[]>>(defaultStarters)

    return(
        <AppContext.Provider value={{roster, setRoster, starters, setStarters}}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => useContext(AppContext)