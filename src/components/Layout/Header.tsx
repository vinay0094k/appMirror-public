
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Bell, Settings, User } from "lucide-react";

import { Button } from "@/components/ui/button";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="border-b border-card-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Header Main Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/appMirror_v3.svg"
            alt="appMirror"
            className="h-16 md:h-20 lg:h-20 w-auto" 
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/dashboard" className="text-muted-foreground hover:text-primary transition-colors">
            Dashboard
          </Link>
          <Link to="/devices" className="text-muted-foreground hover:text-primary transition-colors">
            Devices
          </Link>
          <Link to="/builds" className="text-muted-foreground hover:text-primary transition-colors">
            Builds
          </Link>
          <Link to="/sessions" className="text-muted-foreground hover:text-primary transition-colors">
            Sessions
          </Link>
          <Link to="/analytics" className="text-muted-foreground hover:text-primary transition-colors">
            Analytics
          </Link>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <Button variant="ghost" size="sm">
            <Bell className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Settings className="w-4 h-4" />
          </Button>
          <Link to="/auth">
            <Button variant="outline" size="sm">
              <User className="w-4 h-4 mr-2" />
              Sign In
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="sm"
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-card-border bg-card/95 backdrop-blur-sm">
          <nav className="flex flex-col p-4 gap-4">
            <Link to="/dashboard" className="block text-muted-foreground hover:text-primary transition-colors">
              Dashboard
            </Link>
            <Link to="/devices" className="block text-muted-foreground hover:text-primary transition-colors">
              Devices
            </Link>
            <Link to="/builds" className="block text-muted-foreground hover:text-primary transition-colors">
              Builds
            </Link>
            <Link to="/sessions" className="block text-muted-foreground hover:text-primary transition-colors">
              Sessions
            </Link>
            <Link to="/analytics" className="block text-muted-foreground hover:text-primary transition-colors">
              Analytics
            </Link>
          </nav>
          <div className="p-4 border-t border-card-border">
            <Link to="/auth" className="block w-full">
              <Button variant="outline" size="sm" className="w-full justify-center">
                <User className="w-4 h-4 mr-2" />
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
