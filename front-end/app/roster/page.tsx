'use client'
import Navbar from "../navbar";
import Playerlist from "./playerlist";
import { useAppContext } from "../context";
import { useState } from "react";

export default function Roster() {
  const {roster} = useAppContext()

  const calculateRosterStats = () => {
    var statMap = new Map<string, number>()
    let totalPlayers = 0
    let totalSalary = 0
    for(const positionList of roster.values()){
      totalPlayers += positionList.length
      for(const player of positionList){
        totalSalary += player.contract.salary
      }
    }
    statMap.set("totalPlayers", totalPlayers)
    statMap.set("totalSalary", totalSalary)

    return statMap
  }

  const [rosterSize, setRosterSize] = useState(calculateRosterStats().get("totalPlayers"))
  const [totalSalary, setTotalSalary] = useState(calculateRosterStats().get("totalSalary"))

  return (
    <main>
      <Navbar/>
      <h1 className="text-xl px-4 pt-2">Roster Size: {rosterSize} / 53</h1>
      <h1 className={`text-xl px-4 pb-2 ${totalSalary! < 250000000 ? "text-green-500" : totalSalary! < 300000000 ? "text-yellow-500" : "text-red-500"}`}>Salary Cap: {totalSalary!/1000000}M / 300M</h1>
      <Playerlist/>
    </main>
  )
}