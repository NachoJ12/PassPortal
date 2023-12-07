"use client"
import { categories } from '@/data/categories'
import { Button } from '@mui/material';
import React from 'react'
import { useRouter } from 'next/router';
import { useSearchParams, } from 'next/navigation'
import Link from 'next/link';

const Filters = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const selectedCategories = searchParams.get("categories")?.split('-') || [];

    const handleClick = (name: string) => {
        let updatedCategories = [...selectedCategories];
        // Toggle selection - if already selected, remove; otherwise, add
        const categoryIndex = updatedCategories.indexOf(name);
        if (categoryIndex === -1) {
            updatedCategories.push(name);
        } 
        const encodedCategories = updatedCategories.join('-');
        // Update URL with the updated categories
        router.push({
            query: {
                ...router.query,
                categories: encodedCategories // Join the categories with a comma
            },
        });
        console.log(encodedCategories);
    };

    return (
        <div className='category_container'>
            {categories.map(category => (
                <Button
                    onClick={() => handleClick(category.name)}
                    key={category.id}
                    className={selectedCategories.includes(category.name,0) ? 'category_item selected' : 'category_item'}
                >
                    {category.name}
                </Button>
            ))}
        </div>
    );
}

export default Filters