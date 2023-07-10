export interface IProduct {
	id: string;
	title: string;
	description: string;
    price: number;
    discountPercentage: number;
	rating: number;
    stock: number;
	brand: string;
	category: string;
	thumbnail: string;
	images: string[];
	priceInfo: IProductPrice;
	stockInfo: IProductStock;
}

export interface IProductPrice {
    hasDiscount: boolean;
	price: number;
	formattedPrice: string;
	discountPercentage: number;
	formattedDiscountPercentage: string;
	discount: number;
	formattedDiscount: string;
}

export interface IProductStock {
	qty: number;
	available: boolean;
	lowStock: boolean;
}
