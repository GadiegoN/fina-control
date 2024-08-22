import { RouterProvider } from "react-router-dom";
import { router } from "./routes/routes";
import { ThemeProvider } from "./components/theme/theme-provider";
import { Toaster } from "./components/ui/sonner";
import AuthProvider from "./context/auth-context";

export function App() {
  return (
    <AuthProvider>
      <ThemeProvider defaultTheme="system" storageKey="fina-control">
        <RouterProvider router={router} />
        <Toaster />
      </ThemeProvider>
    </AuthProvider>
  )
}