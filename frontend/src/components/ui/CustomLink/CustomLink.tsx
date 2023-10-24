"use client";
import React, { FC } from 'react'
import { signIn, signOut, useSession } from "next-auth/react";
import { Link }  from '@mui/material';

interface Props {
    name: string
    href: string
}

const CustomLink: FC<Props> = ({ name }) => {
    return (
        <Link className="navbar_link" onClick={() => signIn()}>
            <span className='sidebar_name'>{name}</span>
        </Link>
    )
}

export default CustomLink