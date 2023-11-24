"use client";
import React, { ReactNode, useState } from 'react'
import { signOut, useSession } from "next-auth/react";
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

interface NavbarProps {
  onUsernameClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onUsernameClick }) => {
  const { data: session } = useSession();

  return (
    <nav className='navbar'>
      {session?.user ? (
        <>
          <span className="navbar_link" onClick={onUsernameClick}>
            {session.user.name}
          </span>
          <Link
            href="/"
            onClick={() => signOut()}
            className="navbar_link"
          >
            Sign-Out
          </Link>
        </>
      ) : (
        <ul className='navbar_list'>
          {navbarItems.map((item) => (
            <li className="navbar_item" key={item.name}>
              <Link className="navbar_link" href={item.href}>
                <span className="sidebar_name"> {item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;