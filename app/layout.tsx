import type { Metadata } from "next";
import {Urbanist} from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider";
import {Navbar} from "@/components/navbar"
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ContextProvider } from "@/components/context-provider";
const urbanist = Urbanist({ subsets: ["latin"], weight: ["100", "200" ,"300" , "400"  , "500", "600", "700", "800",  "900" ] });

export const metadata: Metadata = {
  title: {
    default: 'Sendly',
    template: '%s | Sendly',
  },
  description: 'Sendly connects you with trusted delivery agents to transport your goods safely, quickly, and affordably anywhere, anytime.',
  
  openGraph: {
    title: 'Sendly',
    description: 'Sendly connects you with trusted delivery agents to transport your goods safely, quickly, and affordably anywhere, anytime.',
    url: 'https://sendlyy.vercel.app',  
    images: [
      {
        url: '/home.png',  
        width: 1200,
        height: 627,
        alt: 'Sendly - Trusted Delivery Agents',
      },
    ],
    type: 'website', 
  },
  
  twitter: {
    card: 'summary_large_image',
    title: 'Sendly',
    description: 'Need a delivery agent? Sendly helps you transport your goods securely and efficiently with verified agents.',
    images: [
      {
        url: '/home.png', 
        alt: 'Sendly - Trusted Delivery Agents',
      },
    ],
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${urbanist.className}  antialiased`}
      >
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          ><Toaster/>
           <ContextProvider>
            <Navbar />
            {children}
           </ContextProvider>

          </ThemeProvider>
      </body>
    </html>
  );
}
