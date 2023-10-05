import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { privateRoutes, publicRoutes } from "~/routes/routes";
import { Fragment } from "react";
import DefaultLayout from "./layouts/DefaultLayout/DefaultLayout";
import ScrollTop from "./utils/ScrollTop";
import { tokenUserRole, verifyToken } from "./services/AuthService";
import AdminLayout from "./layouts/AdminLayout/AdminLayout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <Router>
        <ScrollTop />
        <div className="App">
          <Routes>
            {publicRoutes.map((route, index) => {
              if (route.path == "/login") {
                if (verifyToken() && tokenUserRole() === "ADMIN") {
                  return;
                }
              }

              let Layout = DefaultLayout;

              if (route.layout) Layout = route.layout;
              else if (route.layout === null) Layout = Fragment;

              const Page = route.component;
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  }
                />
              );
            })}

            {verifyToken() && tokenUserRole() === "ADMIN" ? (
              <>
                {privateRoutes.map((route, index) => {
                  let Layout = AdminLayout;

                  if (route.layout) Layout = route.layout;
                  else if (route.layout === null) Layout = Fragment;

                  const Page = route.component;
                  return (
                    <Route
                      key={index}
                      path={route.path}
                      element={
                        <Layout>
                          <Page />
                        </Layout>
                      }
                    />
                  );
                })}
              </>
            ) : null}
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
