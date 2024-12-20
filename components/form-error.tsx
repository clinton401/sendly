import {FC} from "react";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
type FormErrorProps = {
  message : string | undefined
}
export const FormError: FC<FormErrorProps> = ({ message }) => {
  if(!message) return null;
  return (
    <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive">
        <ExclamationTriangleIcon className="aspect-square h-4" />
        <p>{message}</p>
    </div>
)}