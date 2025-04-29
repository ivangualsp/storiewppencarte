
import React from "react";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { PromoConfig, StoryFormat } from "./StoryCard";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { 
  Settings, 
  Type, 
  Palette, 
  Smartphone, 
  Tablet, 
  Tv 
} from "lucide-react";

interface PromoConfiguratorProps {
  config: PromoConfig;
  onChange: (config: PromoConfig) => void;
}

const formatIcons = {
  'story': Smartphone,
  'feed': Tablet,
  'tv': Tv,
};

// Lista de famílias de fontes disponíveis
const fontFamilies = [
  { value: "font-sans", label: "Sans Serif" },
  { value: "font-serif", label: "Serif" },
  { value: "font-mono", label: "Monospace" },
];

// Tamanhos de fonte para diferentes elementos
const fontSizes = {
  header: [
    { value: "text-xl", label: "Pequeno" },
    { value: "text-2xl", label: "Médio" },
    { value: "text-3xl", label: "Grande" },
    { value: "text-4xl", label: "Extra Grande" },
  ],
  product: [
    { value: "text-lg", label: "Pequeno" },
    { value: "text-xl", label: "Médio" },
    { value: "text-2xl", label: "Grande" },
    { value: "text-3xl", label: "Extra Grande" },
  ],
  price: [
    { value: "text-3xl", label: "Pequeno" },
    { value: "text-4xl", label: "Médio" },
    { value: "text-5xl", label: "Grande" },
    { value: "text-price-xl", label: "Extra Grande" },
    { value: "text-price-2xl", label: "Gigante" },
    { value: "text-price-3xl", label: "Enorme" },
  ],
};

// Cores disponíveis
const colors = [
  { value: "text-white", label: "Branco", bg: "bg-white", border: "border-gray-300" },
  { value: "text-black", label: "Preto", bg: "bg-black" },
  { value: "text-red-500", label: "Vermelho", bg: "bg-red-500" },
  { value: "text-blue-500", label: "Azul", bg: "bg-blue-500" },
  { value: "text-green-500", label: "Verde", bg: "bg-green-500" },
  { value: "text-yellow-500", label: "Amarelo", bg: "bg-yellow-500" },
  { value: "text-purple-500", label: "Roxo", bg: "bg-purple-500" },
  { value: "text-pink-500", label: "Rosa", bg: "bg-pink-500" },
  { value: "text-indigo-500", label: "Índigo", bg: "bg-indigo-500" },
  { value: "text-orange-500", label: "Laranja", bg: "bg-orange-500" },
];

// Cores de fundo
const backgroundColors = [
  { value: "transparent", label: "Transparente", bg: "bg-transparent", border: "border-gray-300" },
  { value: "bg-black/25", label: "Preto 25%", bg: "bg-black/25" },
  { value: "bg-black/50", label: "Preto 50%", bg: "bg-black/50" },
  { value: "bg-black/75", label: "Preto 75%", bg: "bg-black/75" },
  { value: "bg-white/25", label: "Branco 25%", bg: "bg-white/25" },
  { value: "bg-white/50", label: "Branco 50%", bg: "bg-white/50" },
  { value: "bg-white/75", label: "Branco 75%", bg: "bg-white/75" },
  { value: "bg-red-500/50", label: "Vermelho", bg: "bg-red-500/50" },
  { value: "bg-blue-500/50", label: "Azul", bg: "bg-blue-500/50" },
  { value: "bg-green-500/50", label: "Verde", bg: "bg-green-500/50" },
  { value: "bg-yellow-500/50", label: "Amarelo", bg: "bg-yellow-500/50" },
  { value: "bg-purple-500/50", label: "Roxo", bg: "bg-purple-500/50" },
];

