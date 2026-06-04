import Image from "next/image";

export interface PinterestImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

interface PinterestGridProps {
  images: PinterestImage[];
}

export const PinterestGrid = ({ images }: PinterestGridProps) => (
  <div className="columns-2 gap-3 sm:columns-3 lg:columns-4 xl:gap-4">
    {images.map((img) => (
      <div
        key={img.src}
        className="group mb-3 break-inside-avoid overflow-hidden rounded-2xl xl:mb-4"
      >
        <div className="relative overflow-hidden rounded-2xl">
          <Image
            src={img.src}
            alt={img.alt}
            width={img.width}
            height={img.height}
            className="h-auto w-full object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        </div>
      </div>
    ))}
  </div>
);
