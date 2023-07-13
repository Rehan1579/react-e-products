import { IProduct } from "@/interfaces";
import styled from "styled-components";


interface IProductRatingProps
{
	product: IProduct;
	className?: string;
}


const ProductPricingSC = styled.div`

	.new-price {
		font-weight: bold;
		font-size: 24px;
		margin-right: 16px;
	}


	.old-price {
		text-decoration: line-through;
		color: #1e14147a;
	}


	.discount {
		color: #38ae04;
		font-weight: bold;
		padding: 2px 6px;
		background: #dff1d9;
		border-radius: 4px;
	}
`;


export default function ProductPricing(props: IProductRatingProps)
{
	const { priceInfo: price } = props.product;

	return (
		<ProductPricingSC className={props.className}>
            <span className={price.hasDiscount ? "old-price" : "new-price"}>{price.formattedPrice}</span>

            {price.hasDiscount && (
                <div className="d-flex flex-wrap align-items-center">
                    <span className="new-price">{price.formattedDiscount}</span>
                    <span className="discount">{price.formattedDiscountPercentage}</span>
                </div>
            )}
		</ProductPricingSC>
	);
}
