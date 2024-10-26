'use client'
import Navbar from "../navbar"
import StarterList from "./starterlist"
import { useAppContext } from "../context"
import { useState } from "react"

export default function Schedule() {
  const {roster} = useAppContext()

  const positionGroups = new Map([
    ["Offense", ["QB", "WR", "RB", "TE", "OL"]],
    ["Defense", ["DL", "LB", "CB", "S"]],
    ["Special Teams", ["K", "P"]]
  ])

  const calculateGroupOverall = (group: string) => {
    let totalOverall = 0
    let totalPlayers = 0
    for(const position of positionGroups.get(group)!){
      for(const player of roster.get(position)!.values()){
        if(player.isStarter === true){
          totalOverall += player.attributes.overall
          totalPlayers ++
        }
      }
    }
    return totalOverall / totalPlayers
  }
  const calculateOverall = () => {
    return (offenseOverall + defenseOverall + specialTeamsOverall) / 3
  }

  const [offenseOverall, setOffenseOverall] = useState(calculateGroupOverall("Offense"))
  const [defenseOverall, setDefenseOverall] = useState(calculateGroupOverall("Defense"))
  const [specialTeamsOverall, setSpecialTeamsOverall] = useState(calculateGroupOverall("Special Teams"))
  const [overall, setOverall] = useState(calculateOverall)

  return (
    <main>
      <Navbar/>
      <h1 className="text-xl px-4 pt-2">Offense Overall: {Math.round(offenseOverall)}</h1>
      <h1 className="text-xl px-4">Defense Overall: {Math.round(defenseOverall)}</h1>
      <h1 className="text-xl px-4">Special Teams Overall: {Math.round(specialTeamsOverall)}</h1>
      <h1 className="text-xl px-4 pb-2">Total Overall: {Math.round(overall)}</h1>
      <StarterList/>
    </main>
  );
}