import { ReactNode } from "react";

interface ListViewProps {
  header: ReactNode;
  body: ReactNode;
}

export function ListView({ header, body }: ListViewProps) {
  return (
    <div className="flex size-full flex-col overflow-hidden">
      <div className="sticky top-0  z-10 min-h-[72px]">{header}</div>
      <div className="flex-1 overflow-y-auto">{body}</div>
    </div>
  );
}
