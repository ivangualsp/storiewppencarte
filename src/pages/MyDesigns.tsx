
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { StoryCard, StoryTemplate } from "@/components/promo/StoryCard";

const MyDesigns = () => {
  // In a real app, this would come from a database
  const [designs] = useState<
    Array<{
      id: string;
      product: {
        name: string;
        price: number;
        originalPrice?: number;
        imageUrl?: string;
      };
      template: StoryTemplate;
      createdAt: Date;
    }>
  >([]);

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Meus Designs</h1>
        <Link to="/create">
          <Button>Criar Novo Design</Button>
        </Link>
      </div>

      {designs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {designs.map((design) => (
            <Card key={design.id} className="overflow-hidden">
              <CardContent className="p-3">
                <StoryCard
                  product={design.product}
                  template={design.template}
                  className="h-[300px]"
                />
              </CardContent>
              <CardFooter className="flex justify-between bg-muted/50 p-3">
                <div className="text-sm text-muted-foreground">
                  {design.createdAt.toLocaleDateString()}
                </div>
                <Link to={`/edit/${design.id}`}>
                  <Button variant="outline" size="sm">
                    Editar
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="p-12 text-center">
          <div className="space-y-4">
            <h2 className="text-xl font-medium">Nenhum design encontrado</h2>
            <p className="text-muted-foreground">
              Crie seu primeiro design promocional agora mesmo!
            </p>
            <Link to="/create">
              <Button>Criar Design</Button>
            </Link>
          </div>
        </Card>
      )}
    </div>
  );
};

export default MyDesigns;
