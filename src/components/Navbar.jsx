import { useEffect, useRef, useState } from 'react'

import clsx from 'clsx'
import gsap from 'gsap'
import { useWindowScroll } from 'react-use'

import { Button } from '@/components/ui/button'
import { TiLocationArrow } from 'react-icons/ti'

const navItems = ['Nexus', 'Vault', 'Prologue', 'About', 'Contact']

export const Navbar = () => {
    //音频和导航容器
    const audioElementRef = useRef(null)
    const navContainerRef = useRef(null)

    // 切换音频和视觉指示器的状态
    const [isAudioPlaying, setIsAudioPlaying] = useState(false)
    const [isIndicatorActive, setIsIndicatorActive] = useState(false)

    const { y: currentScrollY } = useWindowScroll()
    const [isNavVisible, setIsNavVisible] = useState(true)
    const [lastScrollY, setLastScrollY] = useState(0)

    // 切换音频和视觉指示
    const toggleAudioIndicator = () => {
        setIsAudioPlaying(prev => !prev)
        setIsIndicatorActive(prev => !prev)
    }

    // 音频播放管理
    useEffect(() => {
        if (isAudioPlaying) {
            audioElementRef.current.play()
        } else {
            audioElementRef.current.pause()
        }
    }, [isAudioPlaying])

    useEffect(() => {
        if (currentScrollY === 0) {
            //顶部位置：显示没有浮动导航的导航条
            setIsNavVisible(true)
            navContainerRef.current.classList.remove('floating-nav')
        } else if (currentScrollY > lastScrollY) {
            //向下滚动：隐藏导航条并应用浮动导航
            setIsNavVisible(false)
            navContainerRef.current.classList.add('floating-nav')
        } else if (currentScrollY < lastScrollY) {
            //向上滚动：显示导航栏浮动导航
            setIsNavVisible(true)
            navContainerRef.current.classList.add('floating-nav')
        }

        setLastScrollY(currentScrollY)
    }, [currentScrollY, lastScrollY])

    // 滚动条下拉：导航栏谈化并隐藏
    useEffect(() => {
        gsap.to(navContainerRef.current, {
            y: isNavVisible ? 0 : -100,
            opacity: isNavVisible ? 1 : 0,
            duration: 0.2,
        })
    }, [isNavVisible])

    return (
        <div
            ref={navContainerRef}
            className='rounded-md fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6'
        >
            <header className='absolute top-1/2 w-full -translate-y-1/2'>
                <nav className='flex size-full items-center justify-between p-4'>
                    {/* LOGO */}
                    <div className='flex items-center gap-7'>
                        <img src='/img/logo.png' alt='logo' className='w-10' />

                        <Button
                            id='product-button'
                            title='Products'
                            rightIcon={<TiLocationArrow />}
                            containerClass='bg-blue-50 md:flex hidden items-center justify-center gap-1'
                        />
                    </div>

                    {/* 导航链接和音频开关 */}
                    <div className='flex h-full items-center'>
                        <div className='hidden md:block'>
                            {navItems.map((item, index) => (
                                <a key={index} href={`#${item.toLowerCase()}`} className='nav-hover-btn'>
                                    {item}
                                </a>
                            ))}
                        </div>

                        <button onClick={toggleAudioIndicator} className='ml-10 flex items-center space-x-0.5'>
                            <audio ref={audioElementRef} className='hidden' src='/audio/loop.mp3' loop />

                            {[1, 2, 3, 4].map(bar => (
                                <div
                                    key={bar}
                                    className={clsx('indicator-line', {
                                        active: isIndicatorActive,
                                    })}
                                    style={{
                                        animationDelay: `${bar * 0.1}s`,
                                    }}
                                />
                            ))}
                        </button>
                    </div>
                </nav>
            </header>
        </div>
    )
}
