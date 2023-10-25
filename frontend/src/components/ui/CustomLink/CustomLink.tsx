import React, { FC } from 'react'
import { Link } from '@mui/material';

interface Props {
    name: string
    href: string
}

const CustomLink: FC<Props> = ({ name, href }) => {
    return (
        <Link className="navbar_link" href={href} >
            <span className='sidebar_name'>{name}</span>
        </Link>
    )
}

export default CustomLink