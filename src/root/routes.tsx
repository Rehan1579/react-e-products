import { Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import { ProductAddEditPage, ProductDetailPage, ProductListingPage } from "@/pages/products";
import { ErrorPage, LayoutPage } from "@/pages/common";
import LinearProgress from "@mui/material/LinearProgress";


const ROUTES = createBrowserRouter([
	{
		path: "/",
		element: <LayoutPage />,
		children: [
			{
				path: "products",
				Component: () => (
					<Suspense fallback={<LinearProgress className="lazyloading-indicator" />}>
						<ProductListingPage />
					</Suspense>
					
				),
			},
			{
				path: "products/:productId",
				Component: () => (
					<Suspense fallback={<LinearProgress className="lazyloading-indicator" />}>
						<ProductDetailPage />
					</Suspense>
				),
			},
			{
				path: "products/add",
				Component: () => (
					<Suspense fallback={<LinearProgress className="lazyloading-indicator" />}>
						<ProductAddEditPage />
					</Suspense>
				),
			},
			{
				path: "products/:productId/edit",
				Component: () => (
					<Suspense fallback={<LinearProgress className="lazyloading-indicator" />}>
						<ProductAddEditPage />
					</Suspense>
				),
			},
		],
	},
	{
		path: "*",
		Component: ErrorPage,
	},
]);
export default ROUTES;
