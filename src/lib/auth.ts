
import { supabase } from "@/integrations/supabase/client";
import { Session } from "@supabase/supabase-js";
import { toast } from "sonner";

export async function signInWithEmailAndPassword(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast.error(error.message);
      return null;
    }

    return data.session;
  } catch (error) {
    console.error("Authentication error:", error);
    toast.error("Erro ao fazer login. Tente novamente mais tarde.");
    return null;
  }
}

export async function signUpWithEmailAndPassword(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      toast.error(error.message);
      return null;
    }

    toast.success("Conta criada com sucesso! Verifique seu e-mail para confirmar.");
    return data.session;
  } catch (error) {
    console.error("Registration error:", error);
    toast.error("Erro ao criar conta. Tente novamente mais tarde.");
    return null;
  }
}

export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      toast.error(error.message);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error("Sign out error:", error);
    return false;
  }
}

export async function getCurrentSession(): Promise<Session | null> {
  try {
    const { data } = await supabase.auth.getSession();
    return data.session;
  } catch (error) {
    console.error("Get session error:", error);
    return null;
  }
}

export async function getUserId(): Promise<string | null> {
  const session = await getCurrentSession();
  return session?.user?.id || null;
}
