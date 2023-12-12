"use client";
import { useForm } from "react-hook-form"
import React, { useContext, useState } from 'react';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import { ErrorMessage } from '@hookform/error-message';
import {
    Button,
    Typography,
    createTheme,
} from '@mui/material'
import { useRouter } from 'next/router'
import { CheckoutContext } from '@/components/context/checkout-context';
import { TicketOrder } from "@/types/order";
import { useSession } from "next-auth/react";
import { postOrder } from "@/service/order-service";
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



const PaymentForm = () => {
    const { data: session } = useSession();
    const context = useContext(CheckoutContext);
    const router = useRouter()
    const { selectedValue, ticket } = context || {};

    const [state, setState] = useState({
        number: '',
        expiry: '',
        cvc: '',
        name: '',
        focused: undefined as 'number' | 'expiry' | 'cvc' | 'name' | undefined,
    });

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setState((prev) => ({ ...prev, [name]: value }));
    }

    const handleInputFocus = (evt: any) => {
        setState((prev) => ({ ...prev, focused: evt.target.name }));
    }

    const {
        register,
        formState,
        handleSubmit,
    } = useForm()

    const { errors } = formState;



    const onSubmit = async (data: any) => {
        const arr: any[] = [];
        const result: number = ticket?.length
            ? ticket.reduce((accumulator: number, currentTicket: TicketOrder) => {
                return accumulator + currentTicket.cantTickets;
            }, 0)
            : 0;

        const dataFormat = {
            delivery_address: session!.user.email,
            userid: session!.user.userId,
            ticket: arr
        }

        // Loop to push ticket IDs to the arr array
        let totalTicketsAdded = 0;

        if (ticket !== undefined) {
            for (let i = 0; i < ticket.length; i++) {
                const currentTicket = ticket[i];
                const ticketsToAdd = Math.min(currentTicket.cantTickets, result - totalTicketsAdded, 10 - arr.length);

                for (let j = 0; j < ticketsToAdd; j++) {
                    arr.push({ id: currentTicket.id });
                    totalTicketsAdded++;
                }

                if (totalTicketsAdded >= result || arr.length >= 10) {
                    break;
                }
            }
        }

        console.log(result, dataFormat);
        const res = await postOrder(dataFormat, session!.user.accessToken)
        console.log(res);

    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className='payment_form'>
                <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center" }}>
                    <Cards
                        number={state.number}
                        expiry={state.expiry}
                        cvc={state.cvc}
                        name={state.name}
                        focused={state.focused}
                    />
                    <div style={{
                        display: "flex", gap: "20px", flexWrap: "wrap", justifyContent: "center"
                    }}>
                        <div style={{ display: "flex", flexDirection: "column", gap: "20px", }}>
                            <div style={{ width: "100%" }} >

                                <Typography variant="caption" color="red">
                                    <ErrorMessage errors={errors} name="number" />
                                </Typography>
                                <input
                                    className='payment_input'
                                    {...register("number",
                                        //  {
                                        //     maxLength:{
                                        //         value:16,
                                        //         message:"Max Length 16 numbers"
                                        //     }, minLength: {
                                        //         value: 16,
                                        //         message: "Min Length 16 numbers"
                                        //     }
                                        // }
                                    )}
                                    //required={true}
                                    type="number"
                                    name="number"
                                    placeholder="Card Number"
                                    value={state.number}
                                    onChange={handleInputChange}
                                    onFocus={handleInputFocus}
                                />
                            </div>

                            <div style={{ width: "100%" }} >
                                <Typography variant="caption" color="red">
                                    <ErrorMessage errors={errors} name="expDate" />
                                </Typography>
                                <input
                                    className='payment_input'
                                    {...register("expiry")}
                                    type="text"
                                    name="expiry"
                                    //required={true}
                                    placeholder="Card Expiry"
                                    value={state.expiry}
                                    onChange={handleInputChange}
                                    onFocus={handleInputFocus}
                                />
                            </div>
                        </div>

                        <div style={{ display: "flex", flexDirection: "column", gap: "20px", }}>
                            <div style={{ width: "100%" }}>
                                <Typography variant="caption" color="red">
                                    <ErrorMessage errors={errors} name="cvc" />
                                </Typography>
                                <input
                                    className='payment_input'
                                    {...register("cvc")}
                                    type="number"
                                    name="cvc"
                                    placeholder="Card CVC"
                                    //required={true}
                                    value={state.cvc}
                                    onChange={handleInputChange}
                                    onFocus={handleInputFocus}
                                />
                            </div>

                            <div style={{ width: "100%" }}>
                                <Typography variant="caption" color="red">
                                    <ErrorMessage errors={errors} name="name" />
                                </Typography>

                                <input
                                    className='payment_input'
                                    {...register("name")}
                                    type="text"
                                    name="name"
                                    //required={true}
                                    placeholder="Card Name"
                                    value={state.name}
                                    onChange={handleInputChange}
                                    onFocus={handleInputFocus}
                                />
                            </div>

                        </div>
                        <div style={{ width: "50%" }}>
                            <Typography variant="caption" color="red">
                                <ErrorMessage errors={errors} name="name" />
                            </Typography>

                            <input
                                className='payment_input'
                                {...register("email")}
                                type="text"
                                name="email"
                                //required={true}
                                placeholder="Email addrees"
                                defaultValue={ session && session.user && session.user.email ? session.user.email : "" }

                                readOnly
                                />
                        </div>
                    </div>
                </div>
                <div style={{ display: "flex", justifyContent: "center", width: "100%", marginTop: "1.5rem !important" }}>
                    <Button

                        sx={{ width: '35% !important ', borderColor: theme.palette.primary.main + '!important', color: theme.palette.primary.main + '!important' }}
                        variant='outlined'
                        type="submit"
                        color='primary'>
                        Buy Tickets !
                    </Button>
                </div>
            </form>
        </div>
    );
};
export default PaymentForm;