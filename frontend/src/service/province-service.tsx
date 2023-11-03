
const API_GOB = process.env.API_GOB;

export const getProvinces = async () => {
    const res = await fetch(`${API_GOB}/provincias?aplanar`)
    return await res.json()
};

export const getProvinceByName = async (provincia: string) => {
    const res = await fetch(`${API_GOB}/provincias?nombre=${provincia}&aplanar&max=100`)
    return await res.json()
};