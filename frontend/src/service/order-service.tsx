const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL   

export const getAllEvents = async (id:number) => {
    const res = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/order/user/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    return await res.json()
}