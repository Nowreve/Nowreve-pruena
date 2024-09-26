import NavbarDashboard from "./components/NavbarDashboard/NavbarDashboard";
import { Sidebar } from "./components/Sidebar/Sidebar";

export default function DashboardPage(
    { children

    }: {
        children: React.ReactNode;
    }) {
    return (
        <div className="flex w-full h-full ">
            <div className="hidden  h-full xl:block  xl:fixed p-4 bg-background">
                <Sidebar/>
            </div>
            <div className="w-full h-full xl:ml-80 ">
                <NavbarDashboard/>
                <div className="p-6 h-max">{children}</div>
            </div>

        </div>
    )

}