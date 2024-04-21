import Aside from "@/components/layout/aside";

function Layout(props: { main: React.ReactNode; detail?: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center">
      <div className="flex h-dvh w-dvw flex-row">
        <Aside />
        <div className="grid w-full grid-cols-[1fr,3fr]">
          <div>{props.main}</div>
          <div>{props.detail}</div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
