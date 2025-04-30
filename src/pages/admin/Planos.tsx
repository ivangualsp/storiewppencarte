import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";

const Planos = () => {
  const { isAdmin, loading } = useAuth();

  if (loading) return null;
  if (!isAdmin) return <Navigate to="/dashboard" replace />;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Admin - Planos</h2>
      <p>Gerencie planos de assinatura aqui.</p>
    </div>
  );
};

export default Planos; 