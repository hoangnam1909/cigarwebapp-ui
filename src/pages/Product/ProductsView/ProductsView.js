import queryString from "query-string";
import { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import brandAPI from "~/apis/brandAPI/brandAPI";
import categoryAPI from "~/apis/categoryAPI/categoryAPI";
import productAPI from "~/apis/productAPI/productAPI";
import Alert from "~/components/Alert/Alert";
import FilterDropdown from "~/components/Filter/FilterDropdown";
import FilterText from "~/components/Filter/FilterText";
import RemoveFilter from "~/components/Filter/RemoveFilter";
import ArrowPagination from "~/components/Pagination/ArrowPagination";
import Pagination from "~/components/Pagination/Pagination";
import ProductCard from "~/components/Product/ProductCard/ProductCard";
import ProductCardSkeletonView from "~/components/Skeleton/ProductCardSkeletonView/ProductCardSkeletonView";
import sortData from "~/data/productSortData.json";

function ProductsView() {
  document.title = "Các sản phẩm";

  let location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const [isLoading, setIsLoading] = useState(false);

  const [categories, setCategories] = useState();
  const [brands, setBrands] = useState();
  const [productsResponse, setProductsResponse] = useState();

  const PAGE_SIZE = 12;

  const getCategories = async () => {
    const res = await categoryAPI.getCategories();
    if (res.status === 200) {
      setCategories(res.data.result);
    }
  };

  const getBrands = async () => {
    const res = await brandAPI.getBrands();
    if (res.status === 200) {
      setBrands(res.data.result);
    }
  };

  const getProducts = async () => {
    const params = queryString.parse(location.search);

    setIsLoading(true);
    const res = await productAPI.getProducts(
      params,
      searchParams.get("page"),
      PAGE_SIZE
    );
    if (res.status === 200) {
      setProductsResponse(res.data.result);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getCategories();
    getBrands();
  }, []);

  useEffect(() => {
    getProducts();
  }, [searchParams]);

  return (
    <>
      <div className="box-filter mb-3">
        <section className="d-flex flex-wrap gap-2  justify-content-center justify-content-md-start">
          <FilterText filterName={"Tìm kiếm sản phẩm"} filterKey={"kw"} />

          <FilterDropdown
            filterList={categories}
            filterName={"Danh mục"}
            filterKey={"categoryId"}
            displayKey={"name"}
            valueKey={"id"}
          />

          <FilterDropdown
            filterList={brands}
            filterName={"Thương hiệu"}
            filterKey={"brandId"}
            displayKey={"name"}
            valueKey={"id"}
          />

          <RemoveFilter />
        </section>
      </div>

      <div className="box-sorting mb-3">
        <section className="d-flex flex-wrap column-gap-3 row-gap-1 justify-content-center justify-content-md-between">
          <div className="left-panel-sorting align-self-center">
            <h5 className="mb-0">
              {productsResponse == null || productsResponse?.totalElements == 0
                ? "Không có sản phẩm nào được tìm thấy"
                : `${productsResponse?.totalElements} Sản phẩm được tìm thấy`}
            </h5>
          </div>
          <div className="d-flex justify-content-end gap-4 right-panel-sorting text-end">
            <FilterDropdown
              filterList={sortData}
              filterName={"Sắp xếp"}
              filterKey={"sort"}
              displayKey={"name"}
              valueKey={"value"}
            />

            <ArrowPagination pageData={productsResponse} />
          </div>
        </section>
      </div>

      {!isLoading ? (
        <>
          <div className="product-box mb-3">
            {productsResponse?.numberOfElements != 0 ? (
              <>
                <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 row-cols-xxl-6 g-1 mb-3">
                  {productsResponse?.content?.map((product) => {
                    return (
                      <div key={product.id} className="col">
                        <ProductCard product={product} />
                      </div>
                    );
                  })}
                </div>

                <div className="pagination d-flex justify-content-center">
                  <Pagination pageData={productsResponse} />
                </div>
              </>
            ) : (
              <Alert type={"danger"} message={"Không có kết quả"} />
            )}
          </div>
        </>
      ) : (
        <div className="product-box mb-3">
          <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 row-cols-xxl-6 g-1 mb-3">
            <ProductCardSkeletonView count={PAGE_SIZE} />
          </div>

          <div className="pagination d-flex justify-content-center py-2">
            <Pagination pageData={productsResponse} />
          </div>
        </div>
      )}
    </>
  );
}

export default ProductsView;
