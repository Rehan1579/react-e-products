import { lazy } from "react";


const ProductListingPage = lazy(() => import("./product-listing/product-listing-page"));
const ProductDetailPage = lazy(() => import("./product-detail/product-detail-page"));
const ProductAddEditPage = lazy(() => import("./product-add-edit/product-add-edit-page"));


export { ProductListingPage, ProductDetailPage, ProductAddEditPage };
