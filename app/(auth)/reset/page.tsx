import { FC } from "react";
import { FormWrapper } from "@/components/auth/form-wrapper";
// import { ResetForm } from "@/components/auth/reset-form";
import {ResetForm} from "@/components/auth/reset-form";
import {type Metadata} from "next";
export const metadata: Metadata = {
  title: 'Forgot Password',
  description: 'Reset your password and regain access to your Sendly account quickly and securely.',
  
  openGraph: {
    title: 'Forgot Password',
    description: 'Reset your password and regain access to your Sendly account quickly and securely.',
    url: 'https://sendlyy.vercel.app/reset',
    images: [
      {
        url: '/reset.png',
        width: 1200,
        height: 627,
        alt: 'Sendly Forgot Password',
      },
    ],
    type: 'website',
  },
  
  twitter: {
    card: 'summary_large_image',
    title: 'Forgot Password',
    description: 'Reset your password for your Sendly account and continue managing your deliveries.',
    images: [
      {
        url: '/reset.png',
        alt: 'Sendly Forgot Password',
      },
    ],
  },
};

const ResetPassword: FC = async () => {
  return (
    <FormWrapper
      title="Forgot your password?"
      backButtonLinkText="Back to login"
      backButtonUrl={`/login`}
    >
        
      <ResetForm />
    </FormWrapper>
  );
};

export default ResetPassword;
