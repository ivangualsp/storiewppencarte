
import { supabase } from "@/integrations/supabase/client";
import { StoryTemplate } from "@/components/promo/StoryCard";
import { toast } from "sonner";

export interface Design {
  id: string;
  user_id: string;
  template_id: string;
  product_name: string;
  price: number;
  original_price?: number;
  image_url?: string;
  created_at: string;
  updated_at: string;
}

export interface DesignInput {
  product_name: string;
  price: number;
  original_price?: number;
  image_url?: string;
  template_id: string;
}

export async function saveDesign(design: DesignInput): Promise<string | null> {
  try {
    const { data, error } = await supabase
      .from('designs')
      .insert([design])
      .select('id')
      .single();

    if (error) {
      console.error("Error saving design:", error);
      toast.error("Erro ao salvar design: " + error.message);
      return null;
    }
    
    toast.success("Design salvo com sucesso!");
    return data.id;
  } catch (error) {
    console.error("Error in saveDesign:", error);
    toast.error("Erro ao salvar design.");
    return null;
  }
}

export async function getUserDesigns(): Promise<Design[]> {
  try {
    const { data, error } = await supabase
      .from('designs')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error("Error fetching designs:", error);
      toast.error("Erro ao carregar designs: " + error.message);
      return [];
    }
    
    return data || [];
  } catch (error) {
    console.error("Error in getUserDesigns:", error);
    toast.error("Erro ao carregar designs.");
    return [];
  }
}

export async function getTemplates(): Promise<StoryTemplate[]> {
  try {
    const { data, error } = await supabase
      .from('templates')
      .select('*');

    if (error) {
      console.error("Error fetching templates:", error);
      toast.error("Erro ao carregar templates: " + error.message);
      return [];
    }
    
    return data.map(template => ({
      id: template.id,
      name: template.name,
      gradientClass: template.gradient_class
    })) || [];
  } catch (error) {
    console.error("Error in getTemplates:", error);
    toast.error("Erro ao carregar templates.");
    return [];
  }
}

export async function deleteDesign(designId: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('designs')
      .delete()
      .eq('id', designId);

    if (error) {
      console.error("Error deleting design:", error);
      toast.error("Erro ao excluir design: " + error.message);
      return false;
    }
    
    toast.success("Design excluído com sucesso!");
    return true;
  } catch (error) {
    console.error("Error in deleteDesign:", error);
    toast.error("Erro ao excluir design.");
    return false;
  }
}
