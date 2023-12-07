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

import { CheckoutContext } from '@/components/context/checkout-context';

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
    const context = useContext(CheckoutContext);
    const { selectedValue } = context || {};

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

    const onSubmit = (data: any) => {
        
        const dataFormat = {
            delivery_address: "Av siempreviva 123",
            userid: 8,
            tickets: ""
        }
        console.log(dataFormat);
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