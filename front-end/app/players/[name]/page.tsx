'use client'
import { useEffect, useState } from 'react'
import { useAppContext } from '@/app/context'
import Navbar from '@/app/navbar'

export default function PlayerPage({ params }: { params: { name: string } }) {

    const [playerName, setPlayerName] = useState<string|null>(null)
    const {playerDictionary} = useAppContext()

    useEffect(() => {
        if (typeof params.name === 'string') {
            setPlayerName(params.name.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '))
        }
    }, [params.name])

    return (
        <main>
            <Navbar/>
            <div>
                <h1>{playerName}</h1>
                <h1>{playerDictionary.get(playerName!)?.contractString}</h1>
            </div>
        </main>
    )
}