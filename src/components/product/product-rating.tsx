import { IProduct } from "@/interfaces";
import Rating from '@mui/material/Rating';
import styled from 'styled-components';


interface IProductRatingProps
{
	product: IProduct;
}


const ProductRatingSC = styled.div`
    display: flex;
	align-items: center;
	gap: 8px;


	span {
		font-size: 14px;
	}
`;



export default function ProductRating(props: IProductRatingProps)
{
	const { rating } = props.product;

	return (
		<ProductRatingSC>
			<Rating value={rating} precision={0.5} size="small" readOnly />
			<span>({rating})</span>
		</ProductRatingSC>
	);
}
