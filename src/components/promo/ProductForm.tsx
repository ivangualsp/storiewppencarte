
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

type ProductFormProps = {
  onFormChange: (productData: {
    name: string;
    price: number;
    originalPrice?: number;
    imageUrl?: string;
  }) => void;
  productData: {
    name: string;
    price: number;
    originalPrice?: number;
    imageUrl?: string;
  };
};

export const ProductForm = ({
  onFormChange,
  productData,
}: ProductFormProps) => {
  const [hasDiscount, setHasDiscount] = useState(
    !!productData.originalPrice && productData.originalPrice > productData.price
  );

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFormChange({
      ...productData,
      name: e.target.value,
    });
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFormChange({
      ...productData,
      price: parseFloat(e.target.value) || 0,
    });
  };

  const handleOriginalPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFormChange({
      ...productData,
      originalPrice: parseFloat(e.target.value) || 0,
    });
  };

  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFormChange({
      ...productData,
      imageUrl: e.target.value,
    });
  };

  const handleDiscountToggle = (checked: boolean) => {
    setHasDiscount(checked);
    if (!checked) {
      onFormChange({
        ...productData,
        originalPrice: undefined,
      });
    } else {
      onFormChange({
        ...productData,
        originalPrice: productData.price * 1.2, // Default 20% higher
      });
    }
  };

  return (
    <Card>
      <CardContent className="space-y-4 pt-6">
        <div className="space-y-2">
          <Label htmlFor="product-name">Nome do produto</Label>
          <Input
            id="product-name"
            placeholder="Ex: Carne Bovina Premium"
            value={productData.name}
            onChange={handleNameChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="product-price">Preço (R$)</Label>
          <Input
            id="product-price"
            type="number"
            step="0.01"
            min="0"
            placeholder="0.00"
            value={productData.price || ""}
            onChange={handlePriceChange}
          />
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="has-discount"
            checked={hasDiscount}
            onCheckedChange={handleDiscountToggle}
          />
          <Label htmlFor="has-discount">Adicionar preço original</Label>
        </div>

        {hasDiscount && (
          <div className="space-y-2">
            <Label htmlFor="original-price">Preço original (R$)</Label>
            <Input
              id="original-price"
              type="number"
              step="0.01"
              min={productData.price}
              placeholder="0.00"
              value={productData.originalPrice || ""}
              onChange={handleOriginalPriceChange}
            />
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="image-url">URL da imagem (opcional)</Label>
          <Input
            id="image-url"
            placeholder="https://exemplo.com/imagem.jpg"
            value={productData.imageUrl || ""}
            onChange={handleImageUrlChange}
          />
        </div>
      </CardContent>
    </Card>
  );
};
