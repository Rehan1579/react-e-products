import { EnumApi } from "@/enums";
import { IProduct, IProductPrice, IProductStock } from "@/interfaces";
import axios from "axios";


interface IProductService
{
	getProductById(id: string): Promise<IProduct>;
	getAllProducts(): Promise<IProduct[]>;

	hasDiscount(product: IProduct): boolean;
	hasStock(product: IProduct): boolean;
	hasLowStock(product: IProduct): boolean;
	getDiscountPrice(product: IProduct): number;
}


function mapProduct(product: IProduct): IProduct
{
	const { price, discountPercentage, stock } = product;
	

	let priceInfo: IProductPrice;
	if (price)
	{
		let discount = ProductService.getDiscountPrice(product);
		priceInfo = {
			price,
			formattedPrice: `$${price.toFixed(2)}`,
			discountPercentage,
			formattedDiscountPercentage: `${discountPercentage}% OFF`,
			discount,
			formattedDiscount: `$${discount.toFixed(2)}`,
			hasDiscount: ProductService.hasDiscount(product),
		};
	}


	let stockInfo: IProductStock;
	if (stock)
	{
		stockInfo = {
			qty: stock,
			available: ProductService.hasStock(product),
			lowStock: ProductService.hasLowStock(product),
		};
	}


	return <IProduct>{
		...product,
		priceInfo,
		stockInfo,
	};
}



const ProductService: IProductService = {

	getProductById(id: string): Promise<IProduct>
	{
		const url = `${EnumApi.GET_PRODUCTS}/${id}`;
		return axios
			.get(url)
			.then((res) => {
				return mapProduct(res.data);
			})
			.catch((err) => {
				throw new Error(err?.response?.data?.message || err.message);
			});
	},


	getAllProducts(): Promise<IProduct[]>
	{
		const url = EnumApi.GET_PRODUCTS;
		return axios
			.get(url)
			.then((res) => {
				return res.data.products.map((item: any) => {
					return mapProduct(item);
				});
			})
			.catch((err) => {
				throw new Error(err?.response?.data?.message || err.message);
			});
	},


	hasDiscount(product: IProduct): boolean
	{
		return product.discountPercentage > 0;
	},


	hasStock(product: IProduct): boolean
	{
		return product.stock > 0;
	},


	hasLowStock(product: IProduct): boolean
	{
		return product.stock < 5;
	},


	getDiscountPrice(product: IProduct): number
	{
		if (product.discountPercentage > 0)
		{
			let discount = (product.price * product.discountPercentage) / 100;
			return product.price - discount;
		}

		return 0;
	},
};
export default ProductService;
