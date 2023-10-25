import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router'
import { signIn, useSession } from 'next-auth/react'
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Typography } from '@mui/material';
import { ErrorMessage } from '@hookform/error-message';
import { CustomTextField } from '@/components/ui/customInput/CustomTextField';
import { schemaRegister } from '@/rules';

interface FormData {
    email: string
    username: string
    password: string
    repeatPassword: string
}

const FormRegister = () => {

    const { data: session } = useSession()

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<FormData>({ resolver: yupResolver(schemaRegister), reValidateMode: "onChange" });

    const router = useRouter()

    useEffect(() => {
        // Redirect to '/' if the user is signed in and on a different page
        if (session && session.user && router.pathname == '/login') {
            router.push('/')
        }
    }, [session, router])

    const onSubmit = async (data: FormData) => {
        const { email, username, password } = data
        // Handle login submission here
        const responseNextAuth = await signIn("credentials", {
            email,
            username,
            password,
            redirect: false,
        });
        console.log(responseNextAuth, data)
    }



    return (
        <form className='form' onSubmit={handleSubmit(onSubmit)}>
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
            <Button sx={{ width: "60%" }} variant="outlined" type="submit"> Create User </Button>

        </form>
    )
}

export default FormRegister