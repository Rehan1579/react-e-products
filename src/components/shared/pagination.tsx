import Pagination from "@mui/material/Pagination";
import { IPagination } from '@/interfaces/IPagination';


interface IProps
{
	info: IPagination;
	handlePaginationChange(page: number): void;
}


export default function EPagination(props: IProps)
{
    const { info, handlePaginationChange} = props;
	const currentPage = info.curPage;


	return (
        <Pagination count={info.pages} page={currentPage} onChange={(_, page: number) => handlePaginationChange(page)} />
	);
}
