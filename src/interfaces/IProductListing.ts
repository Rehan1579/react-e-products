import { IProduct } from ".";
import { IPagination } from "./IPagination";


export interface IProductListing {
	products: IProduct[];
	pagination: IPagination;
}
