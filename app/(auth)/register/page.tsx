import {FC} from 'react'
import { FormWrapper } from "@/components/auth/form-wrapper";
import { RegisterForm } from '@/components/auth/register-form';
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
