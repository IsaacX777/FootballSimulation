'use client'
import Image from "next/image";
import Navbar from "../navbar";
import Playerlist from "./playerlist";
import { AppProvider } from "../context";

export default function Roster() {
  return (
    <AppProvider>
      <Navbar/>
      <h1>Open Spots: </h1>
      <Playerlist/>
    </AppProvider>
  );
}