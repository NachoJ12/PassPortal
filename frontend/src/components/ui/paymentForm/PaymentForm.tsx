import { schemaCard } from '@/rules';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form"
import React, { useState } from 'react';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import { ErrorMessage } from '@hookform/error-message';
import Typography from "@mui/material/Typography";


const PaymentForm = () => {
    const [state, setState] = useState({
        number: '',
        expiry: '',
        cvc: '',
        name: '',
        focused: '',
    });

    const handleInputChange = (evt: any) => {
        const { name, value } = evt.target;

        setState((prev) => ({ ...prev, [name]: value }));
    }

    const handleInputFocus = (evt: any) => {
        setState((prev) => ({ ...prev, focused: evt.target.name }));
    }

    const {
        register,
        formState,
        handleSubmit,
    } = useForm({ resolver: yupResolver(schemaCard), reValidateMode: "onChange" })

    const { errors, isSubmitted, isSubmitting } = formState;

    const onSubmit = (data: any) => {
        console.log(data);

    }

    return (
        <div>
            <Cards
                number={state.number}
                expiry={state.expiry}
                cvc={state.cvc}
                name={state.name}
                focused={state.focused}
            />

            <form onSubmit={handleSubmit(onSubmit)}>
                <Typography variant="caption" color="red">
                    <ErrorMessage errors={errors} name="number" />
                </Typography>

                <input
                    {...register("number")}
                    type="number"
                    name="number"
                    placeholder="Card Number"
                    value={state.number}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                />

                <Typography variant="caption" color="red">
                    <ErrorMessage errors={errors} name="expDate" />
                </Typography>

                <input
                    {...register("expDate")}
                    type="text"
                    name="expiry"
                    placeholder="Card Expiry"
                    value={state.expiry}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                />

                <Typography variant="caption" color="red">
                    <ErrorMessage errors={errors} name="cvc" />
                </Typography>

                <input
                    {...register("cvc")}
                    type="number"
                    name="cvc"
                    placeholder="Card CVC"
                    value={state.cvc}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                />

                <Typography variant="caption" color="red">
                    <ErrorMessage errors={errors} name="nameOnCard" />
                </Typography>

                <input
                    {...register("nameOnCard")}
                    type="text"
                    name="name"
                    placeholder="Card Name"
                    value={state.name}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                />



            </form>

        </div>
    );
};
export default PaymentForm;