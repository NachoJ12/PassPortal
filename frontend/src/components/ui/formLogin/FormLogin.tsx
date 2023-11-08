import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router'
import { signIn, useSession } from 'next-auth/react'
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Typography } from '@mui/material';
import { ErrorMessage } from '@hookform/error-message';
import { schemaLogin } from '@/rules';
import { CustomTextField } from '@/components/ui/customInput/CustomTextField';
import Image from 'next/image';

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
        console.log(responseNextAuth, data)
    }

    return (
        <div className='container-form'>
            <div className='left' >
                <Typography sx={{ paddingBottom: "1rem" }} variant="h3" >
                    Login
                </Typography>

                <form className='form' onSubmit={handleSubmit(onSubmit)}>

                    <Typography variant="caption" color="red">
                        <ErrorMessage errors={errors} name="username" />
                    </Typography>

                    <div style={{ width: "100%", padding: "0.75rem 0px" }}>
                        <CustomTextField
                            required={true}
                            name="username"
                            label="Username"
                            type="text"
                            control={control}
                            defaultValue=""
                            variant='filled'
                        />
                    </div>

                    <Typography variant="caption" color="red">
                        <ErrorMessage errors={errors} name="password" />
                    </Typography>

                    <div style={{ padding: "0.75rem 0px", width: "100%" }}>
                        <CustomTextField
                            required={true}
                            name="password"
                            label="Password"
                            type="password"
                            control={control}
                            defaultValue=""
                            variant='filled'

                        />
                    </div>
                    <Button sx={{ width: "100%", padding: "0.75rem 0px" }} variant="contained" type="submit">LogIn </Button>
                </form>
            </div>

            <Image
                width={415}
                height={534}
                src="/logo.png"
                alt={"logo"} />
        </div>
    )
}

export default FormLogin