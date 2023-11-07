const API_URL = process.env.API_URL;

export const getEvents = async () => {
    const res = await fetch(`${API_URL}/eventos`)
    return await res.json()
};

export const getEventsById = async (id: string) => {
    const res = await fetch(`${API_URL}/eventos?id=${id}`)
    return await res.json()
};