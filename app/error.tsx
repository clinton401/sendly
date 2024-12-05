"use client";
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { cinzel } from '@/lib/fonts';

function ErrorPage({ error, reset }: { error: Error,  reset: () => void }) {
  
    useEffect(() => {
        console.error(`${error}`);
    }, [error]);
    const refreshHandler = () => {
  
      reset();
    }
    return (
      <main className=" min-h-dvh  overflow-hidden relative py-4 px-p-half flex flex-col items-center gap-4 justify-center ">
        <h1
          className={`w-full text-center text-destructive text-4xl font-black uppercase  ${cinzel.className}`}
        >
          Something went wrong
        </h1>
        <h2
          className={`w-full text-center  text-2xl font-bold  ${cinzel.className}`}
        >
          {error.message}
        </h2>
        <Button
          onClick={refreshHandler}
        >
          Try Again
        </Button>
      </main>
    );
}
export default ErrorPage;