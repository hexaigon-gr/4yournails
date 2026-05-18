import { cn } from "@/lib/general/utils";

type LoadingScreenProps = {
  className?: string;
  label?: string;
};

export const LoadingScreen = ({ className, label }: LoadingScreenProps) => (
  <div
    role="status"
    aria-live="polite"
    aria-busy="true"
    className={cn(
      "flex min-h-[60dvh] w-full flex-1 items-center justify-center bg-background px-4 py-16",
      className,
    )}
  >
    <div className="flex flex-col items-center gap-4 text-muted-foreground">
      <span
        aria-hidden="true"
        className="relative inline-flex size-12 items-center justify-center"
      >
        <span className="absolute inset-0 animate-ping rounded-full bg-primary/30" />
        <span className="relative inline-block size-3 rounded-full bg-primary" />
      </span>
      <span className="text-sm font-medium tracking-wide">
        {label ?? "Loading…"}
      </span>
    </div>
  </div>
);

export default LoadingScreen;
