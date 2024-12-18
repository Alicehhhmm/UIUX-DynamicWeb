import React from 'react'
import { Hero } from '@/components/Hero'
import { About } from '@/components/About'
import { Navbar } from '@/components/Navbar'
import { Features } from '@/components/features/Features'
import { Story } from '@/components/Story'
import Footer from '@/components/Footer'

const App = () => {
    return (
        <main className='relative min-h-screen w-screen overflow-x-hidden '>
            <Navbar />
            <Hero />
            <About />
            <Features />
            <Story />
            <div className='bg-green-500 h-dvh'>DOTO</div>
            <Footer />
        </main>
    )
}

export default App
