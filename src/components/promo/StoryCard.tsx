
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
        "story-card max-w-xs w-full mx-auto rounded-3xl overflow-hidden shadow-xl",
        className
      )}
    >
      <div
        className={cn(
          "relative w-full h-full flex flex-col",
          template.gradientClass
        )}
      >
        <div className="p-6 text-white text-center mb-auto">
          <h2 className="text-2xl font-bold uppercase tracking-wider mb-2">
            OFERTA
          </h2>
          <div className="h-1 w-20 bg-white/50 mx-auto mb-2"></div>
          <p className="text-white/90 uppercase text-sm">IMPERDÍVEL</p>
        </div>

        <div className="flex-1 flex items-center justify-center p-4">
          {imageUrl && !imageError ? (
            <div className="w-full h-48 overflow-hidden flex items-center justify-center">
              <img
                src={imageUrl}
                alt={name}
                className="object-contain w-full h-full"
                onError={() => setImageError(true)}
              />
            </div>
          ) : (
            <div className="w-full h-48 bg-white/10 rounded-xl flex items-center justify-center">
              <p className="text-white/70">Imagem do produto</p>
            </div>
          )}
        </div>

        <div className="p-6 bg-black/25 text-white text-center">
          <h3 className="font-bold text-xl mb-3 line-clamp-2">{name}</h3>
          
          <div className="flex flex-col items-center justify-center">
            {hasDiscount && (
              <div className="mb-1 flex items-center gap-2">
                <span className="text-sm line-through text-white/70">
                  R$ {originalPrice.toFixed(2)}
                </span>
                <span className="bg-white text-red-600 text-xs font-bold px-2 py-0.5 rounded-full">
                  -{discountPercentage}%
                </span>
              </div>
            )}
            
            <div className="flex items-baseline justify-center">
              <span className="text-sm mr-1">R$</span>
              <span className="text-4xl font-bold">{price.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
