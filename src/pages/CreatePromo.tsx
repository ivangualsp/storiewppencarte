
import { useRef, useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { StoryCard, StoryTemplate } from "@/components/promo/StoryCard";
import { ProductForm } from "@/components/promo/ProductForm";
import { TemplateSelector } from "@/components/promo/TemplateSelector";
import { ActionButtons } from "@/components/promo/ActionButtons";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { saveDesign, getTemplates } from "@/lib/design-service";
import { useAuth } from "@/contexts/AuthContext";

const CreatePromo = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const initialTemplate = location.state?.template || {
    id: "template-1",
    name: "Vermelho e Laranja",
    gradientClass: "template-gradient-1",
  };

  const [templates, setTemplates] = useState<StoryTemplate[]>([
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
  ]);

  const [productData, setProductData] = useState({
    name: "Nome do produto",
    price: 29.9,
    originalPrice: 39.9,
    imageUrl: "",
  });

  const [selectedTemplate, setSelectedTemplate] = useState<StoryTemplate>(initialTemplate);
  const [isSaving, setIsSaving] = useState(false);

  const storyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadTemplates = async () => {
      const dbTemplates = await getTemplates();
      if (dbTemplates.length > 0) {
        setTemplates(dbTemplates);
        // If we're not using a template from state, set the first template as default
        if (!location.state?.template) {
          setSelectedTemplate(dbTemplates[0]);
        }
      }
    };
    loadTemplates();
  }, [location.state]);

  const handleFormChange = (newData: typeof productData) => {
    setProductData(newData);
  };

  const handleTemplateSelect = (template: StoryTemplate) => {
    setSelectedTemplate(template);
    toast.success(`Template ${template.name} selecionado`);
  };

  const handleSaveDesign = async () => {
    if (!user) {
      toast.error("Você precisa estar logado para salvar designs");
      navigate("/login");
      return;
    }

    setIsSaving(true);
    try {
      const designId = await saveDesign({
        product_name: productData.name,
        price: productData.price,
        original_price: productData.originalPrice,
        image_url: productData.imageUrl,
        template_id: selectedTemplate.id,
      });

      if (designId) {
        toast.success("Design salvo com sucesso!");
      }
    } catch (error) {
      console.error("Error saving design:", error);
      toast.error("Erro ao salvar o design. Tente novamente.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <h1 className="text-3xl font-bold">Criar Promo</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Informações do Produto</h2>
          <ProductForm onFormChange={handleFormChange} productData={productData} />
          <TemplateSelector 
            templates={templates} 
            selectedTemplate={selectedTemplate}
            onSelectTemplate={handleTemplateSelect}
          />
          <ActionButtons 
            storyRef={storyRef} 
            onSave={handleSaveDesign}
            isSaving={isSaving}
          />
        </div>

        <div className="flex justify-center">
          <div className="w-full max-w-xs" ref={storyRef}>
            <StoryCard product={productData} template={selectedTemplate} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePromo;
