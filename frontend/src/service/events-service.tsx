const API_URL = process.env.API_URL;
const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;


const auth = "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI3Q3BRSDlvRUZ5cmJHb1ZraEFuUm10WEp4NW5MLU1icEFNN3psVEJhSko0In0.eyJleHAiOjE3MDA2Nzk1MzcsImlhdCI6MTcwMDY3OTIzNywianRpIjoiNDY4MmZjOWEtNTVjNC00MGFmLWI4MzUtMTY1MWYwMjQ5NzBlIiwiaXNzIjoiaHR0cDovL2tleWNsb2FrOjgwODAvcmVhbG1zL1Bhc3NQb3J0YWwiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiZjZjMWE1OWYtODQ3NS00YzllLTkzZDItMjBiYzNiMjkwMzQ2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiYmFja2VuZCIsInNlc3Npb25fc3RhdGUiOiJlM2ExYzRkMi1jZTEwLTQ5ODgtODkyNS02OTRkNGQ2MDE5ZGIiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbIi8qIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJkZWZhdWx0LXJvbGVzLXBhc3Nwb3J0YWwiLCJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJwcm9maWxlIGVtYWlsIiwic2lkIjoiZTNhMWM0ZDItY2UxMC00OTg4LTg5MjUtNjk0ZDRkNjAxOWRiIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJuYW1lIjoiVGVzdDIgVGVzdCIsInByZWZlcnJlZF91c2VybmFtZSI6InRlc3QyIiwiZ2l2ZW5fbmFtZSI6IlRlc3QyIiwiZmFtaWx5X25hbWUiOiJUZXN0IiwiZW1haWwiOiJ0ZXN0MjJAZ21haWwuY29tIn0.T4mPapBLlMIEzZ-hQFEGw0iemFCa4L3WV-9RASW09pSAejK7U6S9UIkQnsvIyKa52U3Gzw9roDslhvO7Ok2UiqdZyTNaOhRnTuP0ZlisDBhD-MsROPRRoEodAccuXU8x2tlLApHOBPFmrw6vOZkekqg1BBBZ-QADbrgRqSLp6I4zSjn4m_ZIwivJezsOxT8P_Nhj5t-knL3NwF-9bFrRuJN1prxxY4sGMzHuUdyVv0z_EN1MnH3WgxJzLeVmO-OudN0KvUPOlfUVEO2tgtmVA7dzbCnM6HlaO56whFeb6zmzgQfqf8ia28Uczn3Oxf7Nt2Wtbo37xICfsY8iNXeSGw"
export const getEvents = async () => {
    const res = await fetch(`${API_URL}/eventos`)
    return await res.json()
};

export const getEventsById = async (id: string) => {
    const res = await fetch(`${API_URL}/eventos?id=${id}`)
    return await res.json()
};

export const getAllEvents = async (token: string = auth) => {
    const res = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/events`,
        {
            method: "GET",
            mode: 'cors',
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Authorization":`Bearer ${token}`
            },
        }
    )
    return await res.json()
}