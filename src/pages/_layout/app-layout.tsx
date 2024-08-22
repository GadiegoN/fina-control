import { Outlet } from "react-router-dom";

export function AppLayout() {
    return (
        <main>
            <h1>Cabeçalho</h1>

            <Outlet />
        </main>
    )
}