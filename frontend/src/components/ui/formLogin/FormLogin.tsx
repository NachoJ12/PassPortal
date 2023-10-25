import React from 'react'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { CustomTextField } from '../customInput/CustomTextField';
import { Button, Typography } from '@mui/material';
import { ErrorMessage } from '@hookform/error-message';
import { schemaLogin } from '@/rules';


interface FormData {
    username: string
    password: string
}

const FormLogin = () => {

    const { 
        handleSubmit, 
        control, 
        getFieldState, formState: { errors } } = useForm<FormData>({resolver: yupResolver(schemaLogin), reValidateMode:"onChange"});

    const onSubmit = (data: any) => {
        console.log(data)
    }
    return (
        <form className='form' onSubmit={handleSubmit(onSubmit)}>
            <Typography sx={{ paddingBottom: "1rem" }} variant="h4" align="center">
                Login
            </Typography>

            <Typography variant="caption" color="red">
                <ErrorMessage errors={errors} name="username" />
            </Typography>

            <CustomTextField
                required={true}
                name="username"
                label="Username"
                type="text"
                control={control}
                defaultValue=""
            />

            <Typography variant="caption" color="red">
                <ErrorMessage errors={errors} name="password" />
            </Typography>

            <CustomTextField
                required={true}
                name="password"
                label="Password"
                type="password"
                control={control}
                defaultValue=""
            />
            <Button  sx={{width:"60%"}} variant="outlined" type="submit">LogIn </Button>
        </form>
    )
}

export default FormLogin