import { useState, FC, Dispatch, SetStateAction } from "react";
import { cinzel } from "@/lib/fonts";
import { MapPin, User, Phone, FileText, Truck } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { LoadingButton } from "@/components/auth/loading-button";
import createToast from "@/hooks/create-toast";
import { type DeliveryDetailsType } from "@/components/protected/delivery-tab";
type InputType = React.ChangeEvent<HTMLInputElement>;
type TextareaType = React.ChangeEvent<HTMLTextAreaElement>;
type CreateDeliveryProps = {
  ordersHandler: (details: DeliveryDetailsType) => void;
  setTab: Dispatch<SetStateAction<"CREATE" | "TRACK">>;
};
export const CreateDelivery: FC<CreateDeliveryProps> = ({
  ordersHandler,
  setTab,
}) => {
  const [isPending, setIsPending] = useState(false);
  const [deliveryData, setDeliveryData] = useState({
    pickupAddress: "",
    deliveryAddress: "",
    recipientName: "",
    recipientPhone: "",
    extra: "",
  });
  const { createError, createSimple } = createToast();
  const {
    pickupAddress,
    deliveryAddress,
    recipientName,
    recipientPhone,
    extra,
  } = deliveryData;

  const dataHandler = (e: InputType | TextareaType) => {
    const { name, value } = e.target;
    setDeliveryData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      pickupAddress.length < 1 ||
      deliveryAddress.length < 1 ||
      recipientName.length < 1 ||
      recipientPhone.length < 1
    ) {
      createError("Please ensure all required fields are filled out.");
      return;
    }
    const phonePattern = /^\+[1-9]\d{1,14}$/;;
    const isPhoneValid = phonePattern.test(recipientPhone);
  
    if (!isPhoneValid) {
      createError(
        "Invalid phone number. Please make sure the recipient's phone number starts with the country code (e.g., +234901234567)."
      );
      return;
    }
    setIsPending(true);
    console.log(deliveryData);
    setTimeout(() => {
      setIsPending(false);
      ordersHandler(deliveryData);
      createSimple(
        "Your delivery order has been sent to our agents.",
        "Order Submitted"
      );
      setDeliveryData({
        pickupAddress: "",
        deliveryAddress: "",
        recipientName: "",
        recipientPhone: "",
        extra: "",
      });
      setTab("TRACK");
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }, 5000);
  };
  return (
    <div className="w-full   flex flex-col gap-4 max-w-[500px]">
      <h2
        className={`${cinzel.className} font-black text-xl text-center sm:text-2xl`}
      >
        Create a New Delivery Order
      </h2>

      <form className="w-full flex flex-col gap-4" onSubmit={submitHandler}>
        <div className="flex flex-col gap-2">
          <Label htmlFor="pickup_address" className="flex items-center text-sm">
            <MapPin className="mr-2 w-4 h-4" /> Pickup Address (Your Address)
          </Label>
          <Input
            disabled={isPending}
            value={pickupAddress}
            name="pickupAddress"
            className="w-full"
            id="pickup_address"
            onChange={dataHandler}
            placeholder="Enter your address for pickup"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label
            htmlFor="delivery_address"
            className="flex items-center text-sm"
          >
            <Truck className="mr-2 w-4 h-4" /> Delivery Address
          </Label>
          <Input
            disabled={isPending}
            value={deliveryAddress}
            name="deliveryAddress"
            className="w-full"
            id="delivery_address"
            onChange={dataHandler}
            placeholder="Enter delivery address"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="recipient_name" className="flex items-center text-sm">
            <User className="mr-2 w-4 h-4" /> Recipient Name
          </Label>
          <Input
            disabled={isPending}
            value={recipientName}
            placeholder="Enter recipient's name"
            name="recipientName"
            className="w-full"
            id="recipient_name"
            onChange={dataHandler}
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label
            htmlFor="recipient_phone"
            className="flex items-center text-sm"
          >
            <Phone className="mr-2 w-4 h-4" /> Recipient Phone Number (Start with country code e.g +234)
          </Label>
          <Input
            disabled={isPending}
            value={recipientPhone}
            placeholder="Enter recipient's phone number"
            name="recipientPhone"
            className="w-full"
            // pattern="^\+?[1-9]\d{1,14}$"
            id="recipient_phone"
            onChange={dataHandler}
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="extra" className="flex items-center text-sm">
            <FileText className="mr-2 w-4 h-4" /> Extra Details (optional)
          </Label>
          <Textarea
            disabled={isPending}
            value={extra}
            placeholder="Enter any additional details (e.g., delivery instructions)"
            rows={4}
            name="extra"
            className="w-full"
            id="extra"
            onChange={dataHandler}
          />
        </div>
        <LoadingButton
          isPending={isPending}
          message="Submit Order"
          loadingText="Searching for agents.."
        />
      </form>
    </div>
  );
};
