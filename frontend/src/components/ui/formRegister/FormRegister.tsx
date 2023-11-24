import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { signIn, useSession } from 'next-auth/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { Typography } from '@mui/material'
import { ErrorMessage } from '@hookform/error-message'
import { schemaRegister } from '@/rules'
import Image from 'next/image'
import GoogleButton from '../googlebutton/GoogleButton'
import Link from 'next/link'

interface FormData {
  name: string
  lastName: string
  email: string
  username: string
  password: string
  repeatPassword: string
}

const FormRegister = () => {
  const { data: session } = useSession()
  const [errorsApi, setErrorsApi] = useState<string | null | undefined>()

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schemaRegister),
    reValidateMode: 'onChange',
  })

  const router = useRouter()

  useEffect(() => {
    // Redirect to '/' if the user is signed in and on a different page
    if (session && session.user && router.pathname == '/login') {
      router.push('/')
    }
  }, [session, router])

  const onSubmit = async (data: FormData) => {
    const { name, lastName, email, username, password } = data
    // Handle login submission here

    const post = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        username,
        email,
        name,
        lastName,
        password,
      }),
    })

    if (!post.ok) {
      setErrorsApi('Error while creating user')
    }

    const responseNextAuth = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })

    if (!responseNextAuth?.ok) {
      setErrorsApi(responseNextAuth?.error)
    }
  }

  return (
    <div className='container'>
      <div className='container-form'>
        <form onSubmit={handleSubmit(onSubmit)} className='form'>
          <div className='form-top'>
            <h2 className='h2'>Welcome !</h2>
            <h1 className='h1'>Sign Up</h1>
            <label htmlFor='name' className='input-label'>
              Name
            </label>
            <input
              {...register('name')}
              type='text'
              placeholder='john'
              name='name'
              className='input-form'
            />
            <Typography variant='caption' color='black'>
              <ErrorMessage errors={errors} name='name' />
            </Typography>

            <label htmlFor='lastName' className='input-label'>
              Last Name
            </label>
            <input
              {...register('lastName')}
              type='text'
              placeholder='doe'
              name='lastName'
              className='input-form'
            />
            <Typography variant='caption' color='black'>
              <ErrorMessage errors={errors} name='lastName' />
            </Typography>

            <label htmlFor='email' className='input-label'>
              Email
            </label>
            <input
              {...register('email')}
              type='text'
              placeholder='johndoe@example.com'
              name='email'
              className='input-form'
            />
            <Typography variant='caption' color='black'>
              <ErrorMessage errors={errors} name='email' />
            </Typography>

            <label htmlFor='username' className='input-label'>
              Username
            </label>
            <input
              {...register('username')}
              type='text'
              placeholder='johndoe123'
              name='username'
              className='input-form'
            />
            <Typography variant='caption' color='black'>
              <ErrorMessage errors={errors} name='username' />
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
            <Typography variant='caption' color='black'>
              <ErrorMessage errors={errors} name='password' />
            </Typography>

            <label htmlFor='repeatPassword' className='input-label'>
              Repeat Password
            </label>
            <input
              {...register('repeatPassword')}
              type='password'
              placeholder='Repeat your password'
              name='repeatPassword'
              className='input-form'
            />
            <Typography variant='caption' color='black'>
              <ErrorMessage errors={errors} name='repeatPassword' />
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

            <button type='submit' className='button-form'>
              Register
            </button>
            {errorsApi && (
              <Typography variant='caption' color='black'>
                {errorsApi}
              </Typography>
            )}
            <h3>or continue with</h3>
            <GoogleButton />
            <div style={{ marginTop: '0.2rem' }}>
              <p className=''>
                Have an account?{'  '}
                <Link href='/login' className='form_link'>
                  Login
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
      <div className='container-logo'>
        <Link href='/'>
          <Image src='/logoPassPortalTicket.svg' alt={'logo-passportal'} width={600} height={600} />
        </Link>
      </div>
    </div>
  )
}

export default FormRegister
