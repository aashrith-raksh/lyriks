import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import { ModeToggle } from "@/components/ModeToggle";

const RootLayout = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="h-screen flex-1 flex flex-col gap-2">
        <div className="flex justify-between items-center mt-2">
          <SidebarTrigger className="rounded-tl-none rounded-bl-none bg-accent" />
          <span className="mr-2">
            <ModeToggle />
          </span>
        </div>

        <span className="flex-1 bg-muted-foreground/10 rounded-md">
          <Outlet />
        </span>
      </main>
    </SidebarProvider>
  );
};

export default RootLayout;
