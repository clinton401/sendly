import {FC} from 'react'
import {Button} from "@/components/ui/button";
import {Loader} from "lucide-react"
import {MiniLoader} from "@/components/mini-loader"
type LoadingButtonProps ={
    isPending: boolean,
    message: string,
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link",
    loadingText?: string
}
export const LoadingButton: FC<LoadingButtonProps> = ({isPending, message, variant="default", loadingText}) => {
  return (
    <Button type="submit" variant={variant} disabled={isPending} className="w-full items-center justify-center">
            
            {isPending ? <>
            <Loader className="mr-2 h-4 w-4 animate-spin"/> {loadingText ? loadingText : "Please wait..."}</>: message}
            {/* {isPending ? <MiniLoader/>: message} */}
      
            
          </Button>
  )
}
