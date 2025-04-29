
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { StoryCard, StoryTemplate } from "@/components/promo/StoryCard";
import { getUserDesigns, deleteDesign, Design } from "@/lib/design-service";
import { toast } from "sonner";
import { Trash, Edit } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const MyDesigns = () => {
  const [designs, setDesigns] = useState<Array<Design & {
    product: {
      name: string;
      price: number;
      originalPrice?: number;
      imageUrl?: string;
    };
    template: StoryTemplate;
  }>>([]);
  
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  const loadDesigns = async () => {
    setLoading(true);
    try {
      const userDesigns = await getUserDesigns();
      
      // Transform designs to match our component structure
      const transformedDesigns = userDesigns.map(design => ({
        ...design,
        product: {
          name: design.product_name,
          price: design.price,
          originalPrice: design.original_price,
          imageUrl: design.image_url,
        },
        template: {
          id: design.template_id,
          name: "", // We don't have this info in the design object
          gradientClass: design.template_id === "template-1" 
            ? "template-gradient-1" 
            : design.template_id === "template-2" 
              ? "template-gradient-2" 
              : "template-gradient-3"
        }
      }));
      
      setDesigns(transformedDesigns);
    } catch (error) {
      console.error("Error loading designs:", error);
      toast.error("Erro ao carregar designs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDesigns();
  }, []);

  const handleDeleteDesign = async (designId: string) => {
    setDeleting(designId);
    try {
      const success = await deleteDesign(designId);
      if (success) {
        setDesigns(designs.filter(design => design.id !== designId));
        toast.success("Design excluído com sucesso!");
      }
    } catch (error) {
      console.error("Error deleting design:", error);
      toast.error("Erro ao excluir design.");
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Meus Designs</h1>
        <Link to="/create">
          <Button>Criar Novo Design</Button>
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-muted-foreground">Carregando designs...</p>
        </div>
      ) : designs.length > 0 ? (
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
                  {new Date(design.created_at).toLocaleDateString()}
                </div>
                <div className="flex gap-2">
                  <Link to={`/edit/${design.id}`}>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </Link>
                  
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm"
                        disabled={deleting === design.id}
                      >
                        <Trash className="h-4 w-4 text-red-500" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Excluir design</AlertDialogTitle>
                        <AlertDialogDescription>
                          Tem certeza que deseja excluir este design? Esta ação não pode ser desfeita.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDeleteDesign(design.id)}
                          className="bg-red-500 hover:bg-red-600"
                        >
                          Excluir
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
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
