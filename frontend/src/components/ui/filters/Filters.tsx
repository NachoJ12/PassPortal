"use client"
import React, { FC } from 'react'
import { Button } from '@mui/material';
import { useRouter } from 'next/router';
import { useSearchParams, } from 'next/navigation'
import Link from 'next/link';
import { Category } from '@/types/categories'

interface Props {
    category: Category[]
}

const Filters: FC<Props> = ({ category }) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const selectedCategories = searchParams.get("categories")?.split('-') || [];

    const handleClick = (name: string) => {
        let updatedCategories = [...selectedCategories];
        const categoryIndex = updatedCategories.indexOf(name);
        if (categoryIndex === -1) {
            updatedCategories.push(name);
        }
        const encodedCategories = updatedCategories.join('-');
        router.push({
            query: {
                ...router.query,
                categories: encodedCategories 
            },
        });
        console.log(encodedCategories);
    };

    return (
        <div className='category_container'>
            {category.map(ca => (
                <Button
                    onClick={() => handleClick(ca.name)}
                    key={ca.id}
                    className={selectedCategories.includes(ca.name, 0) ? 'category_item selected' : 'category_item'}
                >
                    {ca.name}
                </Button>
            ))}
        </div>
    );
}

export default Filters