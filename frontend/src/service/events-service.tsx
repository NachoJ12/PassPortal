import { Event } from '@/types/events'

const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL

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

export const getEventById = async (id: string) => {
  const res = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/events/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  return await res.json()
}

export const getEventByArtist = async (artist: string) => {
  const res = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/events/artist?name=${artist}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  return await res.json()
}

export const getEventByName = async (name: string) => {
  const res = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/events/name?=name${name}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  return await res.json()
}

export const getEventByDate = async (date: string) => {
  const res = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/events/date?date=${date}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  return await res.json()
}

export const getEventByCategories = async (category: string) => {
  const categories = category?.split("-").join(",")
  const res = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/events?categories=${categories}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  return await res.json()
}

export const getEventByArtistAndCategories = async (artist: string, category: string) => {
  const categories = category?.split("-").join(",")
  const res = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/events?categories=${categories}&artist=${artist}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return await res.json()
}



