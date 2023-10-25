import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { AiOutlineHome } from "react-icons/ai"
import { BiCategoryAlt, BiHelpCircle } from "react-icons/bi"
import { RxHamburgerMenu } from "react-icons/rx"
import { useContext } from "react"
import { SidebarContext } from '@/components/context/sidebar-context'
import { LuContact2 } from "react-icons/lu"

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
    const { isCollapsed, toggleSidebarcollapse, selectedItem, dispatch }:any = useContext(SidebarContext);

    const toggleSelected = (index:any) => {
        dispatch({ type: 'SELECT_ITEM', payload: index });
    };

    return (
        <div className='sidebar_wrapper'>
            <button className='sidebar_btn' onClick={toggleSidebarcollapse}><RxHamburgerMenu /></button>
            <aside className='sidebar' data-collapse={isCollapsed}>
                <div className='sidebar_top'>
                    <Image src="/logo.png" width={150} height={125} className='sidebar_logo' alt='logo' />
                    <p className='sidebar_logoName'>PassPortal</p>
                </div>
                <ul className='sidebar_list'>
                    {sidebarItems.map((item, index) => (
                        <li className={"sidebar_item"} key={item.name}>
                            <Link href={item.href} className={selectedItem === index ? 'sidebar_link selected' : 'sidebar_link'} onClick={() => toggleSelected(index)}>
                                <span className='sidebar_icon'><item.icon /></span>
                                <span className='sidebar_name'>{item.name}</span>
                            </Link>
                        </li>
                        ))}
                </ul>
            </aside>
        </div>
    )
}
