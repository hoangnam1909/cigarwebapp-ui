import "./AppFooter.css";
import { Link } from "react-router-dom";
import { formatPhoneNumber } from "~/utils/StringFormatter";

function AppFooter() {
  return (
    <footer className="text-center text-lg-start bg-white text-muted mt-4">
      <div className="container d-flex justify-content-center justify-content-lg-between px-1 py-4 border-bottom">
        <div className="me-5 d-none d-lg-block">
          <span>Giữ liên lạc với chúng tôi qua:</span>
        </div>
        <div>
          <a href="" className="mx-2 text-reset">
            <i className="fa-brands fa-facebook-f"></i>
          </a>
          <a href="" className="mx-2 text-reset">
            <i className="fa-brands fa-tiktok"></i>
          </a>
        </div>
      </div>

      <section className="">
        <div className="container text-center text-md-start mt-4 mb-2">
          <div className="row mt-3">
            <div className="col-md-4 col-lg-5 col-xl-5 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">
                <i className="fa-regular fa-gem me-2"></i>
                Cigar For Boss
              </h6>
              <p>
                Cigar For Boss là cửa hàng chuyên kinh doanh mặt hàng Cigar
                Habanos Cuba, được nhập khẩu từ Châu Âu với chất lượng đảm bảo
                nhất! Tới với Cigar For Boss, quý khách sẽ được trải nghiệm xì
                gà hoàn hảo.
              </p>
            </div>

            <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Các chính sách</h6>
              <p>
                <a href="#!" className="text-reset">
                  Chính sách đổi trả
                </a>
              </p>
              <p>
                <a as={Link} href="#!" className="text-reset">
                  Chính sách bảo mật
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Chính sách vận chuyển
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Hướng dẫn mua hàng
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Hướng dẫn thanh toán
                </a>
              </p>
            </div>

            <div className="col-md-5 col-lg-4 col-xl-4 mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold mb-4">các cửa hàng</h6>
              <div className="store-info">
                <h6 className="fw-bold">Cửa hàng 1</h6>
                <p>Địa chỉ: {process.env.REACT_APP_HANOI_ADDRESS}</p>
                <p>
                  Email:{" "}
                  <a
                    href={`mailto:${process.env.REACT_APP_EMAIL_CONTACT_ADDRESS}`}
                  >
                    {process.env.REACT_APP_EMAIL_CONTACT_ADDRESS}
                  </a>
                </p>
                <p>
                  Số điện thoại:{" "}
                  <a href={`tel:${process.env.REACT_APP_HANOI_ZALO_NUMBER}`}>
                    {formatPhoneNumber(process.env.REACT_APP_HANOI_ZALO_NUMBER)}
                  </a>
                </p>
              </div>
              <div className="store-info">
                <h6 className="fw-bold">Cửa hàng 2</h6>
                <p>Địa chỉ: {process.env.REACT_APP_HCM_ADDRESS}</p>
                <p>
                  Email:{" "}
                  <a
                    href={`mailto:${process.env.REACT_APP_EMAIL_CONTACT_ADDRESS}`}
                  >
                    {process.env.REACT_APP_EMAIL_CONTACT_ADDRESS}
                  </a>
                </p>
                <p>
                  Số điện thoại:{" "}
                  <a href={`tel:${process.env.REACT_APP_HCM_ZALO_NUMBER}`}>
                    {formatPhoneNumber(process.env.REACT_APP_HCM_ZALO_NUMBER)}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div
        className="text-center p-4"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.03)" }}
      >
        &copy; 2023 Copyright:&nbsp;
        <a as={Link} className="text-reset text-decoration-none fw-bold" to="/">
          Cigar For Boss
        </a>
      </div>
    </footer>
  );
}

export default AppFooter;
