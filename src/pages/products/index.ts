import { lazy } from "react";


const ProductListingPage = lazy(() => import("./product-listing/product-listing-page"));
const ProductDetailPage = lazy(() => import("./product-detail/product-detail-page"));


export { ProductListingPage, ProductDetailPage };
