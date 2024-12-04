import { useEffect, useState, useRef } from 'react'

import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/all'

import { TiLocationArrow } from 'react-icons/ti'
import { Button } from '@/components/ui/button'

// 必须启用插件：才能使用监听滚动条的变化
gsap.registerPlugin(ScrollTrigger)

export const Hero = () => {
    const [currentIndex, setCurrentIndex] = useState(1)
    const [hasClicked, setHasClicked] = useState(false)

    const [loading, setLoading] = useState(true)
    const [loadedVideos, setLoadedVideos] = useState(0)

    const totalVideos = 4 // 默认视频循环数量
    const nextVdRef = useRef(null)

    const handleVideoLoad = () => {
        setLoadedVideos(prev => prev + 1)
    }

    useEffect(() => {
        if (loadedVideos === totalVideos - 1) {
            setLoading(false)
        }
    }, [loadedVideos])

    // 鼠标点击切换下一个视频
    const handleMiniVdClick = () => {
        setHasClicked(true)

        /**
         * 取余循环法
         * 0 % 4 = 0 + 1 => 1
         * 1 % 4 = 1 + 1 => 2
         * 2 % 4 = 2 + 1 => 3
         * 3 % 4 = 3 + 1 => 4
         * 4 % 4 = 0 + 1 => 1
         */
        setCurrentIndex(prevIndex => (prevIndex % totalVideos) + 1)
    }

    // 动画: 点击视频切换时：由内向外（四周）过渡切换内容
    useGSAP(
        () => {
            if (hasClicked) {
                gsap.set('#next-video', { visibility: 'visible' })
                gsap.to('#next-video', {
                    transformOrigin: 'center center',
                    scale: 1,
                    width: '100%',
                    height: '100%',
                    duration: 1,
                    ease: 'power1.inOut',
                    onStart: () => nextVdRef.current.play(),
                })
                gsap.from('#current-video', {
                    transformOrigin: 'center center',
                    scale: 0,
                    duration: 1.5,
                    ease: 'power1.inOut',
                })
            }
        },
        {
            dependencies: [currentIndex],
            revertOnUpdate: true,
        }
    )

    // 动画：使用鼠标滚轮时
    // 路径库：https://bennettfeely.com/clippy/
    // 角度库：https://9elements.github.io/fancy-border-radius/#100.51.100.61--.
    useGSAP(() => {
        gsap.set('#video-frame', {
            clipPath: 'polygon(14% 0, 72% 0, 88% 90%, 0 95%)',
            borderRadius: '0% 0% 40% 10%',
        })
        gsap.from('#video-frame', {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            borderRadius: '0% 0% 0% 0%',
            ease: 'power1.inOut',
            scrollTrigger: {
                trigger: '#video-frame',
                start: 'center center',
                end: 'bottom center',
                scrub: true,
            },
        })
    })

    const getVideoSrc = index => `videos/hero-${index}.mp4`

    return (
        <div className='relative h-dvh w-screen overflow-x-hidden'>
            {loading && (
                <div className='flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-50'>
                    {/* https://uiverse.io/G4b413l/tidy-walrus-92 */}
                    <div className='three-body'>
                        <div className='three-body__dot'></div>
                        <div className='three-body__dot'></div>
                        <div className='three-body__dot'></div>
                    </div>
                </div>
            )}
            <div id='video-frame' className='relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75'>
                <section>
                    <div className='mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg'>
                        <div
                            onClick={handleMiniVdClick}
                            className='origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100'
                        >
                            <video
                                ref={nextVdRef}
                                src={getVideoSrc((currentIndex % totalVideos) + 1)}
                                loop
                                muted
                                id='current-video'
                                className='size-64 origin-center scale-150 object-cover object-center'
                                onLoadedData={handleVideoLoad}
                            />
                        </div>
                    </div>

                    {/* 一下个需要播放的视频 */}
                    <video
                        ref={nextVdRef}
                        src={getVideoSrc(currentIndex)}
                        loop
                        muted
                        id='next-video'
                        className='absolute-center invisible absolute z-20 size-64 object-cover object-center'
                        onLoadedData={handleVideoLoad}
                    />

                    {/* 背景视频：自动播放 */}
                    <video
                        src={getVideoSrc(currentIndex === totalVideos - 1 ? 1 : currentIndex)}
                        autoPlay
                        loop
                        muted
                        className='absolute left-0 top-0 size-full object-cover object-center'
                        onLoadedData={handleVideoLoad}
                    />

                    {/* 右下角标题 */}
                    <h1 className='absolute bottom-5 right-5 z-40 text-blue-75 special-font hero-heading'>
                        G<b>A</b>MING
                    </h1>

                    {/* 左上角标题 */}
                    <div className='absolute left-0 top-0 z-40 size-full'>
                        <div className='mt-24 px-5 sm:px-10'>
                            <h1 className='special-font hero-heading text-blue-100'>
                                redefi<b>n</b>e
                            </h1>

                            <p className='mb-5 max-w-64 font-robert-regular text-blue-100'>
                                Enter the Metagame Layer <br /> Unleash the Play Economy
                            </p>
                            <Button
                                id='watch-trailer'
                                title='Watch trailer'
                                leftIcon={<TiLocationArrow />}
                                containerClass=' flex-center gap-1 bg-yellow-300'
                            />
                        </div>
                    </div>
                </section>
            </div>
            {/* 底部：文字重叠效果 */};
            <h1 className='special-font hero-heading absolute bottom-5 right-5 text-black'>
                G<b>A</b>MING
            </h1>
        </div>
    )
}
