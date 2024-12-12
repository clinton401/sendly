import React from "react";
import { TrackOrder } from "@/components/protected/track-order";
import {type Metadata} from "next";
export const metadata: Metadata = {
    title: 'My Orders',
    description: 'Manage and track all your orders seamlessly with Sendly. Keep up-to-date with your delivery statuses effortlessly.',
  
    openGraph: {
      title: 'My Orders',
      description: 'Manage and track all your orders seamlessly with Sendly. Keep up-to-date with your delivery statuses effortlessly.',
      url: 'https://sendlyy.vercel.app/my-orders',
      images: [
        {
          url: '/my-orders.png', 
          width: 1200,
          height: 627,
          alt: 'Sendly My Orders',
        },
      ],
      type: 'website',
    },
  
    twitter: {
      card: 'summary_large_image',
      title: 'My Orders',
      description: 'Track and manage your orders effortlessly with Sendly.',
      images: [
        {
          url: '/my-orders.png', 
          alt: 'Sendly My Orders',
        },
      ],
    },
  };
  
const MyOrderPage = () => {
  return (
    <main className="px-hz w-full items-center justify-center flex gap-y-8 pt-[120px] pb-16">
        <TrackOrder />
    </main>
  );
};

export default MyOrderPage;
