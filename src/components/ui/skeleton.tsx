import { cn } from "@/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-slide-bg-x rounded-md bg-[linear-gradient(80deg,#f5f5f5_0%,#e5e5e5_50%,#f5f5f5_70%)] bg-[size:200%_100%]",
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };
