
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import html2canvas from "html2canvas";
import { Download, Save } from "lucide-react";
import { RefObject } from "react";

interface ActionButtonsProps {
  storyRef: RefObject<HTMLDivElement>;
  onSave?: () => Promise<void>;
  isSaving?: boolean;
}

export const ActionButtons = ({ storyRef, onSave, isSaving = false }: ActionButtonsProps) => {
  const handleDownload = async () => {
    if (!storyRef.current) return;

    try {
      toast.info("Preparando imagem para download...");
      
      const canvas = await html2canvas(storyRef.current, {
        scale: 2,
        logging: false,
        allowTaint: true,
        useCORS: true,
      });
      
      const image = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      
      link.href = image;
      link.download = `promo-${new Date().getTime()}.png`;
      link.click();
      
      toast.success("Download realizado com sucesso!");
    } catch (error) {
      console.error("Download error:", error);
      toast.error("Erro ao gerar a imagem. Tente novamente.");
    }
  };

  return (
    <div className="space-y-4">
      <Button 
        onClick={handleDownload} 
        className="w-full"
        variant="default"
      >
        <Download className="mr-2 h-4 w-4" />
        Baixar Imagem
      </Button>
      
      {onSave && (
        <Button 
          onClick={onSave} 
          className="w-full"
          variant="secondary"
          disabled={isSaving}
        >
          <Save className="mr-2 h-4 w-4" />
          {isSaving ? "Salvando..." : "Salvar Design"}
        </Button>
      )}
    </div>
  );
};
