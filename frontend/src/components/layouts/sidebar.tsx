import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useContext } from "react"
import { SidebarContext } from '@/components/context/sidebar-context'
import { AiOutlineHome } from "react-icons/ai"
import { BiCategoryAlt, BiHelpCircle } from "react-icons/bi"
import { LuContact2 } from "react-icons/lu"
import { RxHamburgerMenu } from "react-icons/rx"

const sidebarItems = [
    {
        name: "Home",
        href: "/",
        icon: AiOutlineHome,
    },
    {
        name: "Category",
        href: "/category",
        icon: BiCategoryAlt,
    }, 
    {
        name: "Help",
        href: "/help",
        icon: BiHelpCircle,
    }, 
    {
        name: "Contact",
        href: "/contact",
        icon: LuContact2,
    },
]

export default function Sidebar() {

    const { isCollapsed, toggleSidebarcollapse }: any = useContext(SidebarContext)
    return (
        <div className='sidebar_wrapper'>
            <button className='sidebar_btn' onClick={toggleSidebarcollapse}><RxHamburgerMenu /></button>
            <aside className='sidebar' data-collapse={isCollapsed}>
                <div className='sidebar_top'>
                    <Image src="/logo.png" width={150} height={125} className='sidebar_logo' alt='logo' />
                    <p className='sidebar_logoName'>PassPortal</p>
                </div>
                <ul className='sidebar_list'>
                    {sidebarItems.map(item => <li className='sidebar_item' key={item.name}>
                        <Link href={item.href} className="sidebar_link">
                            <span className='sidebar_icon'><item.icon /></span>
                            <span className='sidebar_name'>{item.name}</span>
                        </Link>
                    </li>)}

                </ul>
            </aside>
        </div>
    )
}
