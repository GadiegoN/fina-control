import { AppLayout } from "@/pages/_layout/app-layout";
import { Dashboard } from "@/pages/dashboard";
import { Home } from "@/pages/home";
import { SignIn } from "@/pages/sign-in";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <AppLayout />,
        children: [
            { path: '/', element: <Home /> },
            { path: '/sign-in', element: <SignIn /> },
            { path: '/dashboard', element: <Dashboard /> },
        ]
    }
])