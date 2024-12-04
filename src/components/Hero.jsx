import { useState, useRef } from 'react'

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

    const getVideoSrc = index => `videos/hero-${index}.mp4`

    return (
        <div className='relative h-dvh w-screen overflow-x-hidden'>
            <div id='video' className='relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75'>
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
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}
