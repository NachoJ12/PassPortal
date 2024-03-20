import React, { FC } from 'react'
import Image from 'next/image'
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import Link from 'next/link'

const footerItems = [
    {
        name: "Instagram",
        href: "https://www.instagram.com/",
        icon: InstagramIcon,
    },
    {
        name: "Facebook",
        href: "https://www.facebook.com/?locale=es_LA",
        icon: FacebookIcon,
    },
    {
        name: "Twitter",
        href: "https://twitter.com/home?lang=es",
        icon: TwitterIcon,
    },
    {
        name: "Youtube",
        href: "https://www.youtube.com",
        icon: YouTubeIcon,
    },
]



const Footer: FC = () => {

    return (
        <footer className='footer'>
            <Image src="/logo.png" width={300} height={250} alt='logo' />

            <ul className='footer_list'>
                {footerItems.map(item => (
                    <li className="footer_item" key={item.name}>
                        <Link href={item.href} target="_blank" className='footer_link' >
                            <span className='footer_icon'><item.icon /></span>
                        </Link>
                    </li>
                ))
                }
            </ul>

        </footer>
    )
}

export default Footer;