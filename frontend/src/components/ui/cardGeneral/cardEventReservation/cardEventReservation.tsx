import React, { useState } from 'react'
import Image from 'next/image'
import { NextPage } from 'next'
import { SingleEvent } from '@/types/events'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import StadiumIcon from '@mui/icons-material/Stadium';
import LocationOnIcon from '@mui/icons-material/LocationOn'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import GroupsIcon from '@mui/icons-material/Groups';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FestivalIcon from '@mui/icons-material/Festival';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
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
  event: SingleEvent
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
    router.push(`/checkout/${event.event.id}`)
  }

  return (
    <ThemeProvider theme={theme}>
      <div className='cardReservation-general'>
        <div className='cardReservation-boxEvent'>
          <div className='cardReservation-title'>
            <h1>
              Reserve Your Tickets For:
            </h1>
            <h2>{event?.event?.name}</h2>
          </div>
          <div className='cardReservation-box'>
            <div className='cardReservation-containerImg'>
              <Image className='cardReservation-image' src='' alt={event?.event.name} />
            </div>
          </div>
        </div>
        <div className='cardReservation-boxReserve'>
          <div className='cardReservation-logo'>
            <Image src={logo} alt='logo' width={250} height={250}></Image>
          </div>

          <div className='cardReservation-description'>
            <h2>{event?.event?.artist.name}</h2>
            <p>{event?.event?.description}</p>

          </div>
          <div className='cardReservation-date'>
            <p>
              <CalendarMonthIcon />
              {event?.event?.date}
            </p>
            <p>
              <AccessTimeIcon />
              {event?.event?.time}
            </p>

          </div>

          <div className='cardReservation-ubi'>
            <p>
              <LocationOnIcon />
              {event?.event?.venue?.address?.city}
            </p>
            <p>
              <StadiumIcon />
              {event?.event?.venue?.name}
            </p>
            <p>
              <GroupsIcon />
              {event?.event?.venue?.capacity}
            </p>
          </div>


          <ul className='tickets_list'>
            <ConfirmationNumberIcon />
            {event?.tickets.map(ticket => (
              <li key={ticket.id}>
                <div className='ticket_list'>
                  <h4 style={{ alignSelf: "center" }}>{ticket.name}</h4>
                  <AttachMoneyIcon />
                  <p style={{ alignSelf: "center" }}>
                    {ticket.price}
                  </p>
                </div>
              </li>
            ))}
          </ul>

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
