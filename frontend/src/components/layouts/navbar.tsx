"use client";
import React, { ReactNode } from 'react'
import { signOut, useSession } from "next-auth/react";
import { Link } from '@mui/material';

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
              <Link className="navbar_link" href={item.href} >
                <span className='sidebar_name'> {item.name}</span>
              </Link>
            </li>
          )}
        </ul>
      )}
    </nav>
  )
}
