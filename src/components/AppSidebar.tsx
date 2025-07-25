import { links } from "@/assets/constants";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.svg";

function AppSidebar() {
  return (
    <>
      <Sidebar>
        <SidebarHeader />
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent className="text-center flex justify-center">
              <Link to={"/"}>
                <img src={logo} alt="logo" width={100} />
              </Link>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarGroup className="mt-4">
            <SidebarGroupContent>
              <SidebarMenu>
                {links.map((link) => (
                  <SidebarMenuItem key={link.name}>
                    <SidebarMenuButton asChild>
                      <Link to={link.to}>
                        <link.icon />
                        {link.name}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter />
      </Sidebar>
    </>
  );
}

export default AppSidebar;
