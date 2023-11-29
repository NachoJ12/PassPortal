import { getEventById } from "@/service/events-service";
import { GetServerSideProps } from "next";
import React, { FC, useState } from "react";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import {
    Box,
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
import PaymentForm from "@/components/ui/paymentForm/PaymentForm";
import { Event } from "@/types/events";


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
    const [total, setTotal] = useState<number>(0)
    const [selectedValue, setSelectedValue] = useState('')

    const handleChange = (event: SelectChangeEvent<string>, child: React.ReactNode) => {
        setSelectedValue(event?.target.value)
    }
    const handleReserveClick = () => {
        console.log('Reservar', selectedValue)
    }

    return (
        <BaseLayout>
            <div className="container_checkout" >
                <div className="checkout_title">
                    <div className="checkout_title_name">
                        <h1>{event?.name}</h1>
                        <h2>{event?.artist?.name}</h2>
                    </div>

                    <div className="checkout_date_address">
                        <div className="checkout_date">
                            <h3>{event?.date}</h3>
                            <h3>{event?.time}</h3>
                        </div>
                        <div className="checkout_address">
                            <LocationOnIcon sx={{ color: theme.palette.primary.main + '!important' }} fontSize="large" />
                            <h3>{event?.venue?.name}</h3>
                            <h3>{event?.venue?.address.city}</h3>
                        </div>
                    </div>
                </div>
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

                <PaymentForm />

                <div className=''>
                    <Button
                        sx={{ width: '35% !important ', borderColor: theme.palette.primary.main + '!important', color: theme.palette.primary.main + '!important' }}
                        variant='outlined'
                        color='primary'
                        onClick={handleReserveClick}
                    >
                        Buy Tickets !
                    </Button>
                </div>

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