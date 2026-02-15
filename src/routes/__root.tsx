import { createRootRoute, Outlet } from "@tanstack/react-router";
import Footer from "../Components/Footer";
import { PreferencesProvider } from "../context/PreferencesContext";

export const Route = createRootRoute({
  component: () => (
    <PreferencesProvider>
      <div className="relative min-h-screen pb-10">
        <Outlet />
        <Footer />
      </div>
    </PreferencesProvider>
  ),
});
