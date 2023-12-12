"use client";
import React, { useState } from 'react';
import { signOut, useSession } from "next-auth/react";
import Link from 'next/link';
import { useRouter } from 'next/router';


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
  const router = useRouter();
  const handleSignOut = async () => {
    await signOut({});
    router.push('/');
  };
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
          <a className="navbar_link" onClick={handleSignOut}>
            Sign-Out
          </a>
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