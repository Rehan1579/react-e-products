import { IProduct } from "@/interfaces";
import styled from "styled-components";


interface IProductStockProps
{
	product: IProduct;
}


const ProductStockSC = styled.div`
	font-weight: bold;


	.stock-in {
		margin: 0;
		color: #007600;
	}


	.stock-low {
		margin: 0;
		color: #fa0000;
	}


	.stock-out {
		margin: 0;
		color: #8e8989;
	}
`;


export default function ProductStock(props: IProductStockProps)
{
    const { stockInfo } = props.product;


    if (!stockInfo.available)
    {
		return (
			<ProductStockSC>
				<p className="stock-out">No Stock</p>
			</ProductStockSC>
		);
	}

	
    if (stockInfo.lowStock)
    {
        return (
			<ProductStockSC>
				<p className="stock-low">Low Stock: {stockInfo.qty}</p>
			</ProductStockSC>
		);
	}


	return (
        <ProductStockSC>
            <p className="stock-in">In Stock: {stockInfo.qty}</p>
        </ProductStockSC>
    );
}
