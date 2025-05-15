
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="mt-auto border-t border-border py-6 bg-background">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col items-center md:items-start">
            <p className="text-sm text-muted-foreground">
              © 2025 Logenia AI. All rights reserved.
            </p>
            <div className="flex gap-4 mt-2">
              <Link to="/privacy" className="text-xs text-muted-foreground hover:text-logenia-600">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-xs text-muted-foreground hover:text-logenia-600">
                Terms of Service
              </Link>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="text-xs">
              Feedback
            </Button>
            <Button size="sm" className="text-xs bg-logenia-500 hover:bg-logenia-600">
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
