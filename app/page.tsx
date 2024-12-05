import { FC } from "react";
import { cinzel } from "@/lib/fonts";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MotionComponent } from "@/components/motion-component";
import { appearAnimation } from "@/lib/motion";
import { Package, CheckCircle, Truck, User2 } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
const App: FC = () => {
  const steps = [
    {
      icon: Package,
      title: "Enter Details",
      description: "Provide pickup and drop-off information",
    },
    {
      icon: CheckCircle,
      title: "Confirm Order",
      description: "Review and confirm your delivery request",
    },
    {
      icon: Truck,
      title: "Get Connected",
      description: "We'll match you with the best delivery agent",
    },
  ];
  const testimonials = [
    {
      name: "John Doe",
      role: "Business Owner",
      content:
        "Sendly has revolutionized my business logistics. Fast, reliable, and cost-effective!",
      image: "/placeholder.svg",
    },
    {
      name: "Jane Smith",
      role: "Frequent Shipper",
      content:
        "I love the real-time tracking feature. It gives me peace of mind knowing where my package is at all times.",
      image: "/placeholder.svg",
    },
    {
      name: "Mike Johnson",
      role: "E-commerce Manager",
      content:
        "The verified agents ensure that our products are in safe hands. Highly recommended!",
      image: "/placeholder.svg",
    },
  ];
  return (
    <main className="px-hz w-full flex-col flex gap-y-8 pt-[120px] pb-16">
      <MotionComponent
        as="section"
        variants={appearAnimation}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="flex  items-center w-full"
      >
        <div className="flex flex-col md:w-1/2 w-full gap-6">
          <div className="flex flex-col  gap-3">
            <h4 className="font-semibold text-sm">Introducing Sendly</h4>
            <h1
              className={`md:text-6xl text-4xl font-black ${cinzel.className}`}
            >
              Swift, Secure, Seamless Deliveries
            </h1>
          </div>
          <p>
            Connect with reliable delivery agents for all your shipping needs.
            Experience hassle-free logistics with real-time tracking and
            competitive pricing.
          </p>
          <Button asChild size="lg" className="w-full md:w-[150px]">
            <Link href="/register">Get Started</Link>
          </Button>
        </div>
      </MotionComponent>
      <section
        className="w-full flex md:items-center pt-8 flex-col gap-4"
        id="howitworks"
      >
        <h4 className="font-semibold text-lg w-full md:text-center">
          How It Works
        </h4>
        <h3
          className={`w-full md:text-center text-3xl ${cinzel.className} font-black`}
        >
          Delivery made simple
        </h3>
        <p className="w-full text-sm  md:text-center">
          Get your items delivered in just three easy steps
        </p>
        <div className="grid grid-cols-1 gap-8 mt-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <MotionComponent
              key={index}
              className="relative "
              viewport={{ once: true, amount: 0.2 }}
              variants={appearAnimation}
              initial="hidden"
              whileInView="visible"
            >
              <Card>
                <CardHeader className="w-full flex items-center justify-center">
                  <div className="flex items-center  justify-center h-12 w-12 rounded-md bg-primary text-white">
                    <step.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                </CardHeader>
                <CardContent className="flex item-center justify-center flex-col *:text-center">
                  <h3 className="text-lg leading-6 font-semibold ">
                    {step.title}
                  </h3>
                  <p className="mt-4 text-base text-muted-foreground">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            </MotionComponent>
          ))}
        </div>
      </section>
      <section
        className="w-full flex md:items-center pt-8 flex-col gap-4"
        id="testimonials"
      >
        <h4 className="font-semibold text-lg w-full md:text-center">
          Testimonials
        </h4>
        <h3
          className={`w-full md:text-center text-3xl ${cinzel.className} font-black`}
        >
          Trusted by businesses and individuals alike
        </h3>
        <p className="w-full md:text-center text-sm">
          Don't just take our word for it. Here's what our customers have to say
          about Sendly.
        </p>
        <div className="grid grid-cols-1 gap-8 mt-8 md:grid-cols-3">
          {testimonials.map((step, index) => (
            <MotionComponent
              key={index}
              className="relative "
              viewport={{ once: true, amount: 0.2 }}
              variants={appearAnimation}
              initial="hidden"
              whileInView="visible"
            >
              <Card>
                <CardContent className="flex gap-4 pt-4 justify-center flex-col ">
                  <p className=" text-base text-muted-foreground">
                    {step.content}
                  </p>
                  <div className="w-full flex items-center gap-4 flex-wrap">
                    <Avatar className="w-14 h-14">
                      <AvatarImage src="" alt={`${step.name} image`} />
                      <AvatarFallback>
                        <User2 />
                      </AvatarFallback>
                    </Avatar>
                    <span className="flex flex-col gap-1">
                      <p className="font-semibold">
                        {step.name}
                      </p>
                      <p className="text-sm text-muted-foreground ">
                        {step.role}
                      </p>
                    </span>
                  </div>
                </CardContent>
              </Card>
            </MotionComponent>
          ))}
        </div>
       
      </section>
      <MotionComponent className="w-full mt-8 flex items-center justify-center md:justify-between flex-wrap gap-4"     variants={appearAnimation}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}>
          <h3 className={`md:text-5xl text-3xl text-center md:text-left md:w-3/4 w-full font-black  `}>
          Ready to get started?
          Join Sendly today and revolutionize your deliveries.
          </h3>
          <Button asChild size="lg" className="">
            <Link href="/register">Get Started</Link>
          </Button>
        </MotionComponent>
    </main>
  );
};

export default App;
