import "./AdminLayout.css";
import AppSideBar from "../AppSideBar/AppSideBar";

function AdminLayout({ children }) {
  return (
    <div className="">
      <div className="position-fixed top-0 h-100">
        <AppSideBar />
      </div>
      <div className="content p-3">{children}</div>
    </div>
  );
}

export default AdminLayout;
