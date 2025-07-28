import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Bell, 
  Settings, 
  User, 
  Menu,
  X,
  Building2,
  Camera,
  BarChart3,
  Users,
  MessageSquare,
  Package,
  Home,
  LogOut
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface NavigationProps {
  userRole?: 'owner' | 'contractor';
}

export const Navigation = ({ userRole = 'owner' }: NavigationProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const ownerNavItems = [
    { name: "Dashboard", href: "/dashboard", icon: Building2 },
    { name: "Projects", href: "/create-project", icon: Camera },
    { name: "Team", href: "/team-management", icon: Users },
    { name: "Alerts", href: "/alerts", icon: Bell },
    { name: "Analytics", href: "/analytics", icon: BarChart3 },
    { name: "Upload", href: "/upload-images", icon: MessageSquare }
  ];

  const contractorNavItems = [
    { name: "Dashboard", href: "/contractor-dashboard", icon: Building2 },
    { name: "Projects", href: "/projects", icon: Camera },
    { name: "Materials", href: "/material-requests", icon: Package },
    { name: "Team", href: "/team", icon: Users },
    { name: "Messages", href: "/messages", icon: MessageSquare }
  ];

  const navItems = userRole === 'contractor' ? contractorNavItems : ownerNavItems;

  const isActive = (href: string) => location.pathname === href;

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-border/40 shadow-soft sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate('/')}>
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-primary rounded-lg shadow-medium">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Sky View</h1>
              <p className="text-xs text-muted-foreground">Build Track</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => (
              <Button 
                key={item.name}
                variant={isActive(item.href) ? "default" : "ghost"}
                className={`text-foreground hover:text-primary transition-colors ${
                  isActive(item.href) ? "bg-primary text-primary-foreground" : ""
                }`}
                onClick={() => navigate(item.href)}
              >
                <item.icon className="w-4 h-4 mr-2" />
                {item.name}
              </Button>
            ))}
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-3">
            <Button 
              variant="ghost" 
              size="sm" 
              className="relative hover-lift"
              onClick={() => navigate('/alerts')}
            >
              <Bell className="w-5 h-5" />
              <Badge className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-destructive text-destructive-foreground text-xs flex items-center justify-center p-0">
                3
              </Badge>
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="hover-lift"
              onClick={() => navigate('/messages')}
            >
              <MessageSquare className="w-5 h-5" />
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="hover-lift"
              onClick={() => navigate('/settings')}
            >
              <Settings className="w-5 h-5" />
            </Button>
            
            {user ? (
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="text-xs">
                  {userRole === 'contractor' ? 'Contractor' : 'Owner'}
                </Badge>
                <Button variant="ghost" size="sm" className="hover-lift">
                  <User className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="sm" className="hover-lift" onClick={handleSignOut}>
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <Button variant="outline" size="sm" onClick={() => navigate('/auth')}>
                Sign In
              </Button>
            )}
            
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border/40 bg-white/95 backdrop-blur-md">
            <div className="px-4 py-3 space-y-2">
              {navItems.map((item) => (
                <Button 
                  key={item.name}
                  variant={isActive(item.href) ? "default" : "ghost"}
                  className={`w-full justify-start text-foreground ${
                    isActive(item.href) ? "bg-primary text-primary-foreground" : ""
                  }`}
                  onClick={() => {
                    navigate(item.href);
                    setIsMenuOpen(false);
                  }}
                >
                  <item.icon className="w-4 h-4 mr-2" />
                  {item.name}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};