'use client'
import Image from "next/image";
import Navbar from "../navbar";
import Playerlist from "./playerlist";

export default function Roster() {
  return (
    <main>
      <Navbar/>
      <h1>Open Spots: </h1>
      <Playerlist/>
    </main>
  );
}