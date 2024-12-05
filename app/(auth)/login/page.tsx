import {FC} from 'react'
import { FormWrapper } from "@/components/auth/form-wrapper";
import { LoginForm } from '@/components/auth/login-form';
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
