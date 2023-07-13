import { EnumApi } from "@/enums";
import { IProduct, IProductListing, IProductPrice, IProductStock } from "@/interfaces";
import { IPagination } from "@/interfaces/IPagination";
import axios from "axios";


interface IProductService
{
	getProductById(id: string): Promise<IProduct>;
	getProducts(page: number): Promise<IProductListing>;
	getProductsByCategory(page: number, category: string): Promise<IProductListing>;
	searchProduct(value: string): Promise<IProductListing>;
	getAllCategories(): Promise<string[]>;

	newProduct(): Promise<IProduct>;

	hasDiscount(product: IProduct): boolean;
	hasStock(product: IProduct): boolean;
	hasLowStock(product: IProduct): boolean;
	getDiscountPrice(product: IProduct): number;
}


function mapProducts(data: any): IProduct[]
{
	const { products } = data;
	return products.map((item: any) => mapProduct(item));
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


function mapPagination(data: any): IPagination
{
	const { total, skip, limit } = data;
	const pagination: IPagination = {
		total,
		skip,
		limit,
		pages: Math.ceil(total / PAGE_LIMIT),
		curPage: Math.floor(skip / PAGE_LIMIT) + 1
	};
	return pagination;
}


const PAGE_LIMIT = 20;
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


	getProducts(page: number): Promise<IProductListing>
	{
		const skip = Math.abs(page - 1) * PAGE_LIMIT;
		const url = `${EnumApi.GET_PRODUCTS}?limit=${PAGE_LIMIT}&skip=${skip}`;
		return axios
			.get(url)
			.then((res) => {
				const pagination = mapPagination(res.data);
				const products = mapProducts(res.data);

				return <IProductListing>{
					pagination,
					products,
				};
			})
			.catch((err) => {
				throw new Error(err?.response?.data?.message || err.message);
			});
	},


	getProductsByCategory(page: number, category: string): Promise<IProductListing>
	{
		const skip = Math.abs(page - 1) * PAGE_LIMIT;
		const url = `${EnumApi.GET_PRODUCTS_BY_CATEGORIES}/${category}?limit=${PAGE_LIMIT}&skip=${skip}`;
		return axios
			.get(url)
			.then((res) => {
				const pagination = mapPagination(res.data);
				const products = mapProducts(res.data);

				return <IProductListing>{
					pagination,
					products,
				};
			})
			.catch((err) => {
				throw new Error(err?.response?.data?.message || err.message);
			});
	},


	searchProduct(value: string): Promise<IProductListing>
	{
		return Promise.resolve(null);
	},


	getAllCategories(): Promise<string[]>
	{
		const url = EnumApi.GET_CATEGORIES;
		return axios
			.get(url)
			.then((res) => {
				return res.data;
			})
			.catch((err) => {
				throw new Error(err?.response?.data?.message || err.message);
			});
	},


	newProduct(): Promise<IProduct>
	{
		return Promise.resolve({
			id: crypto.randomUUID(),
			title: "",
			description: "",
			price: 0,
			discountPercentage: 0,
			rating: 0,
			stock: 0,
			brand: "",
			category: "",
			thumbnail: "",
			images: []
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
