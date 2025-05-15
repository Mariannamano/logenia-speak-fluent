
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-fluent-50 dark:bg-fluent-900/30 border-t">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <span className="bg-fluent-primary text-white w-8 h-8 rounded-md flex items-center justify-center font-bold">FL</span>
              <span className="font-semibold text-lg">Fluent Lounge</span>
            </Link>
            <p className="text-muted-foreground mb-4 max-w-md">
              A cozy language learning platform that helps curious learners practice speaking fluently in a safe, warm environment.
            </p>
            <div className="flex gap-4">
              <Link to="#" className="text-muted-foreground hover:text-fluent-primary transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 5.16c-.69.22-1.43.37-2.22.44.8-.48 1.41-1.24 1.7-2.14-.75.44-1.58.76-2.46.94-.7-.75-1.7-1.22-2.82-1.22-2.13 0-3.86 1.73-3.86 3.86 0 .3.03.6.1.89-3.2-.16-6.04-1.7-7.93-4.03-.33.57-.52 1.24-.52 1.95 0 1.34.68 2.52 1.72 3.21-.64-.02-1.23-.2-1.74-.49v.05c0 1.87 1.33 3.43 3.1 3.78-.33.09-.67.14-1.03.14-.25 0-.5-.02-.74-.07.5 1.53 1.93 2.65 3.64 2.68-1.33 1.04-3.01 1.66-4.84 1.66-.31 0-.62-.02-.93-.05 1.73 1.11 3.78 1.76 5.98 1.76 7.17 0 11.1-5.94 11.1-11.1 0-.17 0-.34-.01-.51.76-.55 1.42-1.23 1.94-2.01z"></path>
                </svg>
              </Link>
              <Link to="#" className="text-muted-foreground hover:text-fluent-primary transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2c-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48 10-10-4.48-10-10-10zm-1 15h-2v-6h2v6zm-1-7.5c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm8 7.5h-2v-2.8c0-.96-.39-1.2-.79-1.2-.39 0-.79.24-.79 1.2v2.8h-2v-6h2v.9c.26-.46.99-.9 1.61-.9 1.73 0 1.97 1.12 1.97 2.57v3.43z"></path>
                </svg>
              </Link>
              <Link to="#" className="text-muted-foreground hover:text-fluent-primary transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2c5.52 0 10 4.48 10 10s-4.48 10-10 10-10-4.48-10-10 4.48-10 10-10zm0 18c4.41 0 8-3.59 8-8s-3.59-8-8-8-8 3.59-8 8 3.59 8 8 8zm-3-9h2v-4h2v4h2l-3 3-3-3z"></path>
                </svg>
              </Link>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-3">Platform</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/practice" className="text-muted-foreground hover:text-fluent-primary transition-colors">
                  Practice Rooms
                </Link>
              </li>
              <li>
                <Link to="/progress" className="text-muted-foreground hover:text-fluent-primary transition-colors">
                  Progress Shelf
                </Link>
              </li>
              <li>
                <Link to="/resources" className="text-muted-foreground hover:text-fluent-primary transition-colors">
                  Resources
                </Link>
              </li>
              <li>
                <Link to="#" className="text-muted-foreground hover:text-fluent-primary transition-colors">
                  Character Guide
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-3">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link to="#" className="text-muted-foreground hover:text-fluent-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="#" className="text-muted-foreground hover:text-fluent-primary transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="#" className="text-muted-foreground hover:text-fluent-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="#" className="text-muted-foreground hover:text-fluent-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Fluent Lounge. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