export const PromoConfigurator: React.FC<PromoConfiguratorProps> = ({ config, onChange }) => {
  const updateConfig = (key: keyof PromoConfig, value: any) => {
    onChange({ ...config, [key]: value });
  };

  const FormatIcon = formatIcons[config.format];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Configurações</h2>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Configurações Avançadas
            </Button>
          </SheetTrigger>
          <SheetContent className="w-[350px] sm:w-[540px] overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Configurações Avançadas</SheetTitle>
              <SheetDescription>
                Personalize todos os aspectos da sua promoção.
              </SheetDescription>
            </SheetHeader>

            <Tabs defaultValue="format" className="mt-6">
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="format">
                  <FormatIcon className="h-4 w-4 mr-2" /> Formato
                </TabsTrigger>
                <TabsTrigger value="typography">
                  <Type className="h-4 w-4 mr-2" /> Tipografia
                </TabsTrigger>
                <TabsTrigger value="colors">
                  <Palette className="h-4 w-4 mr-2" /> Cores
                </TabsTrigger>
              </TabsList>

              <TabsContent value="format" className="space-y-6">
                <div className="space-y-4">
                  <Label>Formato do Banner</Label>
                  <RadioGroup 
                    value={config.format} 
                    onValueChange={(value) => updateConfig('format', value as StoryFormat)}
                    className="grid grid-cols-3 gap-4"
                  >
                    <div className="flex flex-col items-center space-y-2">
                      <Label
                        htmlFor="format-story"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <Smartphone className="mb-3 h-8 w-8" />
                        <div>Story</div>
                        <div className="text-xs text-muted-foreground">9:16</div>
                      </Label>
                      <RadioGroupItem value="story" id="format-story" className="sr-only" />
                    </div>
                    
                    <div className="flex flex-col items-center space-y-2">
                      <Label
                        htmlFor="format-feed"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <Tablet className="mb-3 h-8 w-8" />
                        <div>Feed</div>
                        <div className="text-xs text-muted-foreground">4:5</div>
                      </Label>
                      <RadioGroupItem value="feed" id="format-feed" className="sr-only" />
                    </div>
                    
                    <div className="flex flex-col items-center space-y-2">
                      <Label
                        htmlFor="format-tv"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <Tv className="mb-3 h-8 w-8" />
                        <div>TV</div>
                        <div className="text-xs text-muted-foreground">16:9</div>
                      </Label>
                      <RadioGroupItem value="tv" id="format-tv" className="sr-only" />
                    </div>
                  </RadioGroup>
                </div>
              </TabsContent>

              <TabsContent value="typography" className="space-y-6">
                <div className="space-y-4">
                  <Label>Família da Fonte</Label>
                  <Select
                    value={config.fontFamily}
                    onValueChange={(value) => updateConfig('fontFamily', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma fonte" />
                    </SelectTrigger>
                    <SelectContent>
                      {fontFamilies.map((font) => (
                        <SelectItem 
                          key={font.value} 
                          value={font.value} 
                          className={font.value}
                        >
                          {font.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  <Label>Tamanho da Fonte do Título</Label>
                  <Select
                    value={config.headerFontSize}
                    onValueChange={(value) => updateConfig('headerFontSize', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um tamanho" />
                    </SelectTrigger>
                    <SelectContent>
                      {fontSizes.header.map((size) => (
                        <SelectItem key={size.value} value={size.value}>
                          {size.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  <Label>Tamanho da Fonte do Produto</Label>
                  <Select
                    value={config.productFontSize}
                    onValueChange={(value) => updateConfig('productFontSize', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um tamanho" />
                    </SelectTrigger>
                    <SelectContent>
                      {fontSizes.product.map((size) => (
                        <SelectItem key={size.value} value={size.value}>
                          {size.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  <Label>Tamanho da Fonte do Preço</Label>
                  <Select
                    value={config.priceFontSize}
                    onValueChange={(value) => updateConfig('priceFontSize', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um tamanho" />
                    </SelectTrigger>
                    <SelectContent>
                      {fontSizes.price.map((size) => (
                        <SelectItem key={size.value} value={size.value}>
                          {size.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </TabsContent>

              <TabsContent value="colors" className="space-y-6">
                <div className="space-y-4">
                  <Label>Cor do Texto do Título</Label>
                  <div className="grid grid-cols-5 gap-2">
                    {colors.map((color) => (
                      <div 
                        key={color.value}
                        className={`h-10 rounded-md flex items-center justify-center cursor-pointer ${
                          config.headerTextColor === color.value ? "ring-2 ring-primary" : ""
                        } ${color.bg} ${color.border || ""}`}
                        onClick={() => updateConfig('headerTextColor', color.value)}
                      >
                        <span className={color.value === "text-black" ? "text-white text-xs" : "text-black text-xs"}>
                          Aa
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <Label>Cor do Texto do Produto</Label>
                  <div className="grid grid-cols-5 gap-2">
                    {colors.map((color) => (
                      <div 
                        key={color.value}
                        className={`h-10 rounded-md flex items-center justify-center cursor-pointer ${
                          config.productTextColor === color.value ? "ring-2 ring-primary" : ""
                        } ${color.bg} ${color.border || ""}`}
                        onClick={() => updateConfig('productTextColor', color.value)}
                      >
                        <span className={color.value === "text-black" ? "text-white text-xs" : "text-black text-xs"}>
                          Aa
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <Label>Cor do Texto do Preço</Label>
                  <div className="grid grid-cols-5 gap-2">
                    {colors.map((color) => (
                      <div 
                        key={color.value}
                        className={`h-10 rounded-md flex items-center justify-center cursor-pointer ${
                          config.priceTextColor === color.value ? "ring-2 ring-primary" : ""
                        } ${color.bg} ${color.border || ""}`}
                        onClick={() => updateConfig('priceTextColor', color.value)}
                      >
                        <span className={color.value === "text-black" ? "text-white text-xs" : "text-black text-xs"}>
                          Aa
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <Label>Fundo do Cabeçalho</Label>
                  <div className="grid grid-cols-4 gap-2">
                    {backgroundColors.map((color) => (
                      <div 
                        key={color.value}
                        className={`h-10 rounded-md cursor-pointer ${
                          config.headerBgColor === color.value ? "ring-2 ring-primary" : ""
                        } ${color.bg} ${color.border || ""}`}
                        onClick={() => updateConfig('headerBgColor', color.value)}
                      />
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <Label>Fundo do Rodapé</Label>
                  <div className="grid grid-cols-4 gap-2">
                    {backgroundColors.map((color) => (
                      <div 
                        key={color.value}
                        className={`h-10 rounded-md cursor-pointer ${
                          config.footerBgColor === color.value ? "ring-2 ring-primary" : ""
                        } ${color.bg} ${color.border || ""}`}
                        onClick={() => updateConfig('footerBgColor', color.value)}
                      />
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </SheetContent>
        </Sheet>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Button
          variant={config.format === "story" ? "default" : "outline"}
          className="flex flex-col items-center py-6"
          onClick={() => updateConfig("format", "story")}
        >
          <Smartphone className="h-8 w-8 mb-2" />
          <span>Story</span>
          <span className="text-xs opacity-80">9:16</span>
        </Button>
        <Button
          variant={config.format === "feed" ? "default" : "outline"}
          className="flex flex-col items-center py-6"
          onClick={() => updateConfig("format", "feed")}
        >
          <Tablet className="h-8 w-8 mb-2" />
          <span>Feed</span>
          <span className="text-xs opacity-80">4:5</span>
        </Button>
        <Button
          variant={config.format === "tv" ? "default" : "outline"}
          className="flex flex-col items-center py-6"
          onClick={() => updateConfig("format", "tv")}
        >
          <Tv className="h-8 w-8 mb-2" />
          <span>TV</span>
          <span className="text-xs opacity-80">16:9</span>
        </Button>
      </div>

      <div className="space-y-4">
        <Label>Tamanho da Fonte do Preço</Label>
        <Slider
          defaultValue={[3]}
          min={1}
          max={6}
          step={1}
          value={[fontSizes.price.findIndex(size => size.value === config.priceFontSize) + 1]}
          onValueChange={(value) => {
            const index = value[0] - 1;
            if (index >= 0 && index < fontSizes.price.length) {
              updateConfig('priceFontSize', fontSizes.price[index].value);
            }
          }}
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Pequeno</span>
          <span>Médio</span>
          <span>Grande</span>
          <span>Enorme</span>
        </div>
      </div>

      <div className="space-y-4">
        <Label>Família da Fonte</Label>
        <Select
          value={config.fontFamily}
          onValueChange={(value) => updateConfig('fontFamily', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione uma fonte" />
          </SelectTrigger>
          <SelectContent>
            {fontFamilies.map((font) => (
              <SelectItem 
                key={font.value} 
                value={font.value} 
                className={font.value}
              >
                {font.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
