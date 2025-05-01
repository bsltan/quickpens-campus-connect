import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useMode } from '@/contexts/ModeContext';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';
import { Sun, Moon, User, Home } from 'lucide-react';

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const { user, signOut } = useAuth();
  const { mode, setMode } = useMode();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  if (!user) {
    return <div className="h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center gap-4">
              <Link to="/" className="text-xl font-bold text-quickpens-navy hover:text-quickpens-navy/90">
                QuickPens
              </Link>
              <nav className="flex items-center gap-4">
                <Link to="/dashboard">
                  <Button 
                    variant={location.pathname === '/dashboard' ? 'default' : 'ghost'}
                    className="flex items-center gap-2"
                  >
                    <Home className="w-4 h-4" />
                    Dashboard
                  </Button>
                </Link>
                <Link to="/profile">
                  <Button 
                    variant={location.pathname === '/profile' ? 'default' : 'ghost'}
                    className="flex items-center gap-2"
                  >
                    <User className="w-4 h-4" />
                    Profile
                  </Button>
                </Link>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Button
                  variant={mode === 'writer' ? 'default' : 'outline'}
                  onClick={() => setMode('writer')}
                >
                  Writer Mode
                </Button>
                <Button
                  variant={mode === 'buyer' ? 'default' : 'outline'}
                  onClick={() => setMode('buyer')}
                >
                  Buyer Mode
                </Button>
              </div>
              <Button
                variant="outline"
                onClick={signOut}
              >
                Sign Out
              </Button>
              <Button
                variant="outline"
                onClick={toggleTheme}
              >
                {theme === 'light' ? (
                  <Moon className="w-4 h-4" />
                ) : (
                  <Sun className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {children}
        </div>
      </main>
    </div>
  );
}
