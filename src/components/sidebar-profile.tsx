import { LucideCircleUser, LucideUser } from "lucide-react";
import { Button } from "./ui/button";

const SidebarProfile = () => {
  return (
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
  );
};

export { SidebarProfile };
