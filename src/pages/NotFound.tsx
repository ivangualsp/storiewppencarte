
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-6 animate-fade-in">
        <h1 className="text-7xl font-bold">404</h1>
        <p className="text-2xl">Página não encontrada</p>
        <p className="text-muted-foreground max-w-md mx-auto">
          A página que você está procurando não existe ou foi removida.
        </p>
        <Link to="/">
          <Button size="lg">Voltar ao Início</Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
