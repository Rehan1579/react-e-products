import styles from "./product-detail-page.module.scss";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { ProductService } from "@/services";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect, useState } from "react";
import { ProductCategory, ProductPricing, ProductRating, ProductStock } from "@/components/product";


export default function ProductDetailPage()
{
	const [preview, setPreview] = useState<string>();
	const onSetPreview = (imgSrc: string) => {
		setPreview(imgSrc);
	}

	
	const { productId } = useParams();
	const { isLoading, isError, error, data: product } = useQuery(["product_detail", productId], () => ProductService.getProductById(productId));


	useEffect(() => {
		setPreview(product?.thumbnail);
	}, [isLoading]);

	
    if (isLoading)
    {
		return (
			<Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
				<div className="d-flex flex-column align-items-center">
					<CircularProgress />
					<p>Getting Product Info</p>
				</div>
			</Backdrop>
		);
	}


	if (isError)
    {
		const err: any = error;
		return <p>{err.message}</p>;
	}


	const handleCategoryClick = () => {
		alert("Show products based on category: " + product.category);
	}


	return (
		<div className={styles.product_detail}>
			<div className="container">
				<div className="row">
					<div className={`col-12 col-md-5 ${styles.product_media}`}>
						<div className={styles.product_media__thumbnail}>
							<img src={preview} alt="Product Thumbnail" />
						</div>

						<div className={styles.product_media__images}>
							{product.images?.map((item, index) => {
								return (
									<img
										className={styles.product_media__image}
										src={item}
										key={index}
										alt="Product Thumbnail"
										onClick={() => onSetPreview(item)}
									/>
								);
							})}
						</div>
					</div>

					<div className={`col ${styles.product_info}`}>
						{product.category && (
							<div className={styles.product_category}>
								<ProductCategory product={product} onCategoryClick={handleCategoryClick} />
							</div>
						)}

						{product.title && (
							<div>
								<h1 className={styles.product_title}>{product.title}</h1>
							</div>
						)}

						{product.rating > 0 && (
							<div className={styles.product_rating}>
								<ProductRating product={product} />
							</div>
						)}

						{product.priceInfo && (
							<div className={styles.product_pricing}>
								<ProductPricing product={product} />
							</div>
						)}

						{product.description && (
							<div className={styles.product_description}>
								<p className={styles.product_description__text}>{product.description}</p>
							</div>
						)}

						<div className={styles.product_stock}>
							<ProductStock product={product} />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
