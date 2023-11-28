import { Event } from '@/types/events'
const API_URL = process.env.API_URL
const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL

const auth =
  'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJaZHhNaXI1anRLTHhjcFYxU25fOFcxQTB6YXlXcTgtWnVxckFTdU1YUHljIn0.eyJleHAiOjE3MDEyMTMzNTcsImlhdCI6MTcwMTIxMzA1NywianRpIjoiODM0NDJmMTYtYjdkNi00YTA1LTg5ZGQtMTJlYjM4YTI0M2M3IiwiaXNzIjoiaHR0cDovL2tleWNsb2FrOjgwODAvcmVhbG1zL1Bhc3NQb3J0YWwiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiOGJhMmZmNTUtZGQyYy00YzZlLThkMGQtNTdmZmE0MjA4ZjJhIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiYmFja2VuZCIsInNlc3Npb25fc3RhdGUiOiIyOTUzNzllYy04YTU2LTRlZjEtYWU3Yi1kOTZhOGIzYTlkZTAiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbIi8qIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJkZWZhdWx0LXJvbGVzLXBhc3Nwb3J0YWwiLCJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJwcm9maWxlIGVtYWlsIiwic2lkIjoiMjk1Mzc5ZWMtOGE1Ni00ZWYxLWFlN2ItZDk2YThiM2E5ZGUwIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJuYW1lIjoiVGVzdDIgVGVzdCIsInByZWZlcnJlZF91c2VybmFtZSI6InRlc3QyMjIyIiwiZ2l2ZW5fbmFtZSI6IlRlc3QyIiwiZmFtaWx5X25hbWUiOiJUZXN0IiwiZW1haWwiOiJ0ZXN0MjIyMkBnbWFpbC5jb20ifQ.eD5gzDMYJDr9sRk_sVoQ48NEqqsaT0kbMVgi6RhW4LpLbEWsCLAZKXKw-FX6Sx6fqp4tpWzpjmjQlFOznVw12u4i5uO4mVL4eOTtLp58F1WmNRXVHfd0K7wRMWW7-p7FFHQqlGzyc8cZ6iUANpE24L8FskARPLDFYvXgiwzPUSokNSxqMMw4PlZZ24j6hAscaHNjxUX3mPpPLrYoklYv5Fv08khe1ksL74acgWgKe8_KliDABKckpPSrsVrP92ZjYmelgC3F7CpcAnfdOhTaOB1WWJL5ngpB5eVo89DkWudhUd8BCRpx5SAdE7ERPX1ND08oYaILzX90qqOL11JCaA'

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
