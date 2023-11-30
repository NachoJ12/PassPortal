import { Event } from '@/types/events'
const API_URL = process.env.API_URL
const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL

const auth =
  'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJiQU8wcmlDNENhWElrREdNYzcxYnBxZW5Wck9zR1FEM1dyX1hkQ3M2QXVRIn0.eyJleHAiOjE3MDEzNzQ0MzksImlhdCI6MTcwMTM3NDEzOSwianRpIjoiY2NhMWE0MDItOGU5ZC00OTMxLTg3YzAtYTgzYTgxN2Q3YjBiIiwiaXNzIjoiaHR0cDovL2tleWNsb2FrOjgwODAvcmVhbG1zL1Bhc3NQb3J0YWwiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiODg2NWJhMmEtMzVkMC00MjRkLWE0N2ItNzFhMTNkYTBiMWNhIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiYmFja2VuZCIsInNlc3Npb25fc3RhdGUiOiJiNjI5ODY5NC03OWQzLTQyMjYtYmZhNi0zMzlhZTQ5MzgxNTAiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbIi8qIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJkZWZhdWx0LXJvbGVzLXBhc3Nwb3J0YWwiLCJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJwcm9maWxlIGVtYWlsIiwic2lkIjoiYjYyOTg2OTQtNzlkMy00MjI2LWJmYTYtMzM5YWU0OTM4MTUwIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJuYW1lIjoiVGVzdDIgVGVzdCIsInByZWZlcnJlZF91c2VybmFtZSI6InRlc3QyMjIyIiwiZ2l2ZW5fbmFtZSI6IlRlc3QyIiwiZmFtaWx5X25hbWUiOiJUZXN0IiwiZW1haWwiOiJ0ZXN0MjIyMkBnbWFpbC5jb20ifQ.xQUo7AT1L95RtgckEqfPr4KitG9QEMoDp3XeJdkgkPcESG-k0-ptBXCUxAP0UiIeLl4CVAJ8REpxs-Jv3KWXiWLeG8GxYhvV1bLv0j-pYeCMnohTX_kkw8E3f2a7SKikBS9huHdthLGYTEM3C-daGSdrPUjcygluICsEflCf0sxtFaCCj1oRWr5wON14oh3kQ7YLvQvn1uOS0Ty1bAGRusTvIOf7ou9OlmWHVjgaB5--JUQucXRY0gXurxwTDOHd04TyFoqWxFKWeSoO234mMNBMzCJfKsBL9GCzG7_-9K_dhaBNnoTB2sxLycjl3fGhOdFHZP8OajB_Ve6jV4CRFQ'

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
