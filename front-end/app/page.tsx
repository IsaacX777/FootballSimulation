'use client'
import { AppProvider } from "./context"
import Navbar from "./navbar"

export default function Home() {
  return (
    <AppProvider>
      <main>
        <Navbar/>
        <h1>home</h1>
      </main>
    </AppProvider>
  )
}