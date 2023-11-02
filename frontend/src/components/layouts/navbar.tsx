"use client";
import React from 'react'
import CustomLink from '@/components/ui/CustomLink/CustomLink'
import { signOut, useSession } from "next-auth/react";
import { Link }  from '@mui/material';

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
  const { data: session } = useSession();

  return (
    <nav className='navbar'>

      {session?.user ? (
        <>
          <span className="navbar_link" >
            {session.user.name}
          </span>
          <Link
            onClick={() => signOut()}
            className="navbar_link" 
          >
            Sign-Out
          </Link>
        </>
      ) : (
        <ul className='navbar_list'>
          {navbarItems.map(item =>
            <li className='navbar_item' key={item.name}>
              <CustomLink
                name={item.name}
                href={item.href}
              />
            </li>
          )}
        </ul>
      )}
    </nav>
  )
}
