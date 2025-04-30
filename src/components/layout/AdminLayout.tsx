import { SidebarProvider } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/layout/AdminSidebar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => (
  <SidebarProvider>
    <div className="min-h-screen flex w-full bg-background">
      <AdminSidebar />
      <main className="flex-1 p-4 sm:p-6">
        <Outlet />
      </main>
    </div>
  </SidebarProvider>
);

export default AdminLayout; 