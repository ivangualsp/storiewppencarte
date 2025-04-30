import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useAuth } from "@/contexts/AuthContext";
import { Settings } from "lucide-react";
import { CircleUserRound, Home, Image, Layout, LogOut } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export function AppSidebar() {
  const { isAdmin } = useAuth();
  const location = useLocation();
  const currentPath = location.pathname;

  const mainMenuItems = [
    {
      title: "Dashboard",
      icon: Home,
      path: "/dashboard",
    },
    {
      title: "Criar Promo",
      icon: Layout,
      path: "/create",
    },
    {
      title: "Meus Designs",
      icon: Image,
      path: "/designs",
    },
  ];

  const userMenuItems = [
    {
      title: "Minha Conta",
      icon: CircleUserRound,
      path: "/profile",
    },
    {
      title: "Sair",
      icon: LogOut,
      path: "/logout",
    },
  ];

  const isActive = (path: string) => currentPath === path;

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-md bg-white flex items-center justify-center">
            <span className="text-sidebar-background font-bold text-xl">P</span>
          </div>
          <h1 className="text-white text-xl font-bold">PromoMaker</h1>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActive(item.path)}>
                    <Link to={item.path}>
                      <item.icon size={20} />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {isAdmin && (
          <SidebarGroup>
            <SidebarGroupLabel>Admin</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={currentPath === "/admin/planos"}>
                    <Link to="/admin/planos">
                      <Settings size={20} />
                      <span>Planos</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        <SidebarGroup className="mt-auto">
          <SidebarGroupLabel>Usuário</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {userMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActive(item.path)}>
                    <Link to={item.path}>
                      <item.icon size={20} />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <div className="text-white/70 text-xs text-center">
          PromoMaker &copy; 2023
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
