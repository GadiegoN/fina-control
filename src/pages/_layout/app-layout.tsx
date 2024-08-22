import { Header } from "@/components/header";
import { Outlet } from "react-router-dom";

export function AppLayout() {
    return (
        <main className="space-y-10">
            <Header />

            <Outlet />
        </main>
    )
}