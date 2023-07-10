import styles from "./product-listing-page.module.scss"
import { ProductService } from "@/services";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { ProductPricing, ProductRating } from "@/components/product";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import { useState } from "react";
import { EnumRoutes } from "@/enums";



export default function ProductListingPage()
{   
    const navigate = useNavigate();
    const [hoverId, setHoverId] = useState<string>("");
    const { isLoading, isError, error, data: products } = useQuery(["product_listing"], () => ProductService.getAllProducts());


    if (isLoading)
    {
		// return (
		// 	// show skeleton
		// );
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


    return (
		<div className={styles.product_listing}>
			<div className="container p-0">
                <div className="row">
                    <p className="col">Poducts {products?.length}</p>
                </div>
                <div className="row">
                    {
                        products?.map((item) => {
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
                        })
                    }
                </div>
            </div>
		</div>
	);
}
