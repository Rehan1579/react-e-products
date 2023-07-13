import styles from "./product-listing-page.module.scss"
import { ProductService } from "@/services";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ProductPricing, ProductRating } from "@/components/product";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import { useState } from "react";
import { EnumRoutes } from "@/enums";
import EPagination from "@/components/shared/pagination";
import { IPagination } from "@/interfaces/IPagination";
import { EBusyLoader } from "@/components/shared";
import TextField from "@mui/material/TextField";
import { useQueries, useQuery } from "@tanstack/react-query";
import IconButton from "@mui/material/IconButton";
import AddIcon from '@mui/icons-material/Add';


export default function ProductListingPage()
{   
	const [params, _] = useSearchParams();
	const page = Number(params.get("page")) || 1;
	const category = params.get("category");

    const navigate = useNavigate();
    const [hoverId, setHoverId] = useState<string>("");
    const [search, setSearch] = useState<string>("");

    
	const {
		isLoading,
		isError,
		error,
		data: productListing,
	} = useQuery(["product_search", page], () => {
		return category ? ProductService.getProductsByCategory(page, category) : ProductService.getProducts(page);
	});


	// const {
	// 	isLoading,
	// 	isError,
	// 	error,
	// 	data: searcResult,
	// } = useQuery(["product_search", page], () => {
	// 	return category ? ProductService.getProductsByCategory(page, category) : ProductService.getProducts(page);
	// });



	const handleSearchChange = (val: string) => {
		console.log("searchProduct => " + val);
		setSearch(val);
	}


    if (isLoading)
    {
		return <EBusyLoader message="Loading Products" isLoading={isLoading} />;
	}


    if (isError)
    {
		const err: any = error;
		return <p>{err.message}</p>;
	}

    
    const showProductDetail = (productId: string) => {
        const url = `${EnumRoutes.PRODUCTS}/${productId}`;
        navigate(url);
    };


	const changePage = (page: number) => {
		const url = `${EnumRoutes.PRODUCTS}?page=${page}`;
        navigate(url);
	}


	const getProductCount = (pagination: IPagination) => {
		const totalCount = pagination.limit +  pagination.skip;
		return (
			<>Showing {totalCount} out of {pagination?.total}</>
		)
	}


    return (
		<div className={styles.product_listing}>
			<div className="container p-0">
				<div className="row mb-4">
					<div className="col">
						<TextField
							style={{ background: "#fff" }}
							label="Search"
							variant="outlined"
							size="small"
							fullWidth
							value={search}
							onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
								handleSearchChange(event.target.value);
							}}
						/>
					</div>
					
					<div className="col-auto">
						<IconButton edge="start" color="inherit" aria-label="back" onClick={() => navigate(EnumRoutes.ADD_PRODUCT)}>
							<AddIcon style={{color: "#1e1414"}} />
						</IconButton>
					</div>
				</div>

				<div className="row mb-2">
					<div className="col">
						<p className={`${styles.product__total_count} m-0`}>{getProductCount(productListing.pagination)}</p>
					</div>
				</div>
				<div className="row mb-5">
					{productListing.products?.map((item: any) => {
						return (
							<div key={item.id} className="col-6 col-sm-4 col-md-3 col-lg-3 col-xl-2 p-2">
								<Card
									sx={{ maxWidth: 345 }}
									className={styles.product}
									raised={hoverId == item.id}
									onClick={() => showProductDetail(item.id)}
									onMouseEnter={() => setHoverId(item.id)}
									onMouseLeave={() => setHoverId("")}
								>
									<CardMedia sx={{ height: 140 }} image={item.thumbnail} title="Product Image" />
									<CardContent className={styles.product_detail}>
										<div className={styles.product_title}>
											<p className={styles.product_title__text}>{item.title}</p>
										</div>

										<div className="mb-2">
											<ProductPricing product={item} className={styles.product_pricing} />
										</div>

										{item.rating > 0 && <ProductRating product={item} />}
									</CardContent>
								</Card>
							</div>
						);
					})}
				</div>

				{productListing.pagination && (
					<div className="row justify-content-center">
						<div className="col-auto">
							<EPagination info={productListing.pagination} handlePaginationChange={changePage} />
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
