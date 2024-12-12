import {FC } from "react";
import {DeliveryTab} from "@/components/protected/delivery-tab";

import {type Metadata} from "next";
export const metadata: Metadata = {
  title: 'Find Agents',
  description: 'Easily locate trusted delivery agents for your goods with Sendly. Find the best agents instantly and hassle-free.',

  openGraph: {
    title: 'Find Agents',
    description: 'Easily locate trusted delivery agents for your goods with Sendly. Find the best agents instantly and hassle-free.',
    url: 'https://sendlyy.vercel.app/find-agents',
    images: [
      {
        url: '/find-agents.png',
        width: 1200,
        height: 627,
        alt: 'Sendly Find Agents',
      },
    ],
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Find Agents',
    description: 'Find trusted delivery agents for your goods instantly with Sendly.',
    images: [
      {
        url: '/find-agents.png',
        alt: 'Sendly Find Agents',
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