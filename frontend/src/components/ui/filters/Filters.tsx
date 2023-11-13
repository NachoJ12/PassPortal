import { categories } from '@/data/categories'
import { TextField, Button } from '@mui/material';
import React, { useState } from 'react'
import { useRouter } from 'next/router';
import { usePathname } from 'next/navigation'
import { useContext } from "react"
import { SidebarContext } from '@/components/context/sidebar-context'

const Filters = () => {
    const router = useRouter()
    const { selectedItem, dispatch }: any = useContext(SidebarContext);

    const toggleSelected = (index: any) => {
        dispatch({ type: 'SELECT_ITEM', payload: index });
    };

    const handleClick = (name: string) => {
        router.push({
            query: {
                ...router.query, category: name
            }
        })
        toggleSelected(name)
    };

    return (
        <div className='category_container'>
            {categories.map(category => (
                <Button
                    onClick={() => handleClick(category.name)}
                    key={category.id}
                    className={selectedItem === category.name ? 'categoty_item selected' : 'categoty_item'}
                >
                    {category.name}
                </Button>
            )
            )}
        </div>
    )
}

export default Filters