import styles from "./product-detail-page.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import { ProductService } from "@/services";
import { useEffect, useState } from "react";
import { ProductCategory, ProductPricing, ProductRating, ProductStock } from "@/components/product";
import { EBusyLoader } from "@/components/shared";
import { EnumRoutes } from "@/enums";
import { useQuery } from "@tanstack/react-query";
import EditIcon from '@mui/icons-material/Edit';
import IconButton from "@mui/material/IconButton";


export default function ProductDetailPage()
{
	const navigate = useNavigate();

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
		return <EBusyLoader message="Getting Product Info" isLoading={isLoading} />;
	}


	if (isError)
    {
		const err: any = error;
		return <p>{err.message}</p>;
	}


	const handleCategoryClick = (category: string) => {
		const url = `${EnumRoutes.PRODUCTS}?category=${category}`;
        navigate(url);
	}


	const handleEditClick = (id: string) => {
		const url = EnumRoutes.EDIT_PRODUCT.replace(":productId", id);
        navigate(url);
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
								<ProductCategory product={product} handleCategoryClick={() => handleCategoryClick(product.category)} />

								<IconButton edge="start" color="inherit" aria-label="back" onClick={() => handleEditClick(product.id)}>
									<EditIcon style={{ color: "#1e1414" }} />
								</IconButton>
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
