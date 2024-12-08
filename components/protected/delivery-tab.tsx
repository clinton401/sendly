"use client";
import { FC, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "motion/react";
import { Package, Truck } from "lucide-react";
import { hamMenu } from "@/lib/motion";
import {CreateDelivery} from "@/components/protected/create-delivery";
import {TrackOrder} from "@/components/protected/track-order";
export enum OrderStatus  {
    PENDING = "PENDING",
    MATCHED = "MATCHED",
    CANCELLED = "CANCELLED"
}
export type Order = {
    orderId: number;
    pickupAddress: string;
    deliveryAddress: string;
    recipientName: string;
    recipientPhone: string;
    extra?: string; 
    orderStatus: OrderStatus.PENDING | OrderStatus.MATCHED | OrderStatus.CANCELLED;
    creationDate: Date; 
    deliveryFee?: number; 
    agentDetails: {
      name: string;
      contact: string;
    };
  };
 export type DeliveryDetailsType = {
    pickupAddress: string;
    deliveryAddress: string;
    recipientName: string;
    recipientPhone: string;
    extraDetails?: string;
  }
  
export const DeliveryTab: FC = () => {
  const [tab, setTab] = useState<"CREATE" | "TRACK">("CREATE");
  const [orders, setOrders] = useState<Order[]>([]);
  
  const [viewMore, setViewMore] = useState(false)
  const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
  }
  const tabHandler = (value: "CREATE" | "TRACK") => {
    setTab(value);
    scrollToTop()
  };
  useEffect(() => {
    scrollToTop()
  }, [])
  useEffect(() => {
    const timer = setTimeout(() => {
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.orderStatus === OrderStatus.PENDING
            ? { ...order, orderStatus: OrderStatus.MATCHED }
            : order
        )
      );
    }, 10000);

    return () => clearTimeout(timer);
  }, [orders]);

  const ordersHandler = (details: DeliveryDetailsType) => {

    const newOrder = {
        ...details,
orderId: orders.length + 1,
orderStatus: OrderStatus.PENDING,
  creationDate: new Date(),
         agentDetails: {
    name: "Jane Smith",
    contact: "+2348012345678",
  },


    }
    setOrders(prev => {
        return [
            
            newOrder,
            ...prev
        ]
    })
  }


  return (
    <div className="w-full flex flex-col  ">
      <section className="w-full flex items-center justify-center ">
        <div className="flex items-center flex-wrap  gap-1 justify-center p-1 rounded-lg bg-secondary max-w-[400px] w-full">
          <Button
            className={`${
              tab === "CREATE"
                ? "bg-primary"
                : "hover:bg-transparent bg-secondary"
            } transtition-colors duration-300 ease-in items-center delivery_tab_btn p-2 text-sm`}
            onClick={() => tabHandler("CREATE")}
          >
            <Package className="mr-1" /> Create Order
          </Button>
          <Button
            className={`${
              tab === "TRACK"
                ? "bg-primary"
                : "hover:bg-transparent bg-secondary"
            } transtition-colors duration-300 ease-in items-center delivery_tab_btn p-2 text-sm`}
            onClick={() => tabHandler("TRACK")}
          >
            <Truck className="mr-1" />
            Track Order
          </Button>
        </div>
      </section>
      <AnimatePresence>
        {tab === "CREATE" && (
          <motion.section
            variants={hamMenu}
            initial="hidden"
            animate="visible"
            exit="exit"
            key="create_order"
            className="w-full flex items-center justify-center mt-8 "
          >
            <CreateDelivery ordersHandler={ordersHandler} setTab={setTab}/>
           
          </motion.section>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {tab === "TRACK" && (
          <motion.section
            variants={hamMenu}
            initial="hidden"
            animate="visible"
            exit="exit"
            key="track_order"
            className="w-full flex items-center justify-center mt-8"
          >

            <TrackOrder orders={orders} setOrders={setOrders} viewMore={viewMore} setViewMore={setViewMore}/>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
};
