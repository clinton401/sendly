import {FC} from 'react'
import { FormWrapper } from "@/components/auth/form-wrapper";
import { LoginForm } from '@/components/auth/login-form';
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: 'Login',
  description: 'Login to your Sendly account to manage your deliveries and connect with trusted agents.',
  
  openGraph: {
    title: 'Login',
    description: 'Login to your Sendly account to manage your deliveries and connect with trusted agents.',
    url: 'https://sendlyy.vercel.app/login',  
    images: [
      {
        url: '/login.png',
        width: 1200,
        height: 627,
        alt: 'Sendly Login',
      },
    ],
    type: 'website',
  },
  
  twitter: {
    card: 'summary_large_image',
    title: 'Login',
    description: 'Login to manage your deliveries and find agents quickly and easily on Sendly.',
    images: [
      {
        url: '/login.png',
        alt: 'Sendly Login',
      },
    ],
  },
};

 const Login: FC = async () => {
  return (
    <FormWrapper
    title="Sign in to your account"
    backButtonText="Don&apos;t have an account?"
    backButtonLinkText="Create one"
      backButtonUrl={`/register`}
      
    >
      
      
      <LoginForm />
    </FormWrapper>
  )
}

export default Login;
