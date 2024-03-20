import BaseLayout from '@/components/layouts/base-layout'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Typography } from '@mui/material'
import { ErrorMessage } from '@hookform/error-message'


export default function contact() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm()

  const onSubmit = async () => {}

  return (
    <BaseLayout>
      <section>
        <article style={{ display: 'flex', justifyContent: 'center' }}>
          <form onSubmit={handleSubmit(onSubmit)} className='form'>
            <div className='form-top'>
              <h2 className='h2'>Get In Touh With Us!</h2>
              <label htmlFor='name' className='input-label'>
                Name
              </label>
              <input
                {...register('name')}
                type='text'
                placeholder='Your Name'
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
                placeholder='Your Last Name'
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
                placeholder='Your Email'
                name='email'
                className='input-form'
              />
              <Typography variant='caption' color='black'>
                <ErrorMessage errors={errors} name='email' />
              </Typography>

              <label htmlFor='message' className='input-label'>
                Message
              </label>

              <textarea
                placeholder='Your message'
                name='message'
                id='message'
                style={{
                  width: 'auto',
                  maxWidth: '100%',
                  height: 50,
                  paddingTop: 10,
                  paddingLeft: 10,
                }}
              ></textarea>
            </div>

            <div className='form-bottom'>
              <button type='submit' className='button-form'>
                Send
              </button>
            </div>
          </form>
        </article>
      </section>
    </BaseLayout>
  )
}
