"use client"
import { FC,  useState, useContext } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { appContext, OrderStatus } from "@/components/context-provider";
import { cinzel } from "@/lib/fonts";
import { Loader, Check, X } from "lucide-react";
import createToast from "@/hooks/create-toast";

export const TrackOrder: FC = () => {
    const [isPending, setIsPending] = useState(false);
    const [viewMore, setViewMore] =useState(false)
    const [isDeletePending, setIsDeletePending] = useState(false);
    const {orders, setOrders} = useContext(appContext)
    const {createError, createSimple} = createToast();
   
  const handleViewMore = () => {
    if(viewMore) {
        setViewMore(false);
        return;
    }
    setIsPending(true)
    setTimeout(() => {
        setIsPending(false)
        setViewMore(true)
    }, 3000)
  }
  const handleOrderCancellation = (orderId: number) => {
    setIsDeletePending(true)
    const orderPosition = orders.findIndex((order) => order.orderId === orderId);
    
    if (orderPosition === -1) {
      createError("An unknown error occurred. Please try again later");
      return;
    }
  
    const updatedOrders = orders.map((order, index) =>
      index === orderPosition
        ? { ...order, orderStatus: OrderStatus.CANCELLED } 
        : order
    );

    setTimeout(() => {
        
    setOrders(updatedOrders);
    createSimple("Your order has been cancelled successfully.")
        setIsDeletePending(false)
    }, 300)
  
  };
  
  return (
    <div className="w-full   flex flex-col gap-8 max-w-[800px]">
      <h2
        className={`${cinzel.className} font-black text-xl text-center sm:text-2xl`}
      >
   My orders
      </h2>
      {orders.length < 1 && (
        <h1 className="w-full  text-center text-2xl font-bold ">
          You have not placed any orders yet.
        </h1>
      )}
      {orders.length > 0 && (
        <div className="flex flex-col gap-4 w-full">
          {orders.slice(0, 15).map((order) => {
            return (
              <Card key={order.orderId} className="w-full">
                <CardHeader>
                  <CardTitle className="text-xl font-black">
                    Order #{order.orderId}
                  </CardTitle>
                </CardHeader>
                <CardContent className="w-full gap-4 flex flex-col">
                  <ul className="w-full flex-wrap  flex gap-y-4  divide-8 ">
                    <li className="flex w-full sm:w-1/2  flex-col gap-1">
                      <span className="text-lg font-bold">Pickup Address</span>
                      <span className="text-lg ">{order.pickupAddress}</span>
                    </li>
                    <li className="flex w-full sm:w-1/2  flex-col gap-1">
                      <span className="text-lg font-bold">
                        Delivery Address
                      </span>
                      <span className="text-lg ">{order.deliveryAddress}</span>
                    </li>
                    <li className="flex w-full sm:w-1/2  flex-col gap-1">
                      <span className="text-lg font-bold">
                        Recipient Details
                      </span>
                      <span className="text-lg ">{order.recipientName}</span>
                      <span className="text-lg ">{order.recipientPhone}</span>
                    </li>
                    {order.extra && (
                      <li className="flex w-full sm:w-1/2  flex-col gap-1">
                        <span className="text-lg font-bold">Extra Details</span>
                        <span className="text-lg ">{order.extra}</span>
                      </li>
                    )}
                  </ul>
                  <div className="w-full flex   items-center flex-wrap   gap-2">
                    <h3 className="text-lg font-bold "> Order Status: </h3>
                    <span className="flex items-center justify-center text-sm  ml-2 gap-1">
                      {order.orderStatus === OrderStatus.PENDING && (
                        <>
                          {" "}
                          <Loader className=" h-4 w-4 mr-1 animate-spin" />
                          Searching for Agent
                        </>
                      )}

                      {order.orderStatus === OrderStatus.MATCHED && (
                        <>
                          {" "}
                          <span className="w-4 h-4 mr-1 rounded-full flex items-center justify-center bg-emerald-500 text-white">
                            {" "}
                            <Check className=" h-3 w-3 " />
                          </span>
                          Order Accepted
                        </>
                      )}

                      {order.orderStatus === OrderStatus.CANCELLED && (
                        <>
                          {" "}
                          <span className="w-4 h-4 mr-1 rounded-full flex items-center justify-center bg-destructive text-white">
                            {" "}
                            <X className=" h-3 w-3 " />
                          </span>
                          Order Accepted
                        </>
                      )}
                    </span>

                    {/* <div className="w-full flex items-center justify-center gap-4 ">
    <span className="flex items-center justify-center text-sm flex-col gap-1">
    <Loader className=" h-4 w-4 animate-spin"/>
Searching for Agent

    </span>
</div> */}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  {order.orderStatus === OrderStatus.PENDING && (
                    <Button variant="destructive" className="w-full" onClick={()=> handleOrderCancellation(order.orderId)} disabled={isDeletePending || isPending}>
                        {isDeletePending ? <>
                            <Loader className="mr-2 h-4 w-4 animate-spin"/> Please wait...</>: " Close order"}
                     
                    </Button>
                  )}
                </CardFooter>
              </Card>
            );
          })}
        
            {orders.length > 1 && viewMore && <>
                {orders.slice(15).map((order) => {
            return (
              <Card key={order.orderId} className="w-full">
                <CardHeader>
                  <CardTitle className="text-xl font-black">
                    Order #{order.orderId}
                  </CardTitle>
                </CardHeader>
                <CardContent className="w-full gap-4 flex flex-col">
                  <ul className="w-full flex-wrap  flex gap-y-4  divide-8 ">
                    <li className="flex w-full sm:w-1/2  flex-col gap-1">
                      <span className="text-lg font-bold">Pickup Address</span>
                      <span className="text-lg ">{order.pickupAddress}</span>
                    </li>
                    <li className="flex w-full sm:w-1/2  flex-col gap-1">
                      <span className="text-lg font-bold">
                        Delivery Address
                      </span>
                      <span className="text-lg ">{order.deliveryAddress}</span>
                    </li>
                    <li className="flex w-full sm:w-1/2  flex-col gap-1">
                      <span className="text-lg font-bold">
                        Recipient Details
                      </span>
                      <span className="text-lg ">{order.recipientName}</span>
                      <span className="text-lg ">{order.recipientPhone}</span>
                    </li>
                    {order.extra && (
                      <li className="flex w-full sm:w-1/2  flex-col gap-1">
                        <span className="text-lg font-bold">Extra Details</span>
                        <span className="text-lg ">{order.extra}</span>
                      </li>
                    )}
                  </ul>
                  <div className="w-full flex   items-center flex-wrap   gap-2">
                    <h3 className="text-lg font-bold "> Order Status: </h3>
                    <span className="flex items-center justify-center text-sm  ml-2 gap-1">
                      {order.orderStatus === OrderStatus.PENDING && (
                        <>
                          {" "}
                          <Loader className=" h-4 w-4 mr-1 animate-spin" />
                          Searching for Agent
                        </>
                      )}

                      {order.orderStatus === OrderStatus.MATCHED && (
                        <>
                          {" "}
                          <span className="w-4 h-4 mr-1 rounded-full flex items-center justify-center bg-emerald-500 text-white">
                            {" "}
                            <Check className=" h-3 w-3 " />
                          </span>
                          Order Accepted
                        </>
                      )}

                      {order.orderStatus === OrderStatus.CANCELLED && (
                        <>
                          {" "}
                          <span className="w-4 h-4 mr-1 rounded-full flex items-center justify-center bg-destructive text-white">
                            {" "}
                            <X className=" h-3 w-3 " />
                          </span>
                          Order Accepted
                        </>
                      )}
                    </span>

                    {/* <div className="w-full flex items-center justify-center gap-4 ">
    <span className="flex items-center justify-center text-sm flex-col gap-1">
    <Loader className=" h-4 w-4 animate-spin"/>
Searching for Agent

    </span>
</div> */}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  {order.orderStatus === OrderStatus.PENDING && (
                    <Button variant="destructive" className="w-full" onClick={()=> handleOrderCancellation(order.orderId)} disabled={isDeletePending || isPending}>
                     {isDeletePending ? <>
                        <Loader className="mr-2 h-4 w-4 animate-spin"/> Please wait...</>: " Close order"}
                    </Button>
                  )}
                </CardFooter>
              </Card>
            );
          })}
            </>}
            {orders.length > 15 && <div className="w-full flex items-center justify-center ">
            <Button disabled={isPending} className="w-full" onClick={handleViewMore}>{isPending ? <span className="flex items-center"><Loader className="h-4 w-4 animate-spin mr-2" /> Loading...</span> : <> {viewMore ? "View less" : "View more"}  </>}</Button>
            </div>}
        </div>
      )}
    </div>
  );
};
