import { Link } from "react-router-dom";
import { NavLink } from "./nav-link";
import { ModeToggle } from "./theme/mode-toggle";

export function Header() {
    return (
        <header className="border-b shadow-xl">
            <div className="w-11/12 max-w-7xl mx-auto py-6 flex items-center justify-between">
                <Link to="/">
                    <h1 className="text-primary font-bold text-xl select-none cursor-pointer">Fina-control</h1>
                </Link>

                <nav className="flex gap-2">
                    <NavLink to="/">Início</NavLink>
                    <NavLink to="/sign-in">Login</NavLink>
                    <NavLink to="/dashboard">Dashboard</NavLink>
                    <ModeToggle />
                </nav>
            </div>
        </header>
    )
}