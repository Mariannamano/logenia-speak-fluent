
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MicIcon, BarChart2Icon, UserIcon, BookOpenIcon } from "lucide-react";
import { useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  
  return (
    <header className="border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-10">
      <div className="container flex items-center justify-between py-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-gradient-to-r from-logenia-500 to-accent rounded-full p-1.5">
            <MicIcon className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-logenia-600 to-accent bg-clip-text text-transparent">
            Logenia AI
          </span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-6">
          <NavLink to="/" current={location.pathname === "/"}>
            Home
          </NavLink>
          <NavLink to="/practice" current={location.pathname === "/practice"}>
            Practice
          </NavLink>
          <NavLink to="/progress" current={location.pathname === "/progress"}>
            Progress
          </NavLink>
          <NavLink to="/resources" current={location.pathname === "/resources"}>
            Resources
          </NavLink>
        </nav>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="hidden md:flex">
            <UserIcon className="h-4 w-4 mr-2" /> Account
          </Button>
          <Button size="sm" className="bg-logenia-500 hover:bg-logenia-600">
            Start Practice
          </Button>
        </div>
      </div>
    </header>
  );
};

interface NavLinkProps {
  children: React.ReactNode;
  to: string;
  current: boolean;
}

const NavLink = ({ children, to, current }: NavLinkProps) => {
  return (
    <Link
      to={to}
      className={`text-sm font-medium transition-colors hover:text-logenia-600 ${
        current ? "text-logenia-600" : "text-muted-foreground"
      }`}
    >
      {children}
    </Link>
  );
};

export default Header;
