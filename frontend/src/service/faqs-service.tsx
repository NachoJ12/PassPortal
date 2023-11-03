const API_URL = process.env.API_URL;

export const getFaqs = async () => {
    const res = await fetch(`${API_URL}/faqs`)
    return await res.json()
};