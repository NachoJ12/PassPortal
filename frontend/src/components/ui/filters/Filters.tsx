"use client"
import { categories } from '@/data/categories'
import {  Button } from '@mui/material';
import React from 'react'
import { useRouter } from 'next/router';
import { useSearchParams } from 'next/navigation'

const Filters = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const selected = searchParams.get("category")
    
    const handleClick = (name: string) => {
        router.push({
            query: {
                ...router.query, category: name
            }
        })
    };

    return (
        <div className='category_container'>
            {categories.map(category => (
                <Button
                    onClick={() => handleClick(category.name)}
                    key={category.id}
                    className={selected === category.name ? 'categoty_item selected' : 'categoty_item'}
                >
                    {category.name}
                </Button>
            )
            )}
        </div>
    )
}

export default Filters