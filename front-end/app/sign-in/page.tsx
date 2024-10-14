'use client'
import Navbar from "../navbar"
import { useState } from "react"
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth"
import { auth } from "../../firebase/config"
import { useRouter } from "next/navigation"

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth)
    const router = useRouter()
    const [error, setError] = useState(false)

    const handleSignIn = async () => {
        try {
            const res = await signInWithEmailAndPassword(email, password)
            if(res){
                setError(false)
                setEmail("")
                setPassword("")
                router.push("/")
            }
            else{
                setError(true)
            }
        }catch(e){
            console.error(e)
        }
    }

    return (
        <main className="flex flex-col min-h-screen">
            <Navbar/>
            <div className="flex-grow flex items-center justify-center bg-gray-950">
                <div className="bg-gray-800 p-10 rounded-lg shadow-xl w-96">
                    <h1 className="text-white text-2xl mb-5 text-center">Sign In</h1>
                    <input 
                        type="email" 
                        placeholder="Email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        className="w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        className="w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
                    />
                    {error && (
                        <h1 className="text-center text-red-500 mb-4">Invalid Credentials</h1>
                    )}
                    <button onClick={handleSignIn} className="w-full p-3 bg-indigo-600 rounded text-white hover:bg-indigo-500">Sign In</button>
                </div>
            </div>
        </main>
    )
}