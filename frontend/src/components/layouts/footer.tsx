import React from 'react'
import Image from 'next/image'

const Footer = () => {

    return (
        <footer className='footer' >
            <Image src="/logo.png" width={300} height={250} alt='logo' />
        </footer>
    )
}

export default Footer;