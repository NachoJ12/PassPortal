
import { getEventById } from "@/service/events-service";
import { GetServerSideProps } from "next";
import React, { FC, useState } from "react";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { createTheme } from '@mui/material'
import BaseLayout from "@/components/layouts/base-layout";
import PaymentForm from "@/components/ui/paymentForm/PaymentForm";
import PaymentTable from "@/components/ui/paymentTable/PaymentTable";
import StadiumIcon from '@mui/icons-material/Stadium';
import { SingleEvent } from "@/types/events";
import { useSession } from "next-auth/react"
import { redirect } from 'next/navigation'
import { authOptions } from './../api/auth/[...nextauth]';
import { getServerSession } from "next-auth/next"
import { User } from "@/types/user";
import { Session } from "next-auth";

interface Props {
    event: SingleEvent;
    session : Session  | null
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


const CheckOut: FC<Props> = ({ event, session }) => {


    return (
        <BaseLayout>
            <div className="container_checkout">
                <div className="container_order">
                    <header className="container_header">
                        <nav className="checkout_title">
                            <div className="checkout_title_name">
                                <h1>{event?.event?.name} </h1>
                            </div>
                            <div className="checkout_date_address">
                                <div className="checkout_date">
                                    <div className="checkout_date_text">
                                        <div style={{ display: "flex", gap: ".5rem" }} >
                                            <CalendarMonthIcon />
                                            <h3>{event?.event?.date} </h3>
                                        </div>
                                        <div style={{ display: "flex", gap: ".5rem" }}>
                                            <AccessTimeIcon />
                                            <h3>{event?.event?.time} </h3>
                                        </div>
                                    </div>
                                </div>
                                <div className="checkout_address">

                                    <div className="checkout_address_text">
                                        <div style={{ display: "flex", gap: ".5rem" }} >
                                            <LocationOnIcon sx={{ color: theme.palette.primary.main + '!important' }} />
                                            <h3>{event?.event?.venue?.address.city} </h3>

                                        </div>
                                        <div style={{ display: "flex", gap: ".5rem" }}>
                                            <StadiumIcon />
                                            <h3>{event?.event?.venue?.name}  </h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </nav>
                    </header>
                    <section className="container_body">
                        <PaymentTable tickets={event?.tickets} />
                    </section>
                    <section className="container_payment">
                        <PaymentForm />
                    </section>
                </div>
            </div>

        </BaseLayout>);
};

export default CheckOut;

export const getServerSideProps: GetServerSideProps<Props> = async ({ params, req, res }) => {

    const id: string = typeof params?.id === 'string' ? params.id : '';
    const event = await getEventById(id)
    const session =  await getServerSession(req, res, authOptions)

    if (!session) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        }
    }
    
    return {
        props: {
            event,
            session
        },
    };
};