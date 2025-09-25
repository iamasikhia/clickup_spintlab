import {
  LucideChartColumn,
  LucideCircleUser,
  LucideClock,
  LucideReceiptText,
  LucideSend,
  LucideSettings,
  LucideUser,
} from "lucide-react";
import { Button } from "./ui/button";
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
            <div className="p-4 flex flex-col gap-y-3 bg-gray-200 rounded-xl">
              <div className="flex gap-x-3 items-center">
                <LucideCircleUser className="h-10 w-10" />
                <div className="flex flex-col">
                  <div className="text-base font-semibold">test-user123</div>
                  <div className="text-sm text-gray-600">test consulting</div>
                </div>
              </div>
              <Button variant="outline" className="gax-x-4">
                <LucideUser />
                <span>Profile</span>
              </Button>
            </div>
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
