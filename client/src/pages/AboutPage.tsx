import { Heart, Leaf, Sparkles, Users } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-secondary/20 via-background to-accent/10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-['Playfair_Display'] text-4xl md:text-5xl lg:text-6xl mb-6">
              Our Story
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Handcrafted with love and natural wax since 2020
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl">
                Where It All Began
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Candilicious was born from a simple passion: creating moments of warmth and 
                tranquility in everyday life. What started as a small home-based hobby in 2020 
                has blossomed into a beloved brand known for its commitment to quality and sustainability.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Every candle we create is a labor of love, meticulously handcrafted using only 
                the finest natural soy wax and premium essential oils. We believe that the 
                perfect candle should not only smell divine but also be kind to you and the planet.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Our journey is guided by three core values: authenticity, sustainability, and 
                craftsmanship. Each flame we light represents our dedication to bringing you 
                products that enrich your space and elevate your everyday moments.
              </p>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-radial from-primary/20 via-transparent to-transparent blur-3xl"></div>
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1669151432266-cd991ea149ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpc2FuJTIwY2FuZGxlJTIwbWFraW5nfGVufDF8fHx8MTc2MDAzMTIyM3ww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Artisan candle making"
                className="relative rounded-2xl shadow-xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl mb-4">
              What We Stand For
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our values guide everything we do, from sourcing materials to crafting each candle
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center space-y-4 p-6">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 candle-glow">
                <Heart className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-['Playfair_Display'] text-xl">Handcrafted</h3>
              <p className="text-sm text-muted-foreground">
                Every candle is made by hand with meticulous attention to detail
              </p>
            </div>
            <div className="text-center space-y-4 p-6">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 candle-glow">
                <Leaf className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-['Playfair_Display'] text-xl">Sustainable</h3>
              <p className="text-sm text-muted-foreground">
                We use eco-friendly materials and sustainable practices throughout
              </p>
            </div>
            <div className="text-center space-y-4 p-6">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 candle-glow">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-['Playfair_Display'] text-xl">Premium Quality</h3>
              <p className="text-sm text-muted-foreground">
                Only the finest natural ingredients and essential oils make the cut
              </p>
            </div>
            <div className="text-center space-y-4 p-6">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 candle-glow">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-['Playfair_Display'] text-xl">Community</h3>
              <p className="text-sm text-muted-foreground">
                We're building a community of candle lovers who value authenticity
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sustainability Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl mb-4">
                Our Commitment to Sustainability
              </h2>
              <p className="text-muted-foreground">
                Creating beautiful products while caring for our planet
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-xl border bg-card p-6 space-y-3 transition-all hover:shadow-lg">
                <h3 className="font-['Playfair_Display'] text-lg">Natural Ingredients</h3>
                <p className="text-sm text-muted-foreground">
                  We use 100% natural soy wax, cotton wicks, and pure essential oils - 
                  no synthetic fragrances or harmful chemicals.
                </p>
              </div>
              <div className="rounded-xl border bg-card p-6 space-y-3 transition-all hover:shadow-lg">
                <h3 className="font-['Playfair_Display'] text-lg">Recyclable Packaging</h3>
                <p className="text-sm text-muted-foreground">
                  All our packaging materials are fully recyclable or biodegradable, 
                  minimizing our environmental footprint.
                </p>
              </div>
              <div className="rounded-xl border bg-card p-6 space-y-3 transition-all hover:shadow-lg">
                <h3 className="font-['Playfair_Display'] text-lg">Clean Burning</h3>
                <p className="text-sm text-muted-foreground">
                  Our soy wax candles burn cleaner and longer than traditional paraffin, 
                  releasing no toxic fumes into your home.
                </p>
              </div>
              <div className="rounded-xl border bg-card p-6 space-y-3 transition-all hover:shadow-lg">
                <h3 className="font-['Playfair_Display'] text-lg">Ethical Sourcing</h3>
                <p className="text-sm text-muted-foreground">
                  We partner with suppliers who share our values, ensuring fair trade 
                  and ethical practices throughout our supply chain.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gradient-to-br from-accent/10 via-background to-secondary/20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl mb-6">
              Meet Our Artisans
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Behind every Candilicious candle is a dedicated team of artisans who pour 
              their heart and soul into creating the perfect blend of fragrance and ambiance. 
              We're a small but passionate team united by our love for craftsmanship and our 
              commitment to bringing joy into homes around the world.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Thank you for supporting our small business and being part of our journey. 
              Every candle you purchase helps us continue doing what we love - creating 
              beautiful, sustainable products that light up your world.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
