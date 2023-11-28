import { Event } from '@/types/events'
const API_URL = process.env.API_URL
const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL

const auth =
  'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJaZHhNaXI1anRLTHhjcFYxU25fOFcxQTB6YXlXcTgtWnVxckFTdU1YUHljIn0.eyJleHAiOjE3MDExOTI4MDAsImlhdCI6MTcwMTE5MjUwMCwianRpIjoiYjg5YTM4NjItNDJmZi00MDFiLThmMjUtM2JlMmQ2MjhkMTBhIiwiaXNzIjoiaHR0cDovL2tleWNsb2FrOjgwODAvcmVhbG1zL1Bhc3NQb3J0YWwiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiOGJhMmZmNTUtZGQyYy00YzZlLThkMGQtNTdmZmE0MjA4ZjJhIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiYmFja2VuZCIsInNlc3Npb25fc3RhdGUiOiIyMzFmMDQzZi0yZWU4LTRjNTktOTFiNC04NjE0YjY3YWE0M2IiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbIi8qIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJkZWZhdWx0LXJvbGVzLXBhc3Nwb3J0YWwiLCJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJwcm9maWxlIGVtYWlsIiwic2lkIjoiMjMxZjA0M2YtMmVlOC00YzU5LTkxYjQtODYxNGI2N2FhNDNiIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJuYW1lIjoiVGVzdDIgVGVzdCIsInByZWZlcnJlZF91c2VybmFtZSI6InRlc3QyMjIyIiwiZ2l2ZW5fbmFtZSI6IlRlc3QyIiwiZmFtaWx5X25hbWUiOiJUZXN0IiwiZW1haWwiOiJ0ZXN0MjIyMkBnbWFpbC5jb20ifQ.cUHi043oKfv1EN5qP-qi30JiK7prdkYOaTCdmf486qWWY8WX0lw7p0hR74fo2p2PGnL3U-AvNSprzSuk6BurE0kXcNYt5gb_BtaCbanG2YyvzZSltDbrSBXUTpECiKIxLy6n7DYxoT4dcMOs8JRveGXK529Tn7rqOaWgBAB84FG6GeYMsXzSyNOghzyq0x-YTDcTStZFLVoG431rN6Y809tv_z4mtiH8aq_DohFROH3VTb8W1OQ-mbwWCVOktatyWKuZco6j4qFopMFSWadYnBOiiCKTYXVhcXb3QxwzJXqLSHf_-vo4Gxbn-F8oM9SB8RSx33XNInufAzImeLQw5Q'

  export const getEvents = async () => {
  const res = await fetch(`${API_URL}/eventos`)
  return await res.json()
}

export const getEventsById = async (id: string) => {
  const res = await fetch(`${API_URL}/eventos?id=${id}`)
  return await res.json()
}

export const getAllEvents = async () => {
  const res = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/events/all`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${auth}`,
    },
  })


  return await res.json()
}

export const getEventById = async (id :string)  => {
  const res = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/events/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${auth}`,
    },
  })

  return await res.json()
}
