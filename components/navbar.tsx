"use client";
import { FC, useState, useEffect } from "react";
import logo from "../public/logo.png";
import Link from "next/link";
import { Images } from "@/components/images";
import { cinzel } from "@/lib/fonts";
import {Button} from "@/components/ui/button";
import {ModeToggle} from "@/components/mode-toggle";
import { Divide as Hamburger } from 'hamburger-react';
import {motion, AnimatePresence} from "motion/react";
const hamMenu = {
    hidden: {
      opacity: 0,
      scale: 0.9,
      filter: "blur(10px)",
      y: 50,
    },
    visible: {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        duration: 0.2,
        ease: "easeIn",
      },
    },
    exit: {
        opacity: 0,
        scale: 0.9,
        filter: "blur(10px)",
        y: 50,
        transition: {
            duration: 0.2,
            ease: "easeIn",
          },
    }
  };
export const Navbar: FC = () => {
    const [isOpen, setOpen] = useState(false);
  useEffect(() => {
    if (isOpen) {
      document.body.style.height = "100dvh";
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.height = "auto";
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);
  const modalHandler = () => {
    setOpen(!open);
  };
  const links = [
    { name: "Home", url: "/" },
    { name: "How It Works ", url: "/#howitworks" },
    { name: "Testimonials", url: "/#testimonials" },
  ];

  return (
    <header className="fixed left-0 bg-background  top-0 w-full blurry px-hz   z-20">
      <div className=" w-full flex items-center py-2 md:py-4 justify-between gap-2 flex-wrap relative">
        <nav>
          <Link
            href="/"
            className={`flex items-center text-xl font-bold justify-center ${cinzel.className}`}
          >
            Sendly
            <span className="relative w-[40px] aspect-square overflow-hidden ml-1">
              <Images url={logo} alt="logo" />
            </span>
          </Link>
        </nav>
        <nav className="hidden md:flex ">
          <ul className="flex items-center gap-4">
            {links.map(link => {
                return (
                    <li key={link.name}><Link href={link.url} className={`text-lg font-bold  hover:text-primary transition-colors ease-in duration-200`}>{link.name}</Link></li>
                )
            })}
          </ul>
        </nav>
        <nav className="hidden md:flex items-center gap-4 ">
            
        <ModeToggle/>
            <Button asChild >
                <Link href="/register">Get Started</Link>
            </Button>
        </nav>
        <nav className="flex md:hidden items-center gap-4">
            
        <ModeToggle/>
        <Hamburger
          toggled={isOpen}
          toggle={setOpen}
          size={20}
          distance="sm"
          rounded
          label="Show menu"
        />
        </nav>
        <AnimatePresence>
            {isOpen &&  <motion.div variants={hamMenu} initial="hidden" animate="visible" exit="exit" key="hamMenu" className="absolute mobile_ham_menu md:hidden p-4 bg-background  w-full rounded-md border left-0">
        <ul className="w-full text-lg font-semibol flex flex-col  gap-4">
            {links.map(link => {
                return <li key={link.name}>
                    <Link href={link.url} onClick={modalHandler}>{link.name}</Link>
                </li>
            })}
            <li className="flex items-center w-full justify-between gap-x-2 gap-y-4 flex-wrap">
           
            <Button asChild >
                <Link href="/register">Get Started</Link>
            </Button>
            <ModeToggle/>
            </li>
        </ul>
      </motion.div>}
            </AnimatePresence>
       
      </div>
      
      
    </header>
  );
};
