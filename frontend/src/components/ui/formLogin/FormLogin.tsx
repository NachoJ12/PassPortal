import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router'
import { signIn, useSession } from 'next-auth/react'
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Typography } from '@mui/material';
import { ErrorMessage } from '@hookform/error-message';
import { schemaLogin } from '@/rules';
import { CustomTextField } from '@/components/ui/customInput/CustomTextField';
import Image from 'next/image';
import GoogleButton from '../googlebutton/GoogleButton';
import Link from 'next/link';

interface FormData {
    email: string
    password: string
}

const FormLogin = () => {
    const { data: session } = useSession()
    const [errorsApi, setErrorsApi] = useState<string | null | undefined>()
    const {
        handleSubmit,
        register,
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
        const { email, password } = data
        // Handle login submission here
        const responseNextAuth = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });

        if (!responseNextAuth?.ok) {
            setErrorsApi("Username or Password incorrect")
        }
    }

    return (
        <div className='container'>
            <div className='container-form'>
                <form onSubmit={handleSubmit(onSubmit)} className='form'>
                    <div className='form-top'>
                        <h2 className='h2'>Welcome !</h2>
                        <h1 className='h1'>
                            Log In
                        </h1>
                        <label htmlFor='email' className='input-label'>
                            Email
                        </label>
                        <input
                            {...register('email')}
                            type='text'
                            placeholder='johndoe'
                            name='email'
                            className='input-form'
                        />
                        <Typography variant="caption" color="red">
                            <ErrorMessage errors={errors} name="email" />
                        </Typography>
                        <label htmlFor='password' className='input-label'>
                            Password
                        </label>
                        <input
                            {...register('password')}
                            type='password'
                            placeholder='Enter your password'
                            name='password'
                            className='input-form'
                        />
                        <Typography variant="caption" color="red">
                            <ErrorMessage errors={errors} name="password" />
                        </Typography>
                    </div>
                    <div className='form-bottom'>
                        {/* <div className='flex items-center justify-between pb-6 w-full gap-2'>
                            <label className='flex items-center gap-2'>
                                <input
                                    type='checkbox'
                                    {...register('rememberMe')}
                                    className='accent-primary-color text-primary-color ml-1 hover:text-primary-color focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                                />
                                Remember Me
                            </label>
                            <a
                                href='/forgot-password'
                                className='text-primary-color hover:underline'
                            >
                                Forgot Password?
                            </a>
                        </div> */}

                        <button
                            type='submit'
                            className='button-form'
                        >
                            Login
                        </button>

                        {errorsApi &&
                            <Typography variant="caption" color="red">
                                {errorsApi}
                            </Typography>
                        }

                        {/* <h3 >or continue with</h3>
                        <GoogleButton /> */}
                        <div style={{ marginTop: "0.2rem" }}>
                            <p className=''>
                                Don´t have an account yet?{'  '}
                                <Link
                                    href='/register'
                                    className='form_link'
                                >
                                    Register
                                </Link>
                            </p>
                        </div>
                    </div>

                </form>
            </div>
            <div className='container-logo'>
                <Link href="/">
                    <Image src="/logoPassPortalTicket.svg" alt={'logo'} width={600} height={600} />
                </Link>
            </div>
        </div>
    )
}

export default FormLogin