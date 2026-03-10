"use client";

import { useState } from "react";
import Image from "next/image";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { X } from "lucide-react";

export interface GalleryImage {
  src: string;
  alt: string;
}

interface GalleryGridProps {
  images: GalleryImage[];
  sizes?: string;
  aspectClass?: string;
}

export const GalleryGrid = ({
  images,
  sizes = "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw",
  aspectClass = "aspect-square",
}: GalleryGridProps) => {
  const [selected, setSelected] = useState<GalleryImage | null>(null);

  return (
    <>
      {images.map((item, i) => (
        <div
          key={i}
          className={`group relative ${aspectClass} cursor-pointer overflow-hidden rounded-xl`}
          onClick={() => setSelected(item)}
        >
          <Image
            src={item.src}
            alt={item.alt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes={sizes}
          />
          <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />
        </div>
      ))}

      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent
          showCloseButton={false}
          className="max-w-4xl border-0 bg-transparent p-0 shadow-none"
        >
          <VisuallyHidden>
            <DialogTitle>Photo preview</DialogTitle>
          </VisuallyHidden>
          <div className="relative">
            <button
              onClick={() => setSelected(null)}
              className="absolute -top-12 right-0 z-50 flex size-10 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm transition-colors hover:bg-black/80"
            >
              <X className="size-6" />
            </button>
            {selected && (
              <div className="relative aspect-3/4 max-h-[85vh] w-full overflow-hidden rounded-2xl">
                <Image
                  src={selected.src}
                  alt={selected.alt}
                  fill
                  className="object-contain"
                  sizes="90vw"
                  priority
                />
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
