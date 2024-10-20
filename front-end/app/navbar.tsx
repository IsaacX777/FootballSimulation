'use client'
import { useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import Link from "next/link"
import {useAuthState} from "react-firebase-hooks/auth"
import {auth} from '../firebase/config'
import { signOut } from 'firebase/auth'
import { useRouter } from "next/navigation"

export default function Navbar() {
    const [fileOpen, setFileOpen] = useState(false)
    const [playOpen, setPlayOpen] = useState(false)
    const [user] = useAuthState(auth)
    const router = useRouter()

    return(
        <nav className="bg-gray-800">
            <div className="container mx-auto flex justify-between">
                <Link className="text-center text-xl text-white font-semibold p-2" href="/">Football Simulation</Link>
                <div className="flex">
                    <div className="relative">
                        <button className="hover:bg-gray-500 h-full px-2" onMouseEnter={() => setPlayOpen(true)} onMouseLeave={() => setPlayOpen(false)}>
                            <span className="mr-2">Play</span>
                            <FontAwesomeIcon icon={faChevronDown} className="text-white"/>
                        </button>
                        {playOpen && (
                            <div className="absolute bg-gray-700 text-white shadow-lg w-32" onMouseEnter={() => setPlayOpen(true)} onMouseLeave={() => setPlayOpen(false)}>
                                <Link className="block w-full text-left px-4 py-1 hover:bg-gray-600" href="/roster">Roster</Link>
                                <Link className="block w-full text-left px-4 py-1 hover:bg-gray-600" href="/schedule">Schedule</Link>
                            </div>
                        )}
                    </div>
                    <div className="relative">
                        <button className="hover:bg-gray-500 h-full px-2" onMouseEnter={() => setFileOpen(true)} onMouseLeave={() => setFileOpen(false)}>
                            <FontAwesomeIcon icon={faUser} className="text-white"/>
                            <span className="ml-1 mr-2">{user? user.displayName : "Guest"}</span>
                            <FontAwesomeIcon icon={faChevronDown} className="text-white"/>
                        </button>
                        {fileOpen && !user && (
                            <div className="absolute bg-gray-700 text-white shadow-lg w-32" onMouseEnter={() => setFileOpen(true)} onMouseLeave={() => setFileOpen(false)}>
                                <Link className="block w-full text-left px-4 py-1 hover:bg-gray-600" href="/sign-in">
                                    Sign In
                                </Link>
                                <Link className="block w-full text-left px-4 py-1 hover:bg-gray-600" href="/register">
                                    Register
                                </Link>
                            </div>
                        )}
                        {fileOpen && user && (
                            <div className="absolute bg-gray-700 text-white shadow-lg w-32" onMouseEnter={() => setFileOpen(true)} onMouseLeave={() => setFileOpen(false)}>
                                <button className="block w-full text-left px-4 py-1 hover:bg-gray-600" 
                                    onClick={() => {
                                        signOut(auth) 
                                        router.push("/")}
                                    }>
                                    Sign Out
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}