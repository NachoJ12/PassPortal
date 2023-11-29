import { Event } from '@/types/events'
const API_URL = process.env.API_URL
const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL

const auth =
  'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJaZHhNaXI1anRLTHhjcFYxU25fOFcxQTB6YXlXcTgtWnVxckFTdU1YUHljIn0.eyJleHAiOjE3MDEzMDE2NTksImlhdCI6MTcwMTMwMTM1OSwianRpIjoiNzk5ZjE0NTctNGEzYy00NDQ0LTljMDgtNmQ3YWZmODAzYTcyIiwiaXNzIjoiaHR0cDovL2tleWNsb2FrOjgwODAvcmVhbG1zL1Bhc3NQb3J0YWwiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiOGJhMmZmNTUtZGQyYy00YzZlLThkMGQtNTdmZmE0MjA4ZjJhIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiYmFja2VuZCIsInNlc3Npb25fc3RhdGUiOiIxMTZjNDU4NS1lN2IxLTRlNTEtODc4ZC1iNTkxM2E5OWFhMWYiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbIi8qIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJkZWZhdWx0LXJvbGVzLXBhc3Nwb3J0YWwiLCJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJwcm9maWxlIGVtYWlsIiwic2lkIjoiMTE2YzQ1ODUtZTdiMS00ZTUxLTg3OGQtYjU5MTNhOTlhYTFmIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJuYW1lIjoiVGVzdDIgVGVzdCIsInByZWZlcnJlZF91c2VybmFtZSI6InRlc3QyMjIyIiwiZ2l2ZW5fbmFtZSI6IlRlc3QyIiwiZmFtaWx5X25hbWUiOiJUZXN0IiwiZW1haWwiOiJ0ZXN0MjIyMkBnbWFpbC5jb20ifQ.JChTDEnX_wDhq-M4vkKOXa7Dan4cQEBCL04VE_m0Qug9KCBfIB26Vw9tBwcD5gEYvWb905UTnoC6unQVTdPxMBnNkXxLmuZzXHWYorwpuv5r97WlJtliSdtbdiI-77L3ajKZFrEdlO-f5YoghcVtSHaErUgSF_tako0S0Mzd3grZzPuEaP3dh5c1ZKWzOwJp6XJsf1EwrVHz1CgCUFHfYi80sVa3lLXA9AHWe9qTmdSUgrSx1HqgQY_7t1aLZLEkjQhidsemqyd8UjkWYluHYe0I-XhwGqSCV9OoR-gjB9TszSGmnGev1oX4YPsYB_hWiKpaTS-UpIPFBvRPS68z0w'

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
