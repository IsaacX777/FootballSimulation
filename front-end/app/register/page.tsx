'use client'
import Navbar from "../navbar"
import { useState } from "react"
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth"
import { auth } from "../../firebase/config"
import { useRouter } from "next/navigation"
import { updateProfile } from "firebase/auth"

export default function Register() {
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth)
    const router = useRouter()

    const handleRegister = async () => {
        if (!username) {
            return
        }
        if(password == confirmPassword){
            try {
                const res = await createUserWithEmailAndPassword(email, password)
                if(res){
                    await updateProfile(res.user, {
                        displayName: username,
                    })
                    setEmail("")
                    setUsername("")
                    setPassword("")
                    setConfirmPassword("")
                    router.push("/")
                }
            } catch(e){
                console.error(e)
            }
        }
    }

    return (
        <main className="flex flex-col min-h-screen">
            <Navbar/>
            <div className="flex-grow flex items-center justify-center bg-gray-950">
                <div className="bg-gray-800 p-10 rounded-lg shadow-xl w-96">
                    <h1 className="text-white text-2xl mb-5 text-center">Register</h1>
                    <input 
                        type="email" 
                        placeholder="Email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        className="w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
                    />
                    <input 
                        placeholder="Username" 
                        maxLength={15}
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        className="w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        className="w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
                    />
                    <input 
                        type="password" 
                        placeholder="Confirm Password" 
                        value={confirmPassword} 
                        onChange={(e) => setConfirmPassword(e.target.value)} 
                        className="w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
                    />
                    { password != confirmPassword && (
                        <h1 className="text-red-500 mb-4 text-center">Passwords must match</h1>
                    )}
                    <button onClick={handleRegister} className="w-full p-3 bg-indigo-600 rounded text-white hover:bg-indigo-500">Register</button>
                </div>
            </div>
        </main>
    )
}