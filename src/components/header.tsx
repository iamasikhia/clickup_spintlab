import { LucideLogOut } from "lucide-react";
import { ThemeSwitcher } from "./theme/theme-switcher";
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
        <div className="text-sm">Welcome, {username}</div>
        <Button variant="destructive">
          <LucideLogOut />
          <span className="font-semibold">Sign Out</span>
        </Button>
        <ThemeSwitcher />
      </div>
    </nav>
  );
};

export { Header };
