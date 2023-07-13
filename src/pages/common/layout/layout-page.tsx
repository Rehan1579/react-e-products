import { EnumRoutes } from "@/enums";
import { ArrowBack } from "@mui/icons-material";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import { Outlet, useNavigate, useLocation } from "react-router-dom";


const navItems = [
	{ id: 1, title: "Home", route: EnumRoutes.HOME },
	{ id: 2, title: "Products", route: EnumRoutes.PRODUCTS },
];


export default function LayoutPage()
{
    const navigate = useNavigate();
    const location = useLocation();


    const handleBackButtonClick = () => {
		navigate(-1);
	};


    const handleMenuNavigation = (route: string) => {
		navigate(route);
	};


    const showBackButton = (location.pathname != EnumRoutes.HOME);


    return (
		<>
			<AppBar position="sticky" style={{background: "#88d3ee"}}>
				<Toolbar>
					{showBackButton && (
						<IconButton edge="start" color="inherit" aria-label="back" onClick={handleBackButtonClick}>
							<ArrowBack style={{color: "#1e1414"}} />
						</IconButton>
					)}

					<div style={{color: "#1e1414"}} className="d-flex justify-content-between align-items-center flex-grow-1">
						<h5 className="m-0"  style={{cursor: "pointer"}} onClick={() => handleMenuNavigation(EnumRoutes.HOME)}>eProducts</h5>
						<div>
							{navItems.map((item) => (
								<Button key={item.id} sx={{ color: "#1e1414" }} onClick={() => handleMenuNavigation(item.route)}>
									{item.title}
								</Button>
							))}
						</div>
					</div>
				</Toolbar>
			</AppBar>

			<main style={{height: "100%", background: "whitesmoke"}}>
				<Outlet />
			</main>
		</>
	);
}
