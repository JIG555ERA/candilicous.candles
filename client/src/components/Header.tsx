import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Flame, Sun, Moon } from 'lucide-react';
import { Button } from './ui/button';
import { useState, useEffect } from 'react';
import { useCart } from '../contexts/CartContext';

export function Header() {
  const location = useLocation();
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const { getCartCount } = useCart();
  const cartCount = getCartCount();

  useEffect(() => {
    // Load theme from localStorage
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Store', path: '/store' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'Orders', path: '/orders' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
            <Flame className="h-6 w-6 text-primary-foreground candle-flicker" />
          </div>
          <div className="flex flex-col">
            <span className="font-['Playfair_Display'] text-lg font-semibold leading-none">
              Candilicious
            </span>
            <span className="text-xs text-muted-foreground">Handcrafted Candles</span>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`transition-colors hover:text-primary ${
                location.pathname === link.path
                  ? 'text-primary font-medium'
                  : 'text-foreground'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right side actions */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </Button>

          {/* Cart */}
          <Link to="/payment">
            <Button variant="ghost" size="icon" className="relative rounded-full">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                  {cartCount}
                </span>
              )}
            </Button>
          </Link>
        </div>
      </div>

      {/* Mobile Navigation */}
      <nav className="flex md:hidden items-center justify-around border-t py-2 px-4">
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`text-sm transition-colors hover:text-primary ${
              location.pathname === link.path
                ? 'text-primary font-medium'
                : 'text-foreground'
            }`}
          >
            {link.name}
          </Link>
        ))}
      </nav>
    </header>
  );
}
