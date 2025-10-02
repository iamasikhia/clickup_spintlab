import {
  LucideChartColumn,
  LucideClock,
  LucideReceiptText,
  LucideSend,
  LucideSettings,
} from "lucide-react";
import { SidebarProfile } from "./sidebar-profile";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";

const AppSidebar = () => {
  const items = [
    {
      title: "Dashboard",
      url: "#",
      icon: LucideChartColumn,
    },
    {
      title: "Task Manager",
      url: "#",
      icon: LucideSettings,
    },
    {
      title: "Time Tracker",
      url: "#",
      icon: LucideClock,
    },
    {
      title: "Invoice Generator",
      url: "#",
      icon: LucideReceiptText,
    },
    {
      title: "Export and Share",
      url: "#",
      icon: LucideSend,
    },
  ];

  return (
    <Sidebar className="p-4">
      <SidebarHeader className="font-semibold mb-4">
        Smart Invoice
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarProfile />
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-y-2">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className="font-semibold text-md gap-x-4"
                  >
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export { AppSidebar };
