import { Event } from '@/types/events'
const API_URL = process.env.API_URL
const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL

const auth =
  'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJiQU8wcmlDNENhWElrREdNYzcxYnBxZW5Wck9zR1FEM1dyX1hkQ3M2QXVRIn0.eyJleHAiOjE3MDEzOTAxNjUsImlhdCI6MTcwMTM4OTg2NSwianRpIjoiMTNlZDgzMjMtZmMwMi00NzlmLThlZjUtZTZmODg1Njc3Yjk5IiwiaXNzIjoiaHR0cDovL2tleWNsb2FrOjgwODAvcmVhbG1zL1Bhc3NQb3J0YWwiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiODg2NWJhMmEtMzVkMC00MjRkLWE0N2ItNzFhMTNkYTBiMWNhIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiYmFja2VuZCIsInNlc3Npb25fc3RhdGUiOiIyZjk1NDVjMS1mMmYwLTRjMTEtOTQxMC0zYTUzMGVmYjQwMGMiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbIi8qIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJkZWZhdWx0LXJvbGVzLXBhc3Nwb3J0YWwiLCJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJwcm9maWxlIGVtYWlsIiwic2lkIjoiMmY5NTQ1YzEtZjJmMC00YzExLTk0MTAtM2E1MzBlZmI0MDBjIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJuYW1lIjoiVGVzdDIgVGVzdCIsInByZWZlcnJlZF91c2VybmFtZSI6InRlc3QyMjIyIiwiZ2l2ZW5fbmFtZSI6IlRlc3QyIiwiZmFtaWx5X25hbWUiOiJUZXN0IiwiZW1haWwiOiJ0ZXN0MjIyMkBnbWFpbC5jb20ifQ.LYTAF_MGvAbdUKH1oHNnqJTvjbj9FaAqJQM_DhccncZuTbZIgth7qttOh7LNeAyKe9kQv9UARUSC7IOyjmaocl9IZNkrZ2OPmY75IBGogHW1KBUrZpr-lS6ZEnZDOScYRqD866ieS0zKaIrJgiEzFAY_EjDEqhmNxbIPtun9um0vN8zkJfangl8ldRxqP30FiKWo7xPJUikxSJP7GUHtQ0_GliQQ7IQmU3wScS14mIzPIE0_2qpeXBIUfi07GrUWPaLvEhh8YB3k_qgMYx7VfccghkLBRJhi_oHyeb6pc3LbJXmHa2COybqX_a-np3WQTvvxrk_pPiexC86TviuoXA'

export const getAllEvents = async () => {
  const res = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/events/all`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return await res.json()
}

export const getUpcomingEvents = async () => {
  const res = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/events/random`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return await res.json()
}

export const getEventById = async (id :string)  => {
  const res = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/events/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  return await res.json()
}
