import {FC } from "react";
import {DeliveryTab} from "@/components/protected/delivery-tab";

import {type Metadata} from "next";
export const metadata: Metadata = {
    title: 'Delivery',
    description: 'Create, track, and manage your deliveries easily. Find the best agents for your goods instantly with Sendly.',
    
    openGraph: {
      title: 'Delivery',
      description: 'Create, track, and manage your deliveries easily. Find the best agents for your goods instantly with Sendly.',
      url: 'https://sendlyy.vercel.app/delivery',
      images: [
        {
          url: '/delivery.png',
          width: 1200,
          height: 627,
          alt: 'Sendly Delivery',
        },
      ],
      type: 'website',
    },
    
    twitter: {
      card: 'summary_large_image',
      title: 'Delivery',
      description: 'Track your orders and find reliable agents for your delivery with Sendly.',
      images: [
        {
          url: '/delivery.png',
          alt: 'Sendly Delivery',
        },
      ],
    },
  };
  
const Deliveries: FC = () => {
    return <main className="px-hz w-full flex-col flex gap-y-8 pt-[120px] pb-16">
        {/* <h1 className={`${cinzel.className} text-3xl font-black`}>
        Delivery Services
        </h1> */}
        <DeliveryTab/>
    </main>
}

export default Deliveries;