import {FC} from 'react'
import { FormWrapper } from "@/components/auth/form-wrapper";
import { VerifyPhoneForm } from '@/components/auth/verify-phone-form';
const VerifyPhoneNumber: FC = async() => {
  return (
    <FormWrapper title="Verify your phone number"
    backButtonLinkText="Back to login"
    backButtonUrl={`/login`}
    >
      <VerifyPhoneForm />
    </FormWrapper>
  )
}

export default VerifyPhoneNumber
