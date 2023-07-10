import { IProduct } from "@/interfaces";
import Chip from "@mui/material/Chip";
import styled from "styled-components";


interface IProductCategoryProps
{
	product: IProduct;
    onCategoryClick?(): void;
}


const ProductCategorySC = styled.div`

    .chip {
		text-transform: capitalize;
	}
`;


export default function ProductCategory(props: IProductCategoryProps)
{
    const { category } = props.product;
    const handleCategoryClick = props.onCategoryClick;


    return (
		<ProductCategorySC>
			<Chip className="chip" label={category} variant="outlined" size="small" onClick={handleCategoryClick} />
		</ProductCategorySC>
	);
}
