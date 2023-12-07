const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL

export const getCategories = async () => {
    const res = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/category/all`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    return await res.json()
}