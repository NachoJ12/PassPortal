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

export const getReportByDate = async (month: number, year: number ) => {
    const res = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/order/pdf/${month}/${year}`, {
        method: 'GET',
    })
    if (!res.ok) {
        throw new Error('Error en la creacion del reporte');
    }
    return await res.blob();
}