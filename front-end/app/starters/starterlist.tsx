import { useAppContext } from "@/app/context"
import { useState } from "react"
import SelectPlayer from "./SelectPlayer"

export default function StarterList() {
    const {roster, setRoster, playerDictionary, setPlayerDictionary} = useAppContext()
    const [selectedGroup, setSelectedGroup] = useState<string>("Offense")
    const [selectPlayer, setSelectPlayer] = useState(false)
    const [substituteName, setSubstituteName] = useState<string|null>(null)
    const [benchedName, setBenchedName] = useState<string|null>(null)
    const [selectedPosition, setSelectedPosition] = useState<string|null>(null)

    const changeSelectedGroup = (group: string) => {
        setSelectedGroup(group)
    }
    const starterAmounts = new Map([
        ["QB", 1],
        ["WR", 2],
        ["RB", 2],
        ["TE", 1],
        ["OL", 5],
        ["DL", 4],
        ["LB", 3],
        ["CB", 2],
        ["S", 2],
        ["K", 1],
        ["P", 1]
    ])
    const positionGroups = new Map([
        ["Offense", ["QB", "WR", "RB", "TE", "OL"]],
        ["Defense", ["DL", "LB", "CB", "S"]],
        ["Special Teams", ["K", "P"]]
    ])
    const positionColors = new Map([
        ["QB", "bg-blue-500"],
        ["WR", "bg-green-500"],
        ["RB", "bg-red-500"],
        ["TE", "bg-orange-500"],
        ["OL", "bg-purple-500"],
        ["DL", "bg-blue-500"],
        ["LB", 'bg-green-500'],
        ["CB", "bg-red-500"],
        ["S", "bg-purple-500"],
        ["K", "bg-blue-500"],
        ["P", "bg-green-500"]
    ])
    const generatePlayerCards = (position: string) => {
        var positionList = Array.from(roster.get(position)!.entries()).map(([name, player]) => ({name, player})).filter(({ player }) => player.isStarter)
        const spotsOpen = starterAmounts.get(position)! - positionList.length
        return(
            <div>
                {positionList.map(({ name, player }) => (
                    <div key={name} className="bg-blue-950 rounded p-2 my-2 w-full flex items-center">
                        <button onClick={() => {setSelectPlayer(true); setSelectedPosition(position); setBenchedName(name)}} className={`${positionColors.get(position)} text-white rounded-l p-2 rounded w-10 shadow-2xl mr-2 font-semibold`}>
                            {position}
                        </button>
                        <div className="flex-1 text-left pl-2">
                            <h1 className="text-l font-semibold">{name} - {player.attributes.overall} OVR</h1>
                            <div className="font-thin ml-4 flex items-center justify-between">
                                <div className="space-x-8">
                                    <span>Skill: {player.attributes.skill}</span>
                                    <span>Speed: {player.attributes.speed}</span>
                                    <span>Strength: {player.attributes.strength}</span>
                                    <span>Endurance: {player.attributes.endurance}</span>
                                </div>
                                <div className="flex items-center">
                                    <span>Level: {player.attributes.level}</span>
                                    <div className="w-60 bg-gray-200 rounded-full h-2 mx-4">
                                        <div 
                                            className="bg-green-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full h-full" 
                                            style={{ width: `${player.attributes.exp / Math.round(100 * 1.1**(player.attributes.level - 1))}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                {Array.from({ length: spotsOpen }).map((_, index) => (
                    <div key={index} className="bg-blue-950 rounded p-2 my-2 w-full flex items-center border-red-500 border-2">
                        <button className={`${positionColors.get(position)} text-white rounded-l p-2 rounded w-10 shadow-2xl mr-2 font-semibold`}>
                            {position}
                        </button>
                        <div className="flex-1 text-left pl-2">
                            <h1 className="text-l font-semibold">No Player Available</h1>
                            <h2 className="ml-4">Sign or trade for a player</h2>
                        </div>
                    </div>
                ))}
            </div>
        )
    }
    const changeStarter = () => {
        setSelectPlayer(false)
        roster.get(selectedPosition!)!.get(benchedName!)!.isStarter = false
        roster.get(selectedPosition!)!.get(substituteName!)!.isStarter = true
        playerDictionary.get(benchedName!)!.isStarter = false
        playerDictionary.get(substituteName!)!.isStarter = true
        setBenchedName(null)
        setSubstituteName(null)
        setRoster(new Map(roster))
    }
    return(
        <main>
            <div className="items-center justify-center space-x-3 mx-auto container flex py-2">
                <button onClick={() => changeSelectedGroup("Offense")} className={`w-96 rounded p-1 ${selectedGroup === "Offense" ? "bg-blue-500" : "bg-gray-800"}`}>Offense</button>
                <button onClick={() => changeSelectedGroup("Defense")} className={`w-96 rounded p-1 ${selectedGroup === "Defense" ? "bg-blue-500" : "bg-gray-800"}`}>Defense</button>
                <button onClick={() => changeSelectedGroup("Special Teams")} className={`w-96 rounded p-1 ${selectedGroup === "Special Teams" ? "bg-blue-500" : "bg-gray-800"}`}>Special Teams</button>
            </div>
            {Array.from(positionGroups.get(selectedGroup)!).map((position: string) => (
                <div key={position} className="px-40">
                    {generatePlayerCards(position)}
                </div>
            ))}
            {selectPlayer && (
                <SelectPlayer isOpen={selectPlayer} handleCancel={() => setSelectPlayer(false)} handleConfirm={changeStarter}>
                    <div>
                        <h1 className="text-xl text-center my-1">Select a player:</h1>
                        <div className="h-[60vh] overflow-y-auto">
                            {Array.from(roster.get(selectedPosition!)!.entries()).map(([name, player]) => ({name, player})).filter(({ player }) => !player.isStarter).map(({ name, player }) => (
                                <div key={name} className={`bg-blue-950 rounded p-2 my-2 w-full flex items-center border-2 ${name === substituteName ? "border-blue-500" : "border-transparent"}`}>
                                    <button onClick={() => {setSubstituteName(name)}} className={`${positionColors.get(selectedPosition!)} text-white rounded-l p-2 rounded w-10 shadow-2xl mr-2 font-semibold`}>
                                        {selectedPosition}
                                    </button>
                                    <div className="flex-1 text-left pl-2">
                                        <h1 className="text-l font-semibold">{name} - {player.attributes.overall} OVR</h1>
                                        <div className="font-thin ml-4 flex items-center justify-between">
                                            <div className="space-x-8">
                                                <span>Skill: {player.attributes.skill}</span>
                                                <span>Speed: {player.attributes.speed}</span>
                                                <span>Strength: {player.attributes.strength}</span>
                                                <span>Endurance: {player.attributes.endurance}</span>
                                            </div>
                                            <div className="flex items-center">
                                                <span>Level: {player.attributes.level}</span>
                                                <div className="w-60 bg-gray-200 rounded-full h-2 mx-4">
                                                    <div 
                                                        className="bg-green-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full h-full" 
                                                        style={{ width: `${player.attributes.exp / Math.round(100 * 1.1**(player.attributes.level - 1))}%` }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </SelectPlayer>
            )}
        </main>
    )
}