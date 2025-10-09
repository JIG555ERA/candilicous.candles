import { ShoppingCart } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter } from './ui/card';
import { Badge } from './ui/badge';
import { toast } from 'sonner';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useCart } from '../contexts/CartContext';

interface ProductCardProps {
  id: string;
  name: string;
  scent: string;
  price: number;
  image: string;
  featured?: boolean;
}

export function ProductCard({ id, name, scent, price, image, featured }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({ id, name, scent, price, image });
    toast.success(`${name} added to cart! 🕯️`);
  };

  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-1">
      <div className="relative aspect-square overflow-hidden bg-muted">
        <ImageWithFallback
          src={image}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {featured && (
          <Badge className="absolute top-3 right-3 bg-accent text-accent-foreground candle-glow">
            Featured
          </Badge>
        )}
      </div>
      <CardContent className="p-4">
        <h3 className="font-['Playfair_Display'] mb-1">{name}</h3>
        <p className="text-sm text-muted-foreground mb-3">{scent}</p>
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold text-primary">${price.toFixed(2)}</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button 
          onClick={handleAddToCart}
          className="w-full candle-glow"
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
