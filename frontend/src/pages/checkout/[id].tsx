import { getEventById } from "@/service/events-service";
import { GetServerSideProps } from "next";
import React, { FC, useState } from "react";


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
import BaseLayout from "@/components/layouts/base-layout";


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


const CheckOut: FC<Props> = ({ event }) => {

  const [selectedValue, setSelectedValue] = useState('')

  const handleChange = (event: SelectChangeEvent<string>, child: React.ReactNode) => {
    setSelectedValue(event?.target.value)
  }
  const handleReserveClick = () => {
    console.log('Reservar', selectedValue)
  }

  return (
    <BaseLayout>
      <div className='cardReservation-form'>
        <Typography variant='body1'>Tickets to reserve:</Typography>
        <FormControl sx={{ width: '80% !important' }}>
          <InputLabel
            id='select-label'
            sx={{ color: theme.palette.primary.main + '!important' }}
          >
            Choose
          </InputLabel>
          <Select
            labelId='select-label'
            id='select'
            value={selectedValue}
            label='Selecciona'
            onChange={handleChange}
            sx={{
              '& fieldset': {
                borderColor: '#cb74a8 !important', // Cambia "your-desired-color" al color que desees
              },
              width: '50% !important',
              color: 'white !important',
            }}
          >
            <MenuItem value=''>Choose...</MenuItem>
            <MenuItem value='1'>1</MenuItem>
            <MenuItem value='2'>2</MenuItem>
            <MenuItem value='3'>3</MenuItem>
          </Select>
        </FormControl>
      </div>

    </BaseLayout>);
};

export default CheckOut;

export const getServerSideProps: GetServerSideProps<Props> = async ({ params }) => {
  const id: string = typeof params?.id === 'string' ? params.id : '';
  const event = await getEventById(id)
  return {
    props: {
      event,
    },
  };
};