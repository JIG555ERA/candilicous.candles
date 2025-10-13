import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Separator } from '../components/ui/separator';
import { ShoppingBag, Trash2, CheckCircle, Smartphone, Mail, User, MapPin, Building2, Globe } from 'lucide-react';
import { useState, useMemo } from 'react';
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
import axios from 'axios'; 
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';

// ⚠️ IMPORTANT: Replace with your actual logo path

// 💡 Helper function to load the Razorpay script
const loadRazorpayScript = (src) => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};


export function PaymentPage() {
  const { cart, removeFromCart, updateQuantity, getCartTotal, placeOrder } = useCart();
  const navigate = useNavigate();
  
  // --- Payment Flow States ---
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [orderId, setOrderId] = useState('');

  // --- Customer & Contact Details States ---
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+91'); 

  // --- Shipping Address States (NEW) ---
  const [address, setAddress] = useState({
      line1: '',
      line2: '',
      city: '',
      state: '',
      zip: '',
      country: 'India', // Default country
  });

  const handleAddressChange = (e) => {
    setAddress({
        ...address,
        [e.target.name]: e.target.value,
    });
  };

  // --- Cart and Pricing Calculations ---
  const subtotal = getCartTotal();
  const shipping = subtotal >= 50 ? 0 : 5.99;
  
  const calculatedTotals = useMemo(() => {
    const salesTaxRate = 0.07;
    const tax = subtotal * salesTaxRate;
    const finalTotal = subtotal + shipping + tax;
    
    // Razorpay requires amount in paise (or cents) and must be an integer.
    const amountInCents = Math.round(finalTotal * 100); 

    return {
        tax,
        total: finalTotal,
        amountInCents: amountInCents,
    };
  }, [subtotal, shipping]);

  const { tax, total, amountInCents } = calculatedTotals;

  // --- Handlers for Cart Items ---
  const handleRemoveItem = (id) => {
    removeFromCart(id);
    toast.success('Item removed from cart');
  };

  const handleQuantityChange = (id, newQuantity) => {
    updateQuantity(id, newQuantity);
  };

  // --- RAZORPAY PAYMENT LOGIC (Updated validation) ---
  const handleRazorpayPayment = async (e) => {
    e.preventDefault();
    
    // 1. Basic Validation
    if (cart.length === 0) {
      toast.error('Your cart is empty!');
      return;
    }
    if (!customerName || !customerEmail || !customerPhone || !address.line1 || !address.city || !address.zip) {
        toast.error('Please fill in all required customer and shipping details.');
        return;
    }

    // 2. Load the Razorpay script
    const res = await loadRazorpayScript('https://checkout.razorpay.com/v1/checkout.js');
    if (!res) {
      alert('Razorpay SDK failed to load. Are you offline?');
      return;
    }

    try {
      setIsProcessing(true);

      // 3. Create an order (from your backend)
      const { data } = await axios.post("https://candilicious-candles-server.vercel.app/miv/payments/create-order", {
        amount: amountInCents, 
        currency: "INR", 
      });

      if (!data.success) throw new Error("Failed to create order");
      const { order } = data;

      // 4. Razorpay options
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID, 
        amount: order.amount,
        currency: order.currency,
        name: "E-Commerce Store Name", 
        description: "Order for " + cart.map(item => item.name).join(', '),
        order_id: order.id,
        handler: async function (response) {
          try {
            // 5. Payment Verification (from your backend)
            const verify = await axios.post("https://candilicious-candles-server.vercel.app/miv/payments/verify", response);
            
            if (verify.data.success) {
                // Mock Order Placement after successful verification
                const orderData = { 
                    fullName: customerName, 
                    phone: customerPhone, 
                    email: customerEmail,
                    shippingAddress: address // 💡 Include shipping address in the order
                };
                const generatedOrderId = placeOrder(orderData);
                setOrderId(generatedOrderId);
                setShowSuccessDialog(true);
            } else {
              toast.error("❌ Payment verification failed");
            }
          } catch (err) {
            console.error("Verification failed:", err);
            toast.error("Payment verification failed! Please contact support.");
          }
        },
        prefill: {
          name: customerName,
          email: customerEmail,
          contact: `${countryCode}${customerPhone}`,
        },
        notes: {
            // 💡 Adding address details to notes for Razorpay record
            address_line_1: address.line1,
            address_city: address.city,
            address_zip: address.zip,
        },
        theme: {
          color: "#0D6EFD",
        },
      };

      // 6. Open Razorpay checkout
      const razorpay = new window.Razorpay(options);
      razorpay.open();

      razorpay.on("payment.failed", function (response) {
        toast.error("❌ Payment Failed: " + response.error.description);
      });

    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Something went wrong while initiating payment");
    } finally {
      setIsProcessing(false);
    }
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
          {/* Main Content (Customer, Shipping & Payment) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Customer Information Card */}
            <Card>
              <CardHeader>
                <CardTitle className="font-['Playfair_Display']">1. Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="customerName" className="flex items-center gap-2"><User className="h-4 w-4" /> Full Name</Label>
                    <Input id="customerName" placeholder="John Doe" value={customerName} onChange={(e) => setCustomerName(e.target.value)} required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="customerEmail" className="flex items-center gap-2"><Mail className="h-4 w-4" /> Email Address</Label>
                    <Input id="customerEmail" type="email" placeholder="john@example.com" value={customerEmail} onChange={(e) => setCustomerEmail(e.target.value)} required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="customerPhone" className="flex items-center gap-2"><Smartphone className="h-4 w-4" /> Phone Number</Label>
                    <div className="flex space-x-2">
                        <Select value={countryCode} onValueChange={setCountryCode}>
                            <SelectTrigger className="w-[100px] shrink-0"><SelectValue placeholder="Code" /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="+91">🇮🇳 +91</SelectItem>
                                <SelectItem value="+1">🇺🇸 +1</SelectItem>
                                <SelectItem value="+44">🇬🇧 +44</SelectItem>
                            </SelectContent>
                        </Select>
                        <Input id="customerPhone" type="tel" placeholder="e.g., 9876543210" value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} required />
                    </div>
                </div>
              </CardContent>
            </Card>

            {/* Shipping Address Card (NEW SECTION) */}
            <Card>
              <CardHeader>
                <CardTitle className="font-['Playfair_Display']">2. Shipping Address</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="line1" className="flex items-center gap-2"><MapPin className="h-4 w-4" /> Street Address*</Label>
                        <Input id="line1" name="line1" placeholder="House number and street name" value={address.line1} onChange={handleAddressChange} required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="line2" className="flex items-center gap-2"><Building2 className="h-4 w-4" /> Apartment, suite, etc. (optional)</Label>
                        <Input id="line2" name="line2" placeholder="Apartment, suite, unit, etc." value={address.line2} onChange={handleAddressChange} />
                    </div>
                    <div className="grid sm:grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="city">City*</Label>
                            <Input id="city" name="city" placeholder="City" value={address.city} onChange={handleAddressChange} required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="state">State / Province</Label>
                            <Input id="state" name="state" placeholder="State/Province" value={address.state} onChange={handleAddressChange} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="zip">ZIP/Postal Code*</Label>
                            <Input id="zip" name="zip" placeholder="10001" value={address.zip} onChange={handleAddressChange} required />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="country" className="flex items-center gap-2"><Globe className="h-4 w-4" /> Country*</Label>
                        <Select value={address.country} onValueChange={(value) => setAddress({...address, country: value})} required>
                            <SelectTrigger id="country">
                                <SelectValue placeholder="Select Country" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="India">India</SelectItem>
                                <SelectItem value="USA">United States</SelectItem>
                                <SelectItem value="UK">United Kingdom</SelectItem>
                                {/* Add more countries as needed */}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Button Card */}
            <Card>
              <CardHeader>
                <CardTitle className="font-['Playfair_Display']">3. Review & Pay</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleRazorpayPayment} className="space-y-6">
                    <Button 
                        type="submit" 
                        className="w-full h-12 text-base bg-[#0D6EFD] hover:bg-[#0D6EFD]/90"
                        disabled={isProcessing || cart.length === 0}
                    >
                        {isProcessing ? (
                            <div className="flex items-center">
                                <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                                Processing Payment...
                            </div>
                        ) : (
                            `Pay $${total.toFixed(2)} Securely via Razorpay`
                        )}
                    </Button>
                    <p className="text-xs text-center text-muted-foreground">
                        Secure payment powered by Razorpay. Your information is encrypted and safe.
                    </p>
                </form>
              </CardContent>
            </Card>

          </div>

          {/* Order Summary Sidebar */}
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
                    <div className="space-y-4 max-h-60 overflow-y-auto pr-2">
                      {cart.map((item) => (
                        <div key={item.id} className="flex gap-3 items-center">
                          <div className="h-16 w-16 rounded-lg overflow-hidden bg-muted shrink-0">
                            <ImageWithFallback
                              src={item.image}
                              alt={item.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-sm truncate">{item.name}</h4>
                            <p className="text-xs text-muted-foreground truncate">{item.scent}</p>
                          </div>
                          <div className="flex flex-col items-end gap-1">
                              <span className="font-medium text-sm">
                                  ${(item.price * item.quantity).toFixed(2)}
                              </span>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6 shrink-0"
                                onClick={() => handleRemoveItem(item.id)}
                              >
                                <Trash2 className="h-3 w-3 text-destructive" />
                              </Button>
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
                        <span className="text-muted-foreground">Shipping (Free over $50)</span>
                        <span>{shipping > 0 ? `$${shipping.toFixed(2)}` : 'Free'}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Tax (7% est.)</span>
                        <span>${tax.toFixed(2)}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between font-bold text-lg">
                        <span>Total Payable</span>
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
                  🔒 Secure SSL Encryption | ✓ 30-Day Money Back Guarantee | 📦 Free Shipping on Orders Over $50
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
                  A confirmation email has been sent to **{customerEmail}**.
                </p>
                <div className="flex gap-3 pt-2">
                    <Button onClick={handleContinueShopping} variant="outline" className="flex-1">
                        Continue Shopping
                    </Button>
                    <Button onClick={handleViewOrders} className="flex-1 bg-[#0D6EFD] hover:bg-[#0D6EFD]/90">
                        View Orders
                    </Button>
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}