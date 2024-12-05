import { gsap } from 'gsap'
import { useState, useRef, useEffect } from 'react'

export const VideoPreview = ({ children }) => {
    const [isHovering, setIsHovering] = useState(false)

    const sectionRef = useRef(null) // Reference for the container section
    const contentRef = useRef(null) // Reference for the inner content

    //处理鼠标在容器上的移动
    const handleMouseMove = ({ clientX, clientY, currentTarget }) => {
        const rect = currentTarget.getBoundingClientRect() //获取容器的尺寸

        const xOffset = clientX - (rect.left + rect.width / 2) // 计算X偏移量
        const yOffset = clientY - (rect.top + rect.height / 2) // 计算Y偏移量

        if (isHovering) {
            //沿着光标的方向移动容器
            gsap.to(sectionRef.current, {
                x: xOffset,
                y: yOffset,
                rotationY: xOffset / 2, // Add 3D rotation effect
                rotationX: -yOffset / 2,
                transformPerspective: 500, // Perspective for realistic 3D effect https://developer.mozilla.org/zh-CN/docs/Web/CSS/perspective
                duration: 1,
                ease: 'power1.out',
            })

            // 以相反的方向移动内部内容以获得视差效果
            gsap.to(contentRef.current, {
                x: -xOffset,
                y: -yOffset,
                duration: 1,
                ease: 'power1.out',
            })
        }
    }

    useEffect(() => {
        //当悬停结束时，重置内容的位置
        if (!isHovering) {
            gsap.to(sectionRef.current, {
                x: 0,
                y: 0,
                rotationY: 0,
                rotationX: 0,
                duration: 1,
                ease: 'power1.out',
            })

            gsap.to(contentRef.current, {
                x: 0,
                y: 0,
                duration: 1,
                ease: 'power1.out',
            })
        }
    }, [isHovering])

    return (
        <section
            ref={sectionRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            className='absolute z-50 size-full overflow-hidden rounded-lg'
            style={{
                perspective: '500px',
            }}
        >
            <div
                ref={contentRef}
                className='origin-center rounded-lg'
                style={{
                    transformStyle: 'preserve-3d',
                }}
            >
                {children}
            </div>
        </section>
    )
}

export default VideoPreview
