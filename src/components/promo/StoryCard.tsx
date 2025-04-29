
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useState } from "react";

export type StoryTemplate = {
  id: string;
  name: string;
  gradientClass: string;
};

export type StoryFormat = 'story' | 'feed' | 'tv';

export type PromoConfig = {
  format: StoryFormat;
  headerBgColor?: string;
  footerBgColor?: string;
  headerTextColor?: string;
  productTextColor?: string;
  priceTextColor?: string;
  headerFontSize?: string;
  productFontSize?: string;
  priceFontSize?: string;
  fontFamily?: string;
};

type StoryCardProps = {
  product: {
    name: string;
    price: number;
    originalPrice?: number;
    imageUrl?: string;
  };
  template: StoryTemplate;
  config?: PromoConfig;
  className?: string;
};

export const defaultPromoConfig: PromoConfig = {
  format: 'story',
  headerBgColor: 'transparent',
  footerBgColor: 'bg-black/25',
  headerTextColor: 'text-white',
  productTextColor: 'text-white',
  priceTextColor: 'text-white',
  headerFontSize: 'text-3xl',
  productFontSize: 'text-2xl',
  priceFontSize: 'text-5xl',
  fontFamily: 'font-sans',
};

export const StoryCard = ({
  product,
  template,
  config = defaultPromoConfig,
  className,
}: StoryCardProps) => {
  const { name, price, originalPrice, imageUrl } = product;
  const hasDiscount = originalPrice && originalPrice > price;
  const discountPercentage = hasDiscount
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  const [imageError, setImageError] = useState(false);

  // Definir classes com base na configuração
  const formatClass = `aspect-${config.format}`;

  return (
    <div
      className={cn(
        "w-full mx-auto overflow-hidden shadow-xl",
        formatClass,
        config.fontFamily,
        className
      )}
      style={{ 
        maxWidth: "100%"
      }}
    >
      <div
        className={cn(
          "relative w-full h-full flex flex-col",
          template.gradientClass
        )}
      >
        {/* Cabeçalho */}
        <div className={cn("p-6 text-center", config.headerBgColor)}>
          <h2 className={cn("font-bold uppercase tracking-wider mb-2", config.headerFontSize, config.headerTextColor)}>
            OFERTA
          </h2>
          <div className="h-1 w-24 bg-white/50 mx-auto mb-2"></div>
          <p className={cn("uppercase", config.headerTextColor, "opacity-90")}>IMPERDÍVEL</p>
        </div>

        {/* Área da Imagem */}
        <div className="flex-1 flex items-center justify-center p-6">
          {imageUrl && !imageError ? (
            <div className="w-full max-w-[80%] h-auto aspect-square flex items-center justify-center bg-white/90 p-4 rounded-lg">
              <img
                src={imageUrl}
                alt={name}
                className="object-contain max-h-full max-w-full"
                onError={() => setImageError(true)}
              />
            </div>
          ) : (
            <div className="w-full max-w-[80%] h-auto aspect-square bg-white/90 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">Imagem do produto</p>
            </div>
          )}
        </div>

        {/* Área de Preço e Nome */}
        <div className={cn("p-8 text-center", config.footerBgColor)}>
          <h3 className={cn("font-bold mb-4 px-4", config.productFontSize, config.productTextColor)}>
            {name}
          </h3>
          
          <div className="flex flex-col items-center justify-center mb-2">
            {hasDiscount && (
              <div className="mb-2 flex items-center gap-2">
                <span className={cn("text-lg line-through opacity-70", config.priceTextColor)}>
                  R$ {originalPrice.toFixed(2)}
                </span>
                <span className="bg-white text-red-600 text-sm font-bold px-3 py-1 rounded-full">
                  -{discountPercentage}%
                </span>
              </div>
            )}
            
            <div className="flex items-baseline justify-center">
              <span className={cn("text-xl mr-1", config.priceTextColor)}>R$</span>
              <span className={cn("font-bold", config.priceFontSize, config.priceTextColor)}>
                {price.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
