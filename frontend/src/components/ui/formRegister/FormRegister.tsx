import React from 'react'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { CustomTextField } from '@/components/ui/customInput/CustomTextField';
import { Button, Typography } from '@mui/material';
import { ErrorMessage } from '@hookform/error-message';
import { schemaRegister } from '@/rules';

interface FormData{
    email :string
    username : string
    password: string
    repeatPassword: string
}

const FormRegister = () => {

    const { 
        handleSubmit, 
        control, 
        formState: { errors }, 
        getFieldState } =  useForm<FormData>({resolver: yupResolver(schemaRegister), reValidateMode:"onChange"});

    const onSubmit = (data: any) => {
        console.log(data)
    }

    return (
        <form  className='form' onSubmit={handleSubmit(onSubmit)}>
            <Typography sx={{ paddingBottom: "1rem" }} variant="h4" align="center">
                Create a New User
            </Typography>

            <Typography variant="caption" color="red">
                <ErrorMessage errors={errors} name="email" />
            </Typography>

            <CustomTextField
                required={true}
                name="email"
                label="Email"
                type="text"
                control={control}
                defaultValue=""
            />

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

            <Typography variant="caption" color="red">
                <ErrorMessage errors={errors} name="repeatPassword" />
            </Typography>

            <CustomTextField
                required={true}
                name="repeatPassword"
                label="Repeat Password"
                type="password"
                control={control}
                defaultValue=""
            />
            <Button sx={{width:"60%"}} variant="outlined" type="submit"> Create User </Button>

        </form>
    )
}

export default FormRegister