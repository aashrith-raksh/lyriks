import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import { ModeToggle } from "@/components/ModeToggle";

const RootLayout = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="h-screen flex-1">
        <div className="flex justify-between items-center mt-2">
          <SidebarTrigger className="rounded-tl-none rounded-bl-none bg-accent" />
          <ModeToggle />
        </div>
        <Outlet />
      </main>
    </SidebarProvider>
  );
};

export default RootLayout;
