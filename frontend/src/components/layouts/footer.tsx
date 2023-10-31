import React from 'react'
import { AiOutlineHome } from "react-icons/ai"
import { BiCategoryAlt, BiHelpCircle } from "react-icons/bi"
import { useContext } from "react"
import { SidebarContext } from '@/components/context/sidebar-context'
import { LuContact2 } from "react-icons/lu"
import Link from 'next/link'
import Image from 'next/image'

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
const Footer = () => {
    const { isCollapsed, toggleSidebarcollapse, selectedItem, dispatch }: any = useContext(SidebarContext);

    const toggleSelected = (index: any) => {
        dispatch({ type: 'SELECT_ITEM', payload: index });
    };
    return (
        <footer className="layout-footer">
                <ul className='footer_list'>
                    {sidebarItems.map((item, index) => (
                        <li className={"sidebar_item"} key={item.name}>
                            <Link href={item.href} className={selectedItem === index ? 'sidebar_link selected' : 'sidebar_link'} onClick={() => toggleSelected(index)}>
                                <span className='sidebar_icon'><item.icon /></span>
                                <span className='sidebar_name'>{item.name}</span>
                            </Link>
                        </li>
                    ))}
                </ul>

            <Image src="/logo.png" width={300} height={250} alt='logo' />
        </footer>
    )
}

export default Footer