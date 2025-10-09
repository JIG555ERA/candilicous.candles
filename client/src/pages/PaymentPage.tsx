import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Separator } from '../components/ui/separator';
import { ShoppingBag, Trash2, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../components/ui/dialog';

export function PaymentPage() {
  const { cart, removeFromCart, updateQuantity, getCartTotal, placeOrder } = useCart();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
  });
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [orderId, setOrderId] = useState('');

  const subtotal = getCartTotal();
  const shipping = subtotal >= 50 ? 0 : 5.99;
  const total = subtotal + shipping;

  const handleRemoveItem = (id: string) => {
    removeFromCart(id);
    toast.success('Item removed from cart');
  };

  const handleQuantityChange = (id: string, newQuantity: number) => {
    updateQuantity(id, newQuantity);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (cart.length === 0) {
      toast.error('Your cart is empty!');
      return;
    }

    // Simulate payment processing
    const generatedOrderId = placeOrder(formData);
    setOrderId(generatedOrderId);
    setShowSuccessDialog(true);
    
    // Reset form
    setFormData({
      fullName: '',
      phone: '',
      email: '',
    });
  };

  const handleViewOrders = () => {
    setShowSuccessDialog(false);
    navigate('/orders');
  };

  const handleContinueShopping = () => {
    setShowSuccessDialog(false);
    navigate('/store');
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-['Playfair_Display'] text-4xl md:text-5xl mb-4">
            Checkout
          </h1>
          <p className="text-muted-foreground">
            Complete your order with secure payment
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Customer Details Form */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-['Playfair_Display']">Customer Information</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePayment} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      placeholder="John Doe"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <Separator />

                  <Button 
                    type="submit" 
                    className="w-full h-12 text-base bg-[#0D6EFD] hover:bg-[#0D6EFD]/90"
                    style={{ backgroundColor: '#0D6EFD' }}
                  >
                    Pay Securely via Razorpay
                  </Button>
                  <p className="text-xs text-center text-muted-foreground">
                    Secure payment powered by Razorpay. Your information is encrypted and safe.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-['Playfair_Display'] flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5" />
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {cart.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <ShoppingBag className="h-12 w-12 mx-auto mb-3 opacity-50" />
                    <p>Your cart is empty</p>
                  </div>
                ) : (
                  <>
                    {/* Cart Items */}
                    <div className="space-y-4">
                      {cart.map((item) => (
                        <div key={item.id} className="flex gap-3">
                          <div className="h-20 w-20 rounded-lg overflow-hidden bg-muted shrink-0">
                            <ImageWithFallback
                              src={item.image}
                              alt={item.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <div className="min-w-0">
                                <h4 className="font-medium text-sm truncate">{item.name}</h4>
                                <p className="text-xs text-muted-foreground truncate">{item.scent}</p>
                              </div>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7 shrink-0"
                                onClick={() => handleRemoveItem(item.id)}
                              >
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </div>
                            <div className="flex items-center justify-between mt-2">
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-7 w-7"
                                  onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                >
                                  -
                                </Button>
                                <span className="text-sm w-8 text-center">{item.quantity}</span>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-7 w-7"
                                  onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                >
                                  +
                                </Button>
                              </div>
                              <span className="font-medium text-sm">
                                ${(item.price * item.quantity).toFixed(2)}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <Separator />

                    {/* Price Breakdown */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Shipping</span>
                        <span>${shipping.toFixed(2)}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between font-medium text-base">
                        <span>Total</span>
                        <span className="text-primary">${total.toFixed(2)}</span>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Trust Badges */}
            <Card>
              <CardContent className="p-4 space-y-2 text-center">
                <p className="text-xs text-muted-foreground">
                  🔒 Secure SSL Encryption
                </p>
                <p className="text-xs text-muted-foreground">
                  ✓ 30-Day Money Back Guarantee
                </p>
                <p className="text-xs text-muted-foreground">
                  📦 Free Shipping on Orders Over $50
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Success Dialog */}
        <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <div className="flex justify-center mb-4">
                <div className="h-16 w-16 rounded-full bg-green-500/10 flex items-center justify-center">
                  <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
                </div>
              </div>
              <DialogTitle className="font-['Playfair_Display'] text-2xl text-center">
                Order Placed Successfully!
              </DialogTitle>
              <DialogDescription className="text-center space-y-4 pt-4">
                <p>
                  Thank you for your purchase! Your order has been confirmed.
                </p>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Order ID</p>
                  <p className="font-mono font-semibold text-lg text-foreground">
                    {orderId}
                  </p>
                </div>
                <p className="text-sm">
                  A confirmation email has been sent to your email address.
                </p>
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-3 mt-4">
              <Button
                onClick={handleViewOrders}
                className="w-full candle-glow"
              >
                View Order History
              </Button>
              <Button
                onClick={handleContinueShopping}
                variant="outline"
                className="w-full"
              >
                Continue Shopping
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
