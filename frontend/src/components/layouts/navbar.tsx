"use client";
import React, { useState } from 'react';
import { signOut, useSession } from "next-auth/react";
import Link from 'next/link';

const navbarItems = [
  {
    name: "Sign-In",
    href: "/login"
  },
  {
    name: "Register",
    href: "/register"
  }
];

interface NavbarProps {
  onUsernameClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onUsernameClick }) => {
  const { data: session } = useSession();

  return (
    <nav className='navbar'>
      {session?.user ? (
        <>
          {session.user.role === 'ADMIN' && (
            <Link href="/EventRegister" className="navbar_link">
              Create Event
            </Link>
          )}
          <span className="navbar_link" onClick={onUsernameClick}>
            {session.user.username}
          </span>
          <Link
            href="http://ec2-50-16-167-162.compute-1.amazonaws.com/login"
            onClick={() => signOut({ callbackUrl: "http://ec2-50-16-167-162.compute-1.amazonaws.com/login" })}
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