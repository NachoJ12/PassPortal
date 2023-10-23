import React from 'react'
import Link from 'next/link'

const navbarItems = [
  {
    name: "Sign-In",
    href: "/login"

  },
  {
    name: "Register",
    href: "/register"
  }
]

export default function navbar() {
  return (
    <nav className='navbar'>
      <ul className='navbar_list'>
        {navbarItems.map(item => <li className='navbar_item' key={item.name}>
          <Link href={item.href} className="navbar_link">
            <span className='sidebar_name'>{item.name}</span>
          </Link>
        </li>)}
      </ul>
    </nav>
  )
}
