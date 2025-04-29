
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Download, Share } from "lucide-react";
import html2canvas from "html2canvas";
import { useRef } from "react";

type ActionButtonsProps = {
  storyRef: React.RefObject<HTMLDivElement>;
};

export const ActionButtons = ({ storyRef }: ActionButtonsProps) => {
  const handleDownload = async () => {
    if (!storyRef.current) return;

    try {
      toast.loading("Preparando download...");
      
      const canvas = await html2canvas(storyRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: null,
      });
      
      const image = canvas.toDataURL("image/png");
      
      const link = document.createElement("a");
      link.href = image;
      link.download = `promo-story-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast.dismiss();
      toast.success("Imagem baixada com sucesso!");
    } catch (error) {
      toast.dismiss();
      toast.error("Erro ao gerar a imagem. Tente novamente.");
      console.error(error);
    }
  };

  const handleShare = async () => {
    if (!storyRef.current) return;

    try {
      if (!navigator.share) {
        toast.error("Seu navegador não suporta compartilhamento direto.");
        return;
      }

      toast.loading("Preparando para compartilhar...");
      
      const canvas = await html2canvas(storyRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: null,
      });
      
      canvas.toBlob(async (blob) => {
        if (!blob) {
          toast.error("Erro ao gerar a imagem.");
          return;
        }
        
        const file = new File([blob], "promo-story.png", { type: "image/png" });
        
        try {
          await navigator.share({
            files: [file],
            title: "Promoção",
            text: "Confira essa oferta!",
          });
          toast.dismiss();
          toast.success("Compartilhado com sucesso!");
        } catch (error) {
          toast.dismiss();
          if (error instanceof Error && error.name !== "AbortError") {
            toast.error("Erro ao compartilhar. Tente fazer o download.");
          }
        }
      });
    } catch (error) {
      toast.dismiss();
      toast.error("Erro ao gerar a imagem. Tente baixar e compartilhar manualmente.");
    }
  };

  return (
    <div className="flex gap-4">
      <Button 
        onClick={handleDownload} 
        className="flex-1"
        size="lg"
      >
        <Download className="mr-2 h-4 w-4" /> Baixar
      </Button>
      <Button 
        onClick={handleShare} 
        variant="outline" 
        className="flex-1"
        size="lg"
      >
        <Share className="mr-2 h-4 w-4" /> Compartilhar
      </Button>
    </div>
  );
};
