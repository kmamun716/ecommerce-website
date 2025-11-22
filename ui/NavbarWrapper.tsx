"use client"
import React from 'react'
import Navbar from './Navbar'
import { SessionProvider } from 'next-auth/react'
import { AppContextProvider } from '@/context/AppContext';


function NavbarWrapper({ children }: { children: React.ReactNode }) {
  return (
    <AppContextProvider>
      <SessionProvider>
        <Navbar />
        {children}
      </SessionProvider>
    </AppContextProvider>
  )
}

export default NavbarWrapper