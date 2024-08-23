import { AppLayout } from "@/pages/_layout/app-layout";
import { Dashboard } from "@/pages/dashboard";
import { Home } from "@/pages/home";
import { SignIn } from "@/pages/sign-in";
import { createBrowserRouter } from "react-router-dom";
import { PrivateRoute } from "./private-routes";
import { SignUp } from "@/pages/sign-up";
import { Profile } from "@/pages/profile";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <AppLayout />,
        children: [
            { path: '/', element: <Home /> },
            { path: '/sign-in', element: <SignIn /> },
            { path: '/sign-up', element: <SignUp /> },
            { path: '/dashboard', element: <PrivateRoute><Dashboard /></PrivateRoute> },
            { path: '/profile', element: <PrivateRoute><Profile /></PrivateRoute> },
        ]
    }
])