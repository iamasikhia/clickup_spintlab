import { AppSidebar } from "@/components/app-sidebar";
import { Header } from "@/components/header";
import { Separator } from "@/components/ui/separator";
import { SidebarProvider } from "@/components/ui/sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex flex-1 flex-col">
        <Header page="Dashboard" username="test-user123" />
        <Separator className="mb-8" />
        <main>{children}</main>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
