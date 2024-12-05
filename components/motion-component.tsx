"use client";

import { motion, MotionProps } from "motion/react";
import React, { ElementType, ComponentPropsWithoutRef, ForwardRefExoticComponent } from "react";

type MotionComponentProps<T extends ElementType> = {
  as?: ElementType;
  className?: string;
  children: React.ReactNode;
} & MotionProps & ComponentPropsWithoutRef<T>; 

export const MotionComponent = <T extends ElementType = "div">({
  as,
  className = "",
  children,
  ...motionProps
}: MotionComponentProps<T>) => {
  const Tag = as || "div"; 
  const MotionTag = motion(Tag as ForwardRefExoticComponent<unknown>) as React.ElementType; 
  // ForwardRefExoticComponent<any>
  return (
    <MotionTag className={className} {...motionProps}>
      {children}
    </MotionTag>
  );
};
