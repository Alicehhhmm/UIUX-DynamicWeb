import React from 'react'
import { Hero } from '@/components/Hero'

const App = () => {
    return (
        <main className='relative min-h-screen w-screen overflow-x-hidden'>
            <Hero />
            <div className='bg-green-500 min-h-screen'></div>
        </main>
    )
}

export default App
