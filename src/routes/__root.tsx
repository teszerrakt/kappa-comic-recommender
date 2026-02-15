import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import type * as React from "react";
import Footer from "../Components/Footer";
import { Button } from "../Components/ui/button";
import { PreferencesProvider } from "../context/PreferencesContext";

const RootError: React.FC<{ error: Error }> = ({ error }) => (
  <div className="flex min-h-[60vh] items-center justify-center px-4">
    <div className="max-w-md text-center">
      <h1 className="text-2xl font-bold text-kappa-green">Something went wrong</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        {error.message || "An unexpected error occurred."}
      </p>
      <Button variant="kappa" className="mt-4" asChild>
        <Link to="/">Back to home</Link>
      </Button>
    </div>
  </div>
);

const NotFound: React.FC = () => (
  <div className="flex min-h-[60vh] items-center justify-center px-4">
    <div className="max-w-md text-center">
      <h1 className="text-2xl font-bold text-kappa-green">Page not found</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        The page you are looking for does not exist.
      </p>
      <Button variant="kappa" className="mt-4" asChild>
        <Link to="/">Back to home</Link>
      </Button>
    </div>
  </div>
);

export const Route = createRootRoute({
  component: () => (
    <PreferencesProvider>
      <div className="min-h-screen flex flex-col">
        <div className="flex-1">
          <div className="animate-fade-in">
            <Outlet />
          </div>
        </div>
        <Footer />
      </div>
    </PreferencesProvider>
  ),
  errorComponent: RootError,
  notFoundComponent: NotFound,
});
