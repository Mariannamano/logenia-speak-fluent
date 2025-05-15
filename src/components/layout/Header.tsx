
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

const Header = () => {
  const { theme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="border-b bg-background/80 backdrop-blur-md sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="bg-fluent-primary text-white w-10 h-10 rounded-md flex items-center justify-center">
            <img 
              src="/lovable-uploads/f906f3fc-f516-4696-8a30-12aca44464c8.png" 
              alt="Purple Owl Logo" 
              className="w-8 h-8"
            />
          </span>
          <span className="font-semibold text-lg md:text-xl">Fluent Lounge</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-base">
          <Link to="/" className="text-foreground/80 hover:text-fluent-primary transition-colors">
            Home
          </Link>
          <Link to="/practice" className="text-foreground/80 hover:text-fluent-primary transition-colors">
            Practice Rooms
          </Link>
          <Link to="/progress" className="text-foreground/80 hover:text-fluent-primary transition-colors">
            Progress Shelf
          </Link>
          <Link to="/resources" className="text-foreground/80 hover:text-fluent-primary transition-colors">
            Resources
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="h-[1.2rem] w-[1.2rem]" />
            ) : (
              <Moon className="h-[1.2rem] w-[1.2rem]" />
            )}
          </Button>
          
          <Button
            variant="outline"
            className="hidden md:flex border-fluent-primary text-fluent-primary hover:bg-fluent-50"
          >
            Sign In
          </Button>
          
          <Button className="hidden md:flex bg-fluent-primary hover:bg-fluent-600 text-white">
            Start Learning
          </Button>
          
          {/* Mobile menu button */}
          <Button
            variant="ghost"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </Button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="container mx-auto px-4 py-4 md:hidden flex flex-col gap-3 border-t animate-fade-in">
          <Link 
            to="/" 
            className="px-3 py-2 rounded-md hover:bg-fluent-50 dark:hover:bg-fluent-900/30"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link 
            to="/practice" 
            className="px-3 py-2 rounded-md hover:bg-fluent-50 dark:hover:bg-fluent-900/30"
            onClick={() => setIsMenuOpen(false)}
          >
            Practice Rooms
          </Link>
          <Link 
            to="/progress" 
            className="px-3 py-2 rounded-md hover:bg-fluent-50 dark:hover:bg-fluent-900/30"
            onClick={() => setIsMenuOpen(false)}
          >
            Progress Shelf
          </Link>
          <Link 
            to="/resources" 
            className="px-3 py-2 rounded-md hover:bg-fluent-50 dark:hover:bg-fluent-900/30"
            onClick={() => setIsMenuOpen(false)}
          >
            Resources
          </Link>
          <div className="flex flex-col gap-2 mt-3 pt-3 border-t">
            <Button variant="outline" className="w-full justify-center border-fluent-primary text-fluent-primary">
              Sign In
            </Button>
            <Button className="w-full justify-center bg-fluent-primary hover:bg-fluent-600 text-white">
              Start Learning
            </Button>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
