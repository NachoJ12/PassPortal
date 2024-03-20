import LogInLayout from '@/components/layouts/login-register-layout'
import React from 'react'
import FormRegister from '@/components/ui/formRegister/FormRegister';

export default function register() {
  return (
    <LogInLayout>
      <FormRegister/>
    </LogInLayout>
    )
}
