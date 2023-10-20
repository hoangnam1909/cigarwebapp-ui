import "./Login.css";

import Cookies from "js-cookie";
import { tokenUserRole } from "~/services/AuthService";
import { getBrowerInfo } from "~/services/BrowserInfo";
import authAPI from "~/apis/authAPI/authAPI";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    let requestBody = {
      ...data,
      browserInfo: getBrowerInfo(),
    };
    delete requestBody.rememberMe;

    try {
      const res = await authAPI.authenticate(requestBody);
      if (res.status === 200) {
        Cookies.set("accessToken", res.data.token);
        Cookies.set("refreshToken", res.data.refreshToken);
        Cookies.set("rememberMe", data.rememberMe);

        if (tokenUserRole().toLowerCase() === "admin") {
          window.location.href = "/admin";
        } else {
          window.location.href = "/";
        }
      }
    } catch (error) {
      toast.error("Đăng nhập không thành công", { position: "top-center" });
      reset({
        password: "",
      });
      return;
    }
  };

  return (
    <div className="d-flex align-items-center py-4 bg-body-tertiary vh-100">
      <main className="form-signin w-100 m-auto">
        <form onSubmit={handleSubmit(onSubmit)}>
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
              {...register("username", {
                required: "Tên đăng nhập là bắt buộc!",
              })}
            />
            <label>Tên đăng nhập</label>
            {errors.username && (
              <div className="form-text text-danger">
                {errors.username.message}
              </div>
            )}
          </div>

          <div className="form-floating mb-2">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              {...register("password", {
                required: "Mật khẩu là bắt buộc!",
              })}
            />
            <label>Mật khẩu</label>
            {errors.password && (
              <div className="form-text text-danger">
                {errors.password.message}
              </div>
            )}
          </div>

          <div className="form-check text-start mb-3">
            <input
              className="form-check-input"
              type="checkbox"
              {...register("rememberMe")}
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
