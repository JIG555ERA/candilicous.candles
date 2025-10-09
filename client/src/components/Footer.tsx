import { Facebook, Instagram, Mail } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useState } from 'react';
import { toast } from 'sonner';

export function Footer() {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success('Thank you for subscribing! 🕯️');
      setEmail('');
    }
  };

  return (
    <footer className="border-t bg-card">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="font-['Playfair_Display']">Stay Connected</h3>
            <p className="text-sm text-muted-foreground">
              Subscribe to our newsletter for exclusive offers and candle care tips.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <Input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1"
                required
              />
              <Button type="submit" className="candle-glow">
                Subscribe
              </Button>
            </form>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-['Playfair_Display']">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Shipping Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Return & Exchange
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Social & Contact */}
          <div className="space-y-4">
            <h3 className="font-['Playfair_Display']">Follow Us</h3>
            <p className="text-sm text-muted-foreground">
              Join our community and get inspired by candlelit moments.
            </p>
            <div className="flex gap-3">
              <Button variant="outline" size="icon" className="rounded-full hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all">
                <Mail className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>© 2025 Candilicious Candles. All rights reserved.</p>
          <p className="mt-1">Handcrafted with love and natural wax 🕯️</p>
        </div>
      </div>
    </footer>
  );
}
