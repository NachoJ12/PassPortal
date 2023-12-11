const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL   

export const postOrder = async (body : {} , token : string) => {
    const res = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/order`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Authorization" : `Bearer ${token}`
        },
        body: JSON.stringify(body)
    })
    return await res.json()
}