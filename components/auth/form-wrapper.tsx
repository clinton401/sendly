import {FC, ReactNode} from 'react'
import { cinzel } from "@/lib/fonts";
import logo from "../../public/logo.png";
import { Images } from "@/components/images";
import Link from "next/link";
import {appearAnimation} from "@/lib/motion";
import {MotionComponent} from "@/components/motion-component"
type FormWrapperProps = {
    children: ReactNode;
    title: string
    backButtonText?: string;
    backButtonLinkText: string;
    backButtonUrl: string;
    
}


export const FormWrapper: FC<FormWrapperProps> = ({children, title, backButtonText, backButtonLinkText, backButtonUrl}) => {

  
  return (
<div className="flex flex-col items-center px-hz pb-8 pt-[100px] justify-center min-h-dvh w-full gap-4">
      <MotionComponent variants={appearAnimation} initial="hidden" animate="visible" className="flex flex-col  lg:w-[50%] max-w-[500px] w-full gap-4">
        <span className="relative w-[60px] aspect-square overflow-hidden ">
          <Images url={logo} alt="website logo" />
        </span>
        <span className="w-full flex flex-col gap-2 ">
          <h2 className={`${cinzel.className}  font-black text-xl sm:text-3xl`}>
           {title}
          </h2>
          <p className="flex flex-wrap text-sm items-center">
         {backButtonText && backButtonText}
            <Link href={backButtonUrl} className={` ${backButtonText ? "ml-1" : ""} text-primary`}>
           {backButtonLinkText}
            </Link>
          </p>
        </span>



        {children}
      </MotionComponent>
      
    </div>
  )
}
