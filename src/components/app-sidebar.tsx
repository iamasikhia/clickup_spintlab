import {
  LucideChartColumn,
  LucideClock,
  LucideReceiptText,
  LucideSend,
  LucideSettings,
} from "lucide-react";
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
      url: "/dashboard",
      icon: LucideChartColumn,
    },
    {
      title: "Task Manager",
      url: "/task-manager",
      icon: LucideSettings,
    },
    {
      title: "Time Tracker",
      url: "/time-tracker",
      icon: LucideClock,
    },
    {
      title: "Invoice Generator",
      url: "/invoice-generator",
      icon: LucideReceiptText,
    },
    {
      title: "Export and Share",
      url: "/export",
      icon: LucideSend,
    },
  ];

  return (
    <Sidebar className="p-4">
      <div className="">
        <SidebarHeader className="font-semibold mb-4">
          Smart Invoice
        </SidebarHeader>
        <SidebarContent>
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
      </div>
    </Sidebar>
  );
};

export { AppSidebar };
