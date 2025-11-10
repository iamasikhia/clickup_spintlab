import { LucideLogOut } from "lucide-react";
import { Button } from "./ui/button";

type HeaderProps = {
  page: string;
  username: string;
};

const Header = ({ page, username }: HeaderProps) => {
  return (
    <nav className="w-full p-4 flex justify-between items-center">
      <div className="text-lg font-semibold">{page}</div>
      <div className="flex gap-x-4 items-center">
        <div className="text-sm text-gray-600">Welcome, {username}</div>
        <Button variant="destructive">
          <LucideLogOut />
          <span className="font-semibold">Sign Out</span>
        </Button>
      </div>
    </nav>
  );
};

export { Header };
