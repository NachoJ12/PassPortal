import React, { useState } from 'react'
import Image from 'next/image'
import { NextPage } from 'next'
import { Event } from '@/types/events'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import StadiumIcon from '@mui/icons-material/Stadium';
import LocationOnIcon from '@mui/icons-material/LocationOn'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import logo from '../../../../../public/logo-grey.svg'
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  ThemeProvider,
  Typography,
  createTheme,
} from '@mui/material'
import { useRouter } from 'next/navigation'

interface Props {
  event: Event
}

const theme = createTheme({
  palette: {
    primary: {
      light: '#E5C0D9',
      main: '#cb74a8',
      dark: '#b3437d',
      contrastText: '#fff',
    },
  },
})

const CardEventReservation: NextPage<Props> = ({ event }) => {
  const router = useRouter()

  const redirect = () => {
    router.push(`/checkout/${event.id}`)
  }

  return (
    <ThemeProvider theme={theme}>
      <div className='cardReservation-general'>
        <div className='cardReservation-boxEvent'>
          <div className='cardReservation-title'>
            <h1>
              Reserve Your Tickets For:
              {''}
            </h1>
            <h2>{event?.name}</h2>
          </div>
          <div className='cardReservation-box'>
            <div className='cardReservation-containerImg'>
              <Image className='cardReservation-image' src='' alt={event?.name} />
            </div>
          </div>
        </div>
        <div className='cardReservation-boxReserve'>
          <div className='cardReservation-logo'>
            <Image src={logo} alt='logo' width={250} height={250}></Image>
          </div>

          <div className='cardReservation-description'>
            <p>{event?.description?.slice(0, 100)}</p>
          </div>
          <div className='cardReservation-dateUbi'>
            <p>
              <CalendarMonthIcon />
              {event?.date}
            </p>
            <p>
              <LocationOnIcon />
              {event?.venue?.address?.city}
            </p>
            <p>
              <AttachMoneyIcon />
              {Math.round(event?.venue?.capacity / event?.stock)}
            </p>
            <p>
              <StadiumIcon />
              {event?.venue?.capacity}
            </p>
          </div>


          <div className='cardReservation-button'>
            <Button
              sx={{ width: '35% !important' }}
              variant='outlined'
              color='primary'
              onClick={redirect}
            >
              Get Tickets Now!
            </Button>
          </div>
        </div>
      </div>
    </ThemeProvider>
  )
}
export default CardEventReservation
