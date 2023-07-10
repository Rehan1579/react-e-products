import { EnumRoutes } from "@/enums";
import { Outlet, Link } from "react-router-dom";


export default function LayoutPage() {
    return (
        <>
            <header>
                <h1>eProducts</h1>
                <nav>
                    <ul>
                        <li>
                            <Link to={EnumRoutes.HOME}>Home</Link>
                        </li>
                        <li>
                            <Link to={EnumRoutes.PRODUCTS}>Products</Link>
                        </li>
                        <li>
                            <Link to={EnumRoutes.PRODUCT_DETAIL}>Product Detail</Link>
                        </li>
                    </ul>
                </nav>
            </header>
            <main>
                <Outlet />
            </main>
            <footer>©️ me 2023</footer>
        </>
    );
}
