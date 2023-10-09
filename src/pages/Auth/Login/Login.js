import "./Login.css";

import { useState } from "react";
import Cookies from "js-cookie";
import { tokenUserRole } from "~/services/AuthService";
import { getBrowerInfo } from "~/services/BrowserInfo";
import authAPI from "~/apis/authAPI/authAPI";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    let requestBody = {
      username: username,
      password: password,
      browserInfo: getBrowerInfo(),
    };

    try {
      setIsSubmitting(true);
      const res = await authAPI.authenticate(requestBody);
      if (res.status === 200) {
        Cookies.set("accessToken", res.data.token);
        Cookies.set("refreshToken", res.data.refreshToken);
        Cookies.set("rememberMe", rememberMe);
        setIsSubmitting(false);

        if (tokenUserRole().toLowerCase() === "admin") {
          window.location.href = "/admin";
        } else {
          window.location.href = "/";
        }
      }
    } catch (error) {
      setIsSubmitting(false);
      toast.error("Đăng nhập không thành công", { position: "top-center" });
      return;
    }
  };

  return (
    <div className="d-flex align-items-center py-4 bg-body-tertiary vh-100">
      <main className="form-signin w-100 m-auto">
        <form onSubmit={handleSubmitForm}>
          <div className="brand-logo d-flex justify-content-center">
            <Link to={"/"}>
              <img
                className="mb-2"
                src="https://res.cloudinary.com/nhn1909/image/upload/v1690041731/ktypjs6ap3ykjv6eydqu.png"
                alt=""
                width="200"
                height="200"
              />
            </Link>
          </div>

          <div className="form-floating mb-2">
            <input
              type="text"
              className="form-control"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label>Tên đăng nhập</label>
          </div>

          <div className="form-floating mb-2">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label>Mật khẩu</label>
          </div>

          <div className="form-check text-start my-3">
            <input
              className="form-check-input"
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
            <label className="form-check-label">Ghi nhớ đăng nhập</label>
          </div>

          <button
            className="btn btn-primary w-100 py-2"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span
                className="spinner-border spinner-border-sm me-2"
                aria-hidden="true"
              ></span>
            ) : null}
            <span role="status">Đăng nhập</span>
          </button>
        </form>
      </main>
    </div>
  );
}

export default Login;
