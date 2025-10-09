import { ProductCard } from '../components/ProductCard';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Input } from '../components/ui/input';
import { Search } from 'lucide-react';
import { useState } from 'react';

const allProducts = [
  {
    id: '1',
    name: 'Lavender Dreams',
    scent: 'Lavender, Vanilla & Chamomile',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1707839568431-c2648f6d5184?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBzY2VudGVkJTIwY2FuZGxlfGVufDF8fHx8MTc1OTk0MTQxNXww&ixlib=rb-4.1.0&q=80&w=1080',
    featured: true,
    category: 'Floral',
  },
  {
    id: '2',
    name: 'Autumn Spice',
    scent: 'Cinnamon, Clove & Nutmeg',
    price: 26.99,
    image: 'https://images.unsplash.com/photo-1704573982777-770d486a91c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kbWFkZSUyMGNhbmRsZSUyMGFlc3RoZXRpY3xlbnwxfHx8fDE3NjAwMzEyMjJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    featured: true,
    category: 'Spicy',
  },
  {
    id: '3',
    name: 'Ocean Breeze',
    scent: 'Sea Salt, Jasmine & Driftwood',
    price: 22.99,
    image: 'https://images.unsplash.com/photo-1701987432961-831aa2aa9b34?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW5kbGUlMjBjb2xsZWN0aW9uJTIwaG9tZXxlbnwxfHx8fDE3NjAwMzEyMjN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    featured: true,
    category: 'Fresh',
  },
  {
    id: '4',
    name: 'Vanilla Bean',
    scent: 'Madagascar Vanilla & Cream',
    price: 23.99,
    image: 'https://images.unsplash.com/photo-1669151432266-cd991ea149ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpc2FuJTIwY2FuZGxlJTIwbWFraW5nfGVufDF8fHx8MTc2MDAzMTIyM3ww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Sweet',
  },
  {
    id: '5',
    name: 'Forest Pine',
    scent: 'Pine, Cedarwood & Eucalyptus',
    price: 25.99,
    image: 'https://images.unsplash.com/photo-1724252102086-34acb811a675?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmFsJTIwc295JTIwY2FuZGxlfGVufDF8fHx8MTc2MDAzMTIyNHww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Woody',
  },
  {
    id: '6',
    name: 'Rose Garden',
    scent: 'Rose Petals, Peony & Bergamot',
    price: 27.99,
    image: 'https://images.unsplash.com/photo-1707839568431-c2648f6d5184?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBzY2VudGVkJTIwY2FuZGxlfGVufDF8fHx8MTc1OTk0MTQxNXww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Floral',
  },
  {
    id: '7',
    name: 'Coffee House',
    scent: 'Espresso, Caramel & Cocoa',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1704573982777-770d486a91c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kbWFkZSUyMGNhbmRsZSUyMGFlc3RoZXRpY3xlbnwxfHx8fDE3NjAwMzEyMjJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Gourmand',
  },
  {
    id: '8',
    name: 'Citrus Burst',
    scent: 'Lemon, Orange & Grapefruit',
    price: 21.99,
    image: 'https://images.unsplash.com/photo-1701987432961-831aa2aa9b34?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW5kbGUlMjBjb2xsZWN0aW9uJTIwaG9tZXxlbnwxfHx8fDE3NjAwMzEyMjN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Fresh',
  },
  {
    id: '9',
    name: 'Midnight Amber',
    scent: 'Amber, Musk & Sandalwood',
    price: 28.99,
    image: 'https://images.unsplash.com/photo-1669151432266-cd991ea149ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpc2FuJTIwY2FuZGxlJTIwbWFraW5nfGVufDF8fHx8MTc2MDAzMTIyM3ww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Woody',
  },
];

export function StorePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');

  const filteredProducts = allProducts
    .filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.scent.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return 0; // featured order
    });

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-['Playfair_Display'] text-4xl md:text-5xl mb-4">
            Our Candle Collection
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Browse our full range of handcrafted candles, each one uniquely designed to bring warmth and fragrance to your home
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search candles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Category Filter */}
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Fragrance" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Fragrances</SelectItem>
              <SelectItem value="Floral">Floral</SelectItem>
              <SelectItem value="Spicy">Spicy</SelectItem>
              <SelectItem value="Fresh">Fresh</SelectItem>
              <SelectItem value="Sweet">Sweet</SelectItem>
              <SelectItem value="Woody">Woody</SelectItem>
              <SelectItem value="Gourmand">Gourmand</SelectItem>
            </SelectContent>
          </Select>

          {/* Sort */}
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="name">Name: A to Z</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">No candles found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
