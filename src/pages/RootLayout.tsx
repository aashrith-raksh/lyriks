import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";

const RootLayout = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="h-screen flex-1">
        <SidebarTrigger className="rounded-tl-none rounded-bl-none bg-accent" />
        <Outlet />
      </main>
    </SidebarProvider>
  );
};

export default RootLayout;
