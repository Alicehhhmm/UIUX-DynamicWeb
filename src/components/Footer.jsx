import { FaGithub } from 'react-icons/fa'

const socialLinks = [{ href: 'https://github.com/Alicehhhmm/UIUX-DynamicWeb', icon: <FaGithub /> }]

const Footer = () => {
    return (
        <footer className='w-screen bg-[#f1fff1] py-4 text-black'>
            <div className='container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:flex-row'>
                <p className='text-center text-sm font-light md:text-left'>©Norush 2024</p>

                <div className='flex justify-center gap-4  md:justify-start'>
                    {socialLinks.map((link, index) => (
                        <a
                            key={index}
                            href={link.href}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='text-black transition-colors duration-500 ease-in-out hover:text-indigo-500'
                        >
                            {link.icon}
                        </a>
                    ))}
                </div>

                <a href='#video-frame' className='text-center text-sm font-light hover:underline md:text-right'>
                    Up top
                </a>
            </div>
        </footer>
    )
}

export default Footer
