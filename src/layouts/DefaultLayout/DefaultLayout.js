import AppFooter from "../AppFooter/AppFooter";
import AppHeader from "../AppHeader/AppHeader";

function DefaultLayout({ children }) {
  return (
    <>
      <AppHeader />
      <div className="container px-1 mt-3">{children}</div>
      <AppFooter />
    </>
  );
}

export default DefaultLayout;
