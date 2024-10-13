'use client'
import { useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import Link from "next/link";


export default function Navbar() {
    const [fileOpen, setFileOpen] = useState(false);
    const [playOpen, setPlayOpen] = useState(false);

    return(
        <nav className="bg-gray-800">
            <div className="container mx-auto flex justify-between">
                <Link className="text-center text-xl text-white font-semibold p-2" href="/">Football Simulation</Link>
                <div className="flex">
                    <div className="relative">
                        <button className="hover:bg-gray-500 h-full px-2" onMouseEnter={() => setFileOpen(true)} onMouseLeave={() => setFileOpen(false)}>
                            <span className="mr-2">File</span>
                            <FontAwesomeIcon icon={faChevronDown} className="text-white"/>
                        </button>
                        {fileOpen && (
                            <div className="absolute bg-gray-700 text-white shadow-lg w-32" onMouseEnter={() => setFileOpen(true)} onMouseLeave={() => setFileOpen(false)}>
                                <button className="block w-full text-left px-4 py-1 hover:bg-gray-600">
                                    Select File
                                </button>
                                <button className="block w-full text-left px-4 py-1 hover:bg-gray-600">
                                    Save File
                                </button>
                            </div>
                        )}
                    </div>
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
                </div>
            </div>
        </nav>
    )
}