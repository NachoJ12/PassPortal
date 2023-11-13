import { categories } from '@/data/categories'
import { TextField, Button } from '@mui/material';
import React, { useState } from 'react'
import { useRouter } from 'next/router';
import { usePathname } from 'next/navigation'


const Filters = () => {
    const router = useRouter()
    const path = usePathname()

    const [search, setSearch] = useState();

    const handleClick = (name: string) => {
        router.push({
            query: {
                ...router.query, category: name
            }
        })
    };

    return (
        <div>
            {categories.map(category => (
                <Button
                    onClick={() => handleClick(category.name)}
                    key={category.id}
                    className={router.pathname.includes("category=" + category.name) ? 'selected' : ''}
                >
                    {category.name}
                </Button>
            )
            )}
        </div>
    )
}

export default Filters