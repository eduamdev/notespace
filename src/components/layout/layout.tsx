import Header from "@/components/layout/header";

function Layout(props: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center">
      <div className="h-screen w-full max-w-none px-5 sm:max-w-[90%] sm:px-0">
        <Header />
        {props.children}
      </div>
    </div>
  );
}

export default Layout;
