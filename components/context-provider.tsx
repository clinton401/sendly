"use client"
import {FC, ReactNode, createContext, Dispatch, SetStateAction, useState, useEffect} from 'react';
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
    orderStatus: OrderStatus;
    creationDate: Date; 
    deliveryFee?: number; 
    agentDetails: {
      name: string;
      contact: string;
    };
  };
type AppContextType = {
orders: Order[],
setOrders: Dispatch<SetStateAction<Order[]>>
}

export const appContext = createContext<AppContextType>({
    orders: [],
    setOrders: () => {},
})
export const ContextProvider: FC<{children: ReactNode}> = ({children}) => {
       const [orders, setOrders] = useState<Order[]>([]);
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
       const values ={
        orders, 
        setOrders
       }
  return (
    <appContext.Provider value={values}>{children}</appContext.Provider>
  )
}
