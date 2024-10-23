'use client'
import Navbar from "../navbar"
import StarterList from "./starterlist"

export default function Schedule() {
  return (
    <main>
      <Navbar/>
      <h1 className="text-xl px-4 pt-2">Offense Overall: 38</h1>
      <h1 className="text-xl px-4">Defense Overall: 38</h1>
      <h1 className="text-xl px-4">Special Teams Overall: 38</h1>
      <h1 className="text-xl px-4 pb-2">Total Overall: 38</h1>
      <StarterList/>
    </main>
  );
}