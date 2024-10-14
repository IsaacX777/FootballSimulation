import { useAppContext } from "@/app/context"
import { useState } from "react"
import Player from "../classes/player"

export default function Playerlist() {
    const defaultOpenPosition = new Map([
        ["QB", true],
        ["WR", true],
        ["RB", true],
        ["TE", true],
        ["OL", true],
        ["DL", true],
        ["LB", true],
        ["CB", true],
        ["S", true],
        ["K", true],
        ["P", true]
    ])

    const {roster, setRoster, starters, setStarters} = useAppContext()
    const [openPosition, setOpenPosition] = useState<Map<string, boolean>>(defaultOpenPosition)

    const togglePosition = (position: string) => {
        const tempMap = new Map(openPosition)
        tempMap.set(position, !openPosition.get(position))
        setOpenPosition(tempMap)
    }
    return(
        <div>
            {Array.from(roster.keys()).map((position: string) => (
                <div key={position} className="my-1">
                    <button onClick={() => togglePosition(position)} className="bg-gray-800 w-full">{position}</button>
                    {openPosition.get(position) && (
                        <div>
                            {Array.from(roster.get(position)!).map((player: Player) => (
                                <div key={player.name}>
                                    <h1>{player.name}</h1>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}