import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="light"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-white group-[.toaster]:text-neutral-950 group-[.toaster]:border-neutral-200 group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-neutral-500",
          actionButton:
            "group-[.toast]:bg-neutral-900 group-[.toast]:text-neutral-50",
          cancelButton:
            "group-[.toast]:bg-neutral-100 group-[.toast]:text-neutral-500",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
