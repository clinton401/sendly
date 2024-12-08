import {FC} from 'react'
import { FormWrapper } from "@/components/auth/form-wrapper";
import { RegisterForm } from '@/components/auth/register-form';
import {type Metadata} from "next";
export const metadata: Metadata = {
  title: 'Register',
  description: 'Create a new Sendly account to start connecting with delivery agents and manage your deliveries.',
  
  openGraph: {
    title: 'Register',
    description: 'Create a new Sendly account to start connecting with delivery agents and manage your deliveries.',
    url: 'https://sendlyy.vercel.app/register',
    images: [
      {
        url: '/register.png',
        width: 1200,
        height: 627,
        alt: 'Sendly Register',
      },
    ],
    type: 'website',
  },
  
  twitter: {
    card: 'summary_large_image',
    title: 'Register',
    description: 'Create an account on Sendly to manage your deliveries and find trusted agents.',
    images: [
      {
        url: '/register.png',
        alt: 'Sendly Register',
      },
    ],
  },
};

 const Register: FC = async () => {
  return (
    <FormWrapper
      title="Create an account"
      backButtonText="Already have an account?"
      backButtonLinkText="Sign in"
      backButtonUrl={`/login`}
      
    >
      
      
      <RegisterForm />
    </FormWrapper>
  )
}

export default Register;
