
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { StoryCard } from "@/components/promo/StoryCard";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const recentTemplates = [
    {
      id: "template-1",
      name: "Vermelho e Laranja",
      gradientClass: "template-gradient-1",
    },
    {
      id: "template-2",
      name: "Azul e Roxo",
      gradientClass: "template-gradient-2",
    },
    {
      id: "template-3",
      name: "Verde e Amarelo",
      gradientClass: "template-gradient-3",
    },
  ];

  const sampleProduct = {
    name: "Carne Bovina Premium",
    price: 29.9,
    originalPrice: 39.9,
    imageUrl: "https://images.unsplash.com/photo-1615937722923-67f6deaf2cc9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWVhdHxlbnwwfHwwfHx8MA%3D%3D",
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <section className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total de Designs</CardTitle>
            <CardDescription>Seus designs criados</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">0</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Compartilhamentos</CardTitle>
            <CardDescription>Total de compartilhamentos</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">0</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Downloads</CardTitle>
            <CardDescription>Total de downloads</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">0</p>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Templates Populares</h2>
          <Link to="/create">
            <Button>Criar Novo</Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentTemplates.map((template) => (
            <Link 
              to="/create" 
              state={{ template }} 
              key={template.id}
              className="transition-transform hover:scale-105"
            >
              <StoryCard
                product={sampleProduct}
                template={template}
                className="h-[420px]"
              />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
