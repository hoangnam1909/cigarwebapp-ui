import { useEffect, useState } from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import specs from "~/data/specs.json";
import productAPI from "~/apis/productAPI/productAPI";
import ProductCard from "~/components/Product/ProductCard/ProductCard";
import ProductCardSkeletonView from "~/components/Skeleton/ProductCardSkeletonView/ProductCardSkeletonView";

function Home() {
  document.title = "Trang Chủ";

  const PRODUCT_SIZE = 12;
  const [products, setProducts] = useState();

  useEffect(() => {
    const getProducts = async () => {
      const res = await productAPI.getProducts(null, 1, PRODUCT_SIZE);
      console.log(res);

      if (res.status === 200) {
        setProducts(res.data.result);
      }
    };

    getProducts();
  }, []);

  return (
    <>
      <div className="product-thumbnail position-relative overflow-hidden mt-3 mb-4 p-5 text-center bg-body-tertiary rounded">
        <div className="col-md-6 p-lg-5 mx-auto my-5">
          <h1 className="display-3 fw-bold">Cigar For Boss</h1>
          <h3 className="fw-normal mb-3">
            Chuyên kinh doanh Cigar Habanos Cuba nhập khẩu từ Châu Âu
          </h3>
          <div className="d-flex gap-3 justify-content-center lead fw-normal">
            <Link to={"/san-pham"} className="icon-link">
              Mua ngay
              <i className="fa-solid fa-angle-right"></i>
            </Link>
          </div>
        </div>
      </div>

      <div className="row g-2 mb-4 pb-4 border-bottom">
        {specs.map((spec, index) => {
          return (
            <div key={index} className="col-12 col-md-4">
              <div className="h-100 p-4 bg-secondary-subtle text-center rounded">
                <h2 className="display-6 text-uppercase">{spec.name}</h2>
                <p className="lead">{spec.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="products">
        <h2 className="text-uppercase mb-4">Sản phẩm nổi bật</h2>
        <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 row-cols-xxl-6 g-1">
          {products ? (
            <>
              {products?.content?.map((product) => {
                return (
                  <div key={product.id} className="col">
                    <ProductCard product={product} />
                  </div>
                );
              })}
            </>
          ) : (
            <>
              <ProductCardSkeletonView count={PRODUCT_SIZE} />
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Home;
