"use client";
import { SessionType } from "@/lib/types";
import { FC, useState, Dispatch, SetStateAction } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, LogOut, Loader } from "lucide-react";
import createToast from "@/hooks/create-toast";
import { signOut } from "next-auth/react";

export const AuthButton: FC<{
  session: SessionType | undefined;
  mobile: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}> = ({ session, mobile, setOpen }) => {
  const [isPending, setIsPending] = useState(false);
  const { createSimple, createError } = createToast();
  const handleLogout = async () => {
    try {
      setIsPending(true);
      await signOut();
      createSimple("You have logged out successfully");
      setOpen(false);
      window.location.href = "/login";
    } catch (error) {
      console.error(`Unable to logout: ${error}`);
      createError("There was a problem trying to logout");
    } finally {
      setIsPending(false);
    }
  };
  return (
    <>
      {!session && (
        <Button asChild>
          <Link href={`/login  `}>Get Started</Link>
        </Button>
      )}
      {session && !mobile && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="rounded-full max-w-[150px] flex items-center"
            >
              <span className="grow truncate ">{session.name}</span>
              {isPending ? (
                <Loader className="animate-spin h-3 w-3" />
              ) : (
                <ChevronDown className="ml-1 h-3 w-3" />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuItem
              className="flex cursor-pointer items-center"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 mr-1" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
      {session && mobile && (
        <Button
          className="  flex items-center w-[100px]"
          onClick={handleLogout}
        >
          {isPending ? <Loader className="animate-spin h-4 w-4" /> : " Log out"}
        </Button>
      )}
    </>
  );
};
