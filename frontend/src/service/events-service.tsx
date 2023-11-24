const API_URL = process.env.API_URL
const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL

const auth =
  'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJaZHhNaXI1anRLTHhjcFYxU25fOFcxQTB6YXlXcTgtWnVxckFTdU1YUHljIn0.eyJleHAiOjE3MDA4NDk5MjUsImlhdCI6MTcwMDg0OTYyNSwianRpIjoiYzkwZDNjYmMtMDNhMi00MzVjLTlmZWMtNzk4NTI1MjEzZGI4IiwiaXNzIjoiaHR0cDovL2tleWNsb2FrOjgwODAvcmVhbG1zL1Bhc3NQb3J0YWwiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiOGJhMmZmNTUtZGQyYy00YzZlLThkMGQtNTdmZmE0MjA4ZjJhIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiYmFja2VuZCIsInNlc3Npb25fc3RhdGUiOiI5ZjBmZjJjMC02NWNiLTQwNTctYTg2NS00N2M2MDgwNGU5MGYiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbIi8qIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJkZWZhdWx0LXJvbGVzLXBhc3Nwb3J0YWwiLCJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJwcm9maWxlIGVtYWlsIiwic2lkIjoiOWYwZmYyYzAtNjVjYi00MDU3LWE4NjUtNDdjNjA4MDRlOTBmIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJuYW1lIjoiVGVzdDIgVGVzdCIsInByZWZlcnJlZF91c2VybmFtZSI6InRlc3QyMjIyIiwiZ2l2ZW5fbmFtZSI6IlRlc3QyIiwiZmFtaWx5X25hbWUiOiJUZXN0IiwiZW1haWwiOiJ0ZXN0MjIyMkBnbWFpbC5jb20ifQ.hJPn5UqGgTeraiIs-q8c9EwJi5KtMKpioHjPv-G-pW-yf6QOCHyN-uJpVNBDU530gPD8wv9EBY7DvRJexcGHV4J9s2HvZhXDziE_wXjzxjYkieIMjILRABJQnkje49g98J1TG1YzwPU1JYZtgdWNK2ZvOyiYYHhdW3DZdbCw70XEMlnqxxtTpPz_KfMinq8rwljMP2SJuZD5xXqmcGZsFxLwQ5MVWS_rKPl-K1Uj6RjtdzvHFJVaPByXqMOaRZdyOHyodLQ4KUJX1kJX1pg7TxhSp88dVCkbeeWRqH8k2EYxuPD45Uu2l5TXL1VDyoafbRimaow857g1Flve52oAaQ'
export const getEvents = async () => {
  const res = await fetch(`${API_URL}/eventos`)
  return await res.json()
}

export const getEventsById = async (id: string) => {
  const res = await fetch(`${API_URL}/eventos?id=${id}`)
  return await res.json()
}

export const getAllEvents = async () => {
  const res = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/events`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${auth}`,
    },
  })
  console.log(await res.json())

  return await res.json()
}
