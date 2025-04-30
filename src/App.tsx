import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, Outlet, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CreatePromo from "./pages/CreatePromo";
import MyDesigns from "./pages/MyDesigns";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import MainLayout from "./components/layout/MainLayout";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { Register } from "./pages/Register";
import Planos from "./pages/admin/Planos";

const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = () => {
  const { session, loading } = useAuth();
  const location = useLocation();

  // While checking authentication state, show nothing
  if (loading) {
    return null;
  }

  // If not authenticated, redirect to login with return path
  if (!session) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If authenticated, render children
  return <Outlet />;
};

// Component to handle routes
const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Navigate to="/dashboard" replace />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    
    {/* Protected routes */}
    <Route element={<ProtectedRoute />}>
      <Route element={<MainLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create" element={<CreatePromo />} />
        <Route path="/designs" element={<MyDesigns />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin/planos" element={<Planos />} />
      </Route>
    </Route>
    
    {/* Logout route */}
    <Route path="/logout" element={<LogoutHandler />} />
    
    <Route path="*" element={<NotFound />} />
  </Routes>
);

// Logout handler component
const LogoutHandler = () => {
  const { signOut } = useAuth();

  // Effect to trigger signOut when the component mounts
  useEffect(() => {
    signOut();
  }, [signOut]);

  return null; // This won't be shown as signOut will redirect
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
