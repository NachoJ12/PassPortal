import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import CategoryIcon from '@mui/icons-material/Category';
import HelpIcon from '@mui/icons-material/Help';
import MenuIcon from '@mui/icons-material/Menu';
import { useContext } from "react"
import { SidebarContext } from '@/components/context/sidebar-context'
import ContactPageIcon from '@mui/icons-material/ContactPage';

const sidebarItems = [
    {
        name: "Home",
        href: "/",
        icon: HomeIcon,
    },
    {
        name: "Category",
        href: "/category",
        icon: CategoryIcon,
    },
    {
        name: "Help",
        href: "/help",
        icon: HelpIcon,
    },
    {
        name: "Contact",
        href: "/contact",
        icon: ContactPageIcon,
    },
]

export default function Sidebar() {
    const { isCollapsed, toggleSidebarcollapse, selectedItem, dispatch }:any = useContext(SidebarContext);

    const toggleSelected = (index:any) => {
        dispatch({ type: 'SELECT_ITEM', payload: index });
    };

    return (
        <div className='sidebar_wrapper'>
            <button className='sidebar_btn' onClick={toggleSidebarcollapse}><MenuIcon /></button>
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
