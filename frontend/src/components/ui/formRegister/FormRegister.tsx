import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { signIn, useSession } from 'next-auth/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Typography } from '@mui/material';
import { ErrorMessage } from '@hookform/error-message';
import { CustomTextField } from '@/components/ui/customInput/CustomTextField';
import { schemaRegister } from '@/rules';
import Image from 'next/image';

interface FormData {
  email: string;
  username: string;
  password: string;
  repeatPassword: string;
}

const FormRegister = () => {
  const { data: session } = useSession();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schemaRegister),
    reValidateMode: 'onChange',
  });

  const router = useRouter();

  useEffect(() => {
    // Redirect to '/' if the user is signed in and on a different page
    if (session && session.user && router.pathname == '/login') {
      router.push('/');
    }
  }, [session, router]);

  const onSubmit = async (data: FormData) => {
    const { email, username, password } = data;
    // Handle login submission here
    const responseNextAuth = await signIn('credentials', {
      email,
      username,
      password,
      redirect: false,
    });
    console.log(responseNextAuth, data);
  };

  return (
    <div className='container-form'>
      <div className='left' >
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <Typography sx={{ paddingBottom: '1rem' }} variant="h3" >
            Create a New User
          </Typography>

          <Typography variant="caption" color="red">
            <ErrorMessage errors={errors} name="email" />
          </Typography>

          <div style={{ width: "100%", padding: "0.75rem 0px" }}>
            <CustomTextField
              variant="filled"
              required={true}
              name="email"
              label="Email"
              type="text"
              control={control}
              defaultValue=""
            />
          </div>

          <Typography variant="caption" color="red">
            <ErrorMessage errors={errors} name="username" />
          </Typography>

          <div style={{ width: "100%", padding: "0.75rem 0px" }}>
            <CustomTextField
              variant="filled"
              required={true}
              name="username"
              label="Username"
              type="text"
              control={control}
              defaultValue=""
            />
          </div>

          <Typography variant="caption" color="red">
            <ErrorMessage errors={errors} name="password" />
          </Typography>

          <div style={{ width: "100%", padding: "0.75rem 0px" }}>
            <CustomTextField
              variant="filled"
              required={true}
              name="password"
              label="Password"
              type="password"
              control={control}
              defaultValue=""
            />
          </div>

          <Typography variant="caption" color="red">
            <ErrorMessage errors={errors} name="repeatPassword" />
          </Typography>

          <div style={{ width: "100%", padding: "0.75rem 0px" }}>
            <CustomTextField
              variant="filled"
              required={true}
              name="repeatPassword"
              label="Repeat Password"
              type="password"
              control={control}
              defaultValue=""
            />
          </div>

          <Button sx={{ width: '100%' }} variant="contained" type="submit">
            {' '}
            Create User{' '}
          </Button>
        </form>
      </div>
        <Image
          width={415}
          height={534}
          src="/logo.png"
          alt={"logo"} />
    </div>

  );
};

export default FormRegister;
