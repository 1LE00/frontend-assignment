import Header from "../components/header/Header";
import { Outlet } from "react-router-dom";

export default function Layout() {
    return (
        <div className='App'>
            <Header />
            <Outlet />
        </div>
    )
}
