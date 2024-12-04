import { useState, useRef } from 'react'

/**
 * 占位框
 */
export const BentoTilt = ({ children, className = '' }) => {
    const [transformStyle, setTransformStyle] = useState('')
    const itemRef = useRef(null)

    // 根据鼠标移动的位置改变一个 DOM 元素的变换样式。
    const handleMouseMove = event => {
        if (!itemRef.current) return

        const { left, top, width, height } = itemRef.current.getBoundingClientRect()

        // 计算鼠标相对于元素左边的位置 = (鼠标的 X 坐标 - 元素的左边距) / 元素的宽度
        // 计算鼠标相对于元素上边的位置 = (鼠标的 Y 坐标 - 元素的上边距) / 元素的高度
        const relativeX = (event.clientX - left) / width
        const relativeY = (event.clientY - top) / height

        // tiltX 基于 relativeY（鼠标在元素垂直方向上的位置）计算，这意味着当鼠标向上移动时，tiltX 增加，导致元素沿 X 轴正向旋转（向前倾斜）
        // tiltY 基于 relativeX（鼠标在元素水平方向上的位置）计算，这意味着当鼠标向左移动时，tiltY 增加（因为 -15 使得方向相反），导致元素沿 Y 轴负向旋转（向左侧翻转）。
        const tiltX = (relativeY - 0.5) * 15
        const tiltY = (relativeX - 0.5) * -15

        const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(.95, .95, .95)`
        setTransformStyle(newTransform)
    }

    const handleMouseLeave = () => {
        setTransformStyle('')
    }

    return (
        <div
            ref={itemRef}
            className={className}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ transform: transformStyle }}
        >
            {children}
        </div>
    )
}
