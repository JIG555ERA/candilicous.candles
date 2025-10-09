import { Button } from '../components/ui/button';
import { ProductCard } from '../components/ProductCard';
import { ArrowRight, Sparkles, Heart, Leaf } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

const featuredProducts = [
  {
    id: '1',
    name: 'Lavender Dreams',
    scent: 'Lavender, Vanilla & Chamomile',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1707839568431-c2648f6d5184?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBzY2VudGVkJTIwY2FuZGxlfGVufDF8fHx8MTc1OTk0MTQxNXww&ixlib=rb-4.1.0&q=80&w=1080',
    featured: true,
  },
  {
    id: '2',
    name: 'Autumn Spice',
    scent: 'Cinnamon, Clove & Nutmeg',
    price: 26.99,
    image: 'https://images.unsplash.com/photo-1704573982777-770d486a91c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kbWFkZSUyMGNhbmRsZSUyMGFlc3RoZXRpY3xlbnwxfHx8fDE3NjAwMzEyMjJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    featured: true,
  },
  {
    id: '3',
    name: 'Ocean Breeze',
    scent: 'Sea Salt, Jasmine & Driftwood',
    price: 22.99,
    image: 'https://images.unsplash.com/photo-1701987432961-831aa2aa9b34?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW5kbGUlMjBjb2xsZWN0aW9uJTIwaG9tZXxlbnwxfHx8fDE3NjAwMzEyMjN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    featured: true,
  },
];

export function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-secondary/20 to-accent/10">
        <div className="container mx-auto px-4 py-20 md:py-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-block">
                <span className="inline-flex items-center gap-2 rounded-full bg-accent/30 px-4 py-2 text-sm backdrop-blur-sm">
                  <Sparkles className="h-4 w-4" />
                  Premium Handcrafted Candles
                </span>
              </div>
              <h1 className="font-['Playfair_Display'] text-5xl md:text-6xl lg:text-7xl">
                Light up your world with warmth
              </h1>
              <p className="text-lg text-muted-foreground max-w-lg">
                Discover our collection of artisan candles, handcrafted with natural soy wax 
                and premium fragrances to create the perfect ambiance for every moment.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/store">
                  <Button size="lg" className="candle-glow group">
                    Shop Now
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link to="/about">
                  <Button size="lg" variant="outline">
                    Our Story
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-radial from-accent/30 via-transparent to-transparent blur-3xl"></div>
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1608632073385-b205084203c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3p5JTIwY2FuZGxlbGlnaHQlMjBhdG1vc3BoZXJlfGVufDF8fHx8MTc2MDAzMTIyNHww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Cozy candlelight atmosphere"
                className="relative rounded-2xl shadow-2xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl mb-4">
              Featured Collection
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore our most loved candles, carefully crafted to bring warmth and elegance to your space
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/store">
              <Button size="lg" variant="outline" className="group">
                View All Products
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4 p-6 rounded-2xl transition-all hover:bg-background">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Heart className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-['Playfair_Display'] text-xl">Handcrafted with Love</h3>
              <p className="text-muted-foreground">
                Every candle is carefully handmade by artisans who pour their passion into each creation
              </p>
            </div>
            <div className="text-center space-y-4 p-6 rounded-2xl transition-all hover:bg-background">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Leaf className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-['Playfair_Display'] text-xl">100% Natural</h3>
              <p className="text-muted-foreground">
                Made from sustainable soy wax and premium essential oils, free from harmful chemicals
              </p>
            </div>
            <div className="text-center space-y-4 p-6 rounded-2xl transition-all hover:bg-background">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-['Playfair_Display'] text-xl">Long Lasting</h3>
              <p className="text-muted-foreground">
                Our candles burn cleanly for 40-60 hours, filling your space with enchanting fragrances
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl mb-6">
            Ready to Transform Your Space?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of happy customers who have discovered the magic of Candilicious candles
          </p>
          <Link to="/store">
            <Button size="lg" className="candle-glow">
              Start Shopping
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
