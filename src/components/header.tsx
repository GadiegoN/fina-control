import { Link, useNavigate } from "react-router-dom";
import { NavLink } from "./nav-link";
import { ModeToggle } from "./theme/mode-toggle";
import { useContext } from "react";
import { AuthContext } from "@/context/auth-context";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from "@/services/firebase-connection";

export function Header() {
    const { user } = useContext(AuthContext)
    const navigate = useNavigate()

    async function handleLogout() {
        await signOut(auth)

        navigate('/', { replace: true })
    }

    return (
        <header className="border-b shadow-xl">
            <div className="w-11/12 max-w-7xl mx-auto py-6 flex items-center justify-between">
                <Link to="/">
                    <h1 className="text-primary font-bold text-xl select-none cursor-pointer">Fina-control</h1>
                </Link>

                <nav className="flex gap-2">
                    <NavLink to="/">Início</NavLink>
                    <NavLink to="/about">Sobre</NavLink>
                    {!user && <NavLink to="/sign-in">Login</NavLink>}
                    {user && (
                        <>
                            <NavLink to="/dashboard">Dashboard</NavLink>
                            <NavLink to="/profile">Perfil</NavLink>
                            <Button onClick={handleLogout} variant="navlink"><LogOut size={18} /></Button>
                        </>
                    )}
                    <ModeToggle />
                </nav>
            </div>
        </header>
    )
}