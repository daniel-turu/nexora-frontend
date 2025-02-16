import React from 'react'
import Hero from '../components/Hero'
import { PrincipalWelcome } from '../components/PrincipalWelcome'
import { EventNews } from '../components/EventNews'

export const Home = () => {
  return (
    <div className=' relative '>
        <Hero />
        <PrincipalWelcome />
        <EventNews />

    </div>
  )
}
