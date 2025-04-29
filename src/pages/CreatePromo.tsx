
import { useRef, useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { StoryCard, StoryTemplate, PromoConfig, defaultPromoConfig } from "@/components/promo/StoryCard";
import { ProductForm } from "@/components/promo/ProductForm";
import { TemplateSelector } from "@/components/promo/TemplateSelector";
import { ActionButtons } from "@/components/promo/ActionButtons";
import { PromoConfigurator } from "@/components/promo/PromoConfigurator";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { saveDesign, getTemplates } from "@/lib/design-service";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Layout } from "lucide-react";

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
  const [promoConfig, setPromoConfig] = useState<PromoConfig>(defaultPromoConfig);

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

  const handleConfigChange = (newConfig: PromoConfig) => {
    setPromoConfig(newConfig);
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
          <Tabs defaultValue="product" className="w-full">
            <TabsList className="w-full grid grid-cols-3 mb-6">
              <TabsTrigger value="product">Produto</TabsTrigger>
              <TabsTrigger value="template">Template</TabsTrigger>
              <TabsTrigger value="config">
                <Layout className="h-4 w-4 mr-2" /> Formato
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="product">
              <h2 className="text-xl font-semibold mb-4">Informações do Produto</h2>
              <ProductForm onFormChange={handleFormChange} productData={productData} />
            </TabsContent>
            
            <TabsContent value="template">
              <h2 className="text-xl font-semibold mb-4">Escolha um Template</h2>
              <TemplateSelector 
                templates={templates} 
                selectedTemplate={selectedTemplate}
                onSelectTemplate={handleTemplateSelect}
              />
            </TabsContent>
            
            <TabsContent value="config">
              <PromoConfigurator 
                config={promoConfig} 
                onChange={handleConfigChange} 
              />
            </TabsContent>
          </Tabs>
          
          <ActionButtons 
            storyRef={storyRef} 
            onSave={handleSaveDesign}
            isSaving={isSaving}
          />
        </div>

        <div className="flex justify-center">
          <div className="w-full max-w-xs" ref={storyRef}>
            <StoryCard 
              product={productData} 
              template={selectedTemplate} 
              config={promoConfig}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePromo;
