import { CssBaseline } from "@mui/material";
import { QueryClientRoot, QueryClientRootInstance } from "./providers/query-client-provider";
import { ThemeRoot, ThemeRootInstance } from "./providers/theme-provider";
import { RouterProvider } from "react-router-dom";
import ROUTES from "./root/routes";
import "./App.scss";


export default function App() {
	return (
		<ThemeRoot theme={ThemeRootInstance}>
			<QueryClientRoot client={QueryClientRootInstance}>
				<CssBaseline />
				<RouterProvider router={ROUTES} />
			</QueryClientRoot>
		</ThemeRoot>
	);
}
