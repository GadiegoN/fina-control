import { RouterProvider } from "react-router-dom";
import { router } from "./routes/routes";
import { ThemeProvider } from "./components/theme/theme-provider";

export function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="fina-control">
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}