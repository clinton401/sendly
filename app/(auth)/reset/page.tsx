import { FC } from "react";
import { FormWrapper } from "@/components/auth/form-wrapper";
// import { ResetForm } from "@/components/auth/reset-form";
import {ResetForm} from "@/components/auth/reset-form"
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
