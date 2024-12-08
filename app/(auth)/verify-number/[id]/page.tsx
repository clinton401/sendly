import {FC} from 'react'
import { FormWrapper } from "@/components/auth/form-wrapper";
import { VerifyPhoneForm } from '@/components/auth/verify-phone-form';

import {type Metadata} from "next";
export const metadata: Metadata = {
  title: 'Verify Number',
  description: 'Verify your phone number to secure your Sendly account and start using all the features.',
  
  openGraph: {
    title: 'Verify Number',
    description: 'Verify your phone number to secure your Sendly account and start using all the features.',
    url: 'https://sendlyy.vercel.app/verify-number/:id',
    images: [
      {
        url: '/assets/verify-number.png',
        width: 1200,
        height: 627,
        alt: 'Sendly Verify Number',
      },
    ],
    type: 'website',
  },
  
  twitter: {
    card: 'summary_large_image',
    title: 'Verify Number',
    description: 'Verify your phone number to enhance the security of your Sendly account.',
    images: [
      {
        url: '/assets/verify-number.png',
        alt: 'Sendly Verify Number',
      },
    ],
  },
};

const VerifyPhoneNumber: FC = async() => {
  return (
    <FormWrapper title="Verify your number"
    backButtonLinkText="Back to login"
    backButtonUrl={`/login`}
    >
      <VerifyPhoneForm />
    </FormWrapper>
  )
}

export default VerifyPhoneNumber
