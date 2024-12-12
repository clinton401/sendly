"use client";
import { FC, useState, useEffect, useContext } from "react";
import { motion, AnimatePresence } from "motion/react";
import { hamMenu } from "@/lib/motion";
import { CreateDelivery } from "@/components/protected/create-delivery";
import { appContext, OrderStatus } from "@/components/context-provider";

export type DeliveryDetailsType = {
  pickupAddress: string;
  deliveryAddress: string;
  recipientName: string;
  recipientPhone: string;
  extraDetails?: string;
};

export const DeliveryTab: FC = () => {
  const { orders, setOrders } = useContext(appContext);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    scrollToTop();
  }, []);

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
    };
    setOrders((prev) => {
      return [newOrder, ...prev];
    });
  };

  return (
    <div className="w-full flex flex-col  ">
      <AnimatePresence>
        <motion.section
          variants={hamMenu}
          initial="hidden"
          animate="visible"
          exit="exit"
          key="create_order"
          className="w-full flex items-center justify-center  "
        >
          <CreateDelivery ordersHandler={ordersHandler} />
        </motion.section>
      </AnimatePresence>
      {/* <AnimatePresence>
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
      </AnimatePresence> */}
    </div>
  );
};
