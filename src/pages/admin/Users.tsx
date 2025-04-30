import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";

const Users = () => {
  const { isAdmin, loading } = useAuth();

  if (loading) return null;
  if (!isAdmin) return <Navigate to="/dashboard" replace />;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Admin - Usuários</h2>
      <p>Gerencie usuários aqui.</p>
    </div>
  );
};

export default Users; 