import Aside from "@/components/layout/aside";

function Layout(props: { main: React.ReactNode; detail?: React.ReactNode }) {
  return (
    <div className="flex h-dvh w-dvw flex-col items-center">
      <div className="flex size-full flex-row bg-gradient-to-b from-neutral-50 via-neutral-50 to-neutral-100">
        <Aside />
        <div className="flex size-full items-center">
          <div className="z-10 grid h-[calc(100dvh_-_20px)] w-[calc(100%_-_10px)] grid-cols-[420px,1fr] rounded-[10px] border border-neutral-950/[0.12] bg-white shadow-sm">
            <div>{props.main}</div>
            <div>{props.detail}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
