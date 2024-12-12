"use client";
import { FC, useState } from "react";
import Image, { StaticImageData } from "next/image";
import { Skeleton } from "@/components/ui/skeleton"
type ImagesProps = {
  url: string | StaticImageData;
  alt: string;
  contain?: boolean;
  gif? : boolean
};

export const Images: FC<ImagesProps> = ({ url, alt, contain = false, gif = false }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative w-full h-full">
      <Image
        src={
          url 
        }
        alt={alt}
        placeholder={typeof url === "object" && gif  ? "blur" : "empty"}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className={`w-full h-full ${contain? "object-contain": "object-cover"}   overflow-hidden rounded object-center `}
        fill={true}
        onLoad={() => setIsLoading(false)} 
      />
      {isLoading && <Skeleton className="h-full w-full" />}
      
    </div>
  );
};
