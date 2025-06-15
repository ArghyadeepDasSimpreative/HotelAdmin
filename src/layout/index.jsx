import { Outlet } from "react-router-dom"
import CustomSidebar from "./Sidebar";

const MainLayout = () => {
    return (<div className="w-screen min-h-screen flex">
        <CustomSidebar />
        <div className="flex flex-col w-full flex-1">
            <nav className="w-full border-b border-slate-300 h-[80px] px-4 py-1">hi</nav>
            <Outlet />
        </div>
    </div>)
}


export default MainLayout;