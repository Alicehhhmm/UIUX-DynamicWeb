import clsx from 'clsx'

export const Button = ({ id, title, rightIcon, leftIcon, containerClass }) => {
    return (
        <button
            id={id}
            className={clsx(
                'group relative z-10 w-fit cursor-pointer overflow-hidden rounded-full bg-violet-50 px-7 py-3 text-black',
                containerClass
            )}
        >
            {leftIcon}

            <span className='relative inline-flex overflow-hidden font-general text-xs uppercase'>
                {/* 交互：鼠标悬浮前，显示改内容 */}
                <div className='translate-y-0 skew-y-0 transition duration-500 group-hover:translate-y-[-160%] group-hover:skew-y-12'>
                    {title}
                </div>
                {/* 交互：鼠标悬浮后，显示该内容 */}
                <div className='absolute translate-y-[164%] skew-y-12 transition duration-500 group-hover:translate-y-0 group-hover:skew-y-0'>
                    {title}
                </div>
            </span>

            {rightIcon}
        </button>
    )
}