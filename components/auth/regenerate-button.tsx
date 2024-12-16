import {FC} from 'react'
import {Button} from "@/components/ui/button";
import {Loader} from "lucide-react"
// import {MiniLoader} from "@/components/mini-loader"
type RegenerateProps = {
    isNewEmailPending: boolean;
    isResendClicked: boolean;
    resendCode: ()=> Promise<void>;
    resetCounter: number,
    disabled: boolean
}

export const RegenerateButton: FC<RegenerateProps> = ({isNewEmailPending, isResendClicked, resendCode, resetCounter, disabled}) => {
  return (
    <Button  disabled={disabled || isResendClicked } className={ `w-full`} variant={ "secondary"} onClick={resendCode}>

    { isNewEmailPending && <>
      <Loader className="mr-1 h-4 w-4 animate-spin"/> Please wait...</>}
    {!isNewEmailPending && isResendClicked && <>{ resetCounter < 10 ? `00:0${resetCounter}` : `00:${resetCounter}`}</>}

{!isNewEmailPending && !isResendClicked && "Resend"}
      </Button>
  )
}
