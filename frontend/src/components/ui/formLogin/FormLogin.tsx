import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router'
import { signIn, useSession } from 'next-auth/react'
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Typography } from '@mui/material';
import { ErrorMessage } from '@hookform/error-message';
import { schemaLogin } from '@/rules';
import { CustomTextField } from '@/components/ui/customInput/CustomTextField';

interface FormData {
    username: string
    password: string
}

const FormLogin = () => {
    const { data: session } = useSession()

    const {
        handleSubmit,
        control, 
        formState: { errors }
    } = useForm<FormData>({ resolver: yupResolver(schemaLogin), reValidateMode: "onChange" });

    const router = useRouter()

    useEffect(() => {
        // Redirect to '/' if the user is signed in and on a different page
        if (session && session.user && router.pathname == '/login') {
            router.push('/')
        }
    }, [session, router])

    const onSubmit = async (data: FormData) => {
        const { username, password } = data
        // Handle login submission here
        const responseNextAuth = await signIn("credentials", {
            username,
            password,
            redirect: false,
        });
        console.log(responseNextAuth,data)
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
                variant='outlined'
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
                variant='outlined'
            />
            <Button sx={{ width: "60%" }} variant="outlined" type="submit">LogIn </Button>
        </form>
    )
}

export default FormLogin