import React from 'react'
import LogInLayout from '@/components/layouts/login-register-layout'
import FormLogin from '@/components/ui/formLogin/FormLogin';

export default function login() {
  return (
    <LogInLayout>
      <FormLogin />
    </LogInLayout>
  )
}
