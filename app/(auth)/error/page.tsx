import {FC} from 'react';
import { FormWrapper } from "@/components/auth/form-wrapper";
import {FormError} from "@/components/form-error";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: 'Error',
  description: 'Something went wrong. Please try again or go back to the login page.',
};

const ErrorPage: FC = () => {
  return (
    <FormWrapper title=" Something went wrong"
    backButtonLinkText="Back to login"
    backButtonUrl={`/login`}>
      <FormError message="Sign in unsuccessful" />
    </FormWrapper>
  )
}

export default ErrorPage
