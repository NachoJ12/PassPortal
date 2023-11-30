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
import PaymentTable from "@/components/ui/paymentTable/PaymentTable";

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
    const [selectedValue, setSelectedValue] = useState('')
    const handleReserveClick = () => {
        console.log('Reservar', selectedValue)
    }
    return (
        <BaseLayout>

            <div className="container_checkout">
                <div className="container_header">
                    <header className="checkout_title">
                        <div className="checkout_title_name">
                            <h1>{event?.name} name</h1>
                            <h2>{event?.artist?.name} artist</h2>
                        </div>

                        <div className="checkout_date_address">
                            <div className="checkout_date">
                                <CalendarMonthIcon />
                                <h3>{event?.date} date</h3>
                                <h3>{event?.time} time</h3>
                            </div>
                            <div className="checkout_address">
                                <LocationOnIcon sx={{ color: theme.palette.primary.main + '!important' }} fontSize="large" />
                                <h3>{event?.venue?.name} venue name</h3>
                                <h3>{event?.venue?.address.city} city</h3>
                            </div>
                        </div>

                    </header>
                </div>

                <div className="container_body">

                <PaymentTable/>


                </div>

                <div className="container_payment">
                    <PaymentForm />
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