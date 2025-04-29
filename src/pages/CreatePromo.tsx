
import { useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { StoryCard, StoryTemplate } from "@/components/promo/StoryCard";
import { ProductForm } from "@/components/promo/ProductForm";
import { TemplateSelector } from "@/components/promo/TemplateSelector";
import { ActionButtons } from "@/components/promo/ActionButtons";
import { useLocation } from "react-router-dom";
import { toast } from "sonner";

const CreatePromo = () => {
  const location = useLocation();
  const initialTemplate = location.state?.template || {
    id: "template-1",
    name: "Vermelho e Laranja",
    gradientClass: "template-gradient-1",
  };

  const templates = [
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

  const [productData, setProductData] = useState({
    name: "Nome do produto",
    price: 29.9,
    originalPrice: 39.9,
    imageUrl: "",
  });

  const [selectedTemplate, setSelectedTemplate] = useState<StoryTemplate>(initialTemplate);

  const storyRef = useRef<HTMLDivElement>(null);

  const handleFormChange = (newData: typeof productData) => {
    setProductData(newData);
  };

  const handleTemplateSelect = (template: StoryTemplate) => {
    setSelectedTemplate(template);
    toast.success(`Template ${template.name} selecionado`);
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
          <ActionButtons storyRef={storyRef} />
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
