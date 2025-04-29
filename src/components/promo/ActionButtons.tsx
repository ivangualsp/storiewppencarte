
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
      
      // Clone o elemento para um ambiente controlado para o screenshot
      const clonedElement = storyRef.current.cloneNode(true) as HTMLDivElement;
      const container = document.createElement('div');
      container.style.position = 'absolute';
      container.style.left = '-9999px';
      container.style.top = '-9999px';
      container.style.width = '1080px';  // Largura exata
      container.style.height = '1920px'; // Altura exata
      container.appendChild(clonedElement);
      document.body.appendChild(container);
      
      // Ajustar o clone para encaixar nas dimensões exatas
      clonedElement.style.width = '100%';
      clonedElement.style.height = '100%';
      clonedElement.style.margin = '0';
      clonedElement.style.padding = '0';
      clonedElement.style.borderRadius = '0';
      clonedElement.style.boxShadow = 'none';
      
      // Gerar o canvas com dimensões específicas
      const canvas = await html2canvas(clonedElement, {
        width: 1080,
        height: 1920,
        scale: 1,
        logging: false,
        allowTaint: true,
        useCORS: true,
        backgroundColor: null,
      });
      
      // Limpar o elemento temporário
      document.body.removeChild(container);
      
      // Converter para imagem e baixar
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
