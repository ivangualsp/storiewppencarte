
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useState } from "react";

export type StoryTemplate = {
  id: string;
  name: string;
  gradientClass: string;
};

type StoryCardProps = {
  product: {
    name: string;
    price: number;
    originalPrice?: number;
    imageUrl?: string;
  };
  template: StoryTemplate;
  className?: string;
};

export const StoryCard = ({
  product,
  template,
  className,
}: StoryCardProps) => {
  const { name, price, originalPrice, imageUrl } = product;
  const hasDiscount = originalPrice && originalPrice > price;
  const discountPercentage = hasDiscount
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  const [imageError, setImageError] = useState(false);

  return (
    <div
      className={cn(
        "story-card w-full mx-auto overflow-hidden shadow-xl",
        className
      )}
      style={{ 
        width: "100%", 
        aspectRatio: "9/16",
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
        <div className="p-6 text-white text-center">
          <h2 className="text-3xl font-bold uppercase tracking-wider mb-2">
            OFERTA
          </h2>
          <div className="h-1 w-24 bg-white/50 mx-auto mb-2"></div>
          <p className="text-white/90 uppercase text-lg">IMPERDÍVEL</p>
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
        <div className="p-8 bg-black/25 text-white text-center">
          <h3 className="font-bold text-2xl mb-4 px-4">{name}</h3>
          
          <div className="flex flex-col items-center justify-center mb-2">
            {hasDiscount && (
              <div className="mb-2 flex items-center gap-2">
                <span className="text-lg line-through text-white/70">
                  R$ {originalPrice.toFixed(2)}
                </span>
                <span className="bg-white text-red-600 text-sm font-bold px-3 py-1 rounded-full">
                  -{discountPercentage}%
                </span>
              </div>
            )}
            
            <div className="flex items-baseline justify-center">
              <span className="text-xl mr-1">R$</span>
              <span className="text-5xl font-bold">{price.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
