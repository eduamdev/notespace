import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

function Layout(props: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {props.children}
      <Footer />
    </>
  );
}

export default Layout;
