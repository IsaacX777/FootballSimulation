'use client'
import { AppProvider } from "./context"
import Navbar from "./navbar"
import {useAuthState} from "react-firebase-hooks/auth"
import {auth} from '../firebase/config'

export default function Home() {
  const [user] = useAuthState(auth)
  if(user){
    return(
      <AppProvider>
        <main>
          <Navbar/>
          <h1>Saves</h1>
        </main>
      </AppProvider>
    )
  }
  else{
    return (
      <AppProvider>
        <main>
          <Navbar/>
          <h1>Welcome</h1>
        </main>
      </AppProvider>
    )
  }
}