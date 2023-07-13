import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";


interface IProps
{
    message?: string;
    isLoading: boolean;
}


export default function EBusyLoader(props: IProps)
{
    const { message, isLoading } = props;


	return (
		<Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
			<div className="d-flex flex-column align-items-center">
				<CircularProgress />
				{message && <p>{message}</p>}
			</div>
		</Backdrop>
	);
}
