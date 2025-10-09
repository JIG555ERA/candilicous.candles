import { useCart } from '../contexts/CartContext';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { Package, Calendar, DollarSign, ShoppingBag, ClipboardList } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export function OrdersPage() {
  const { orders } = useCart();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500/10 text-green-700 dark:text-green-400';
      case 'processing':
        return 'bg-amber-500/10 text-amber-700 dark:text-amber-400';
      case 'shipped':
        return 'bg-blue-500/10 text-blue-700 dark:text-blue-400';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-['Playfair_Display'] text-4xl md:text-5xl mb-4">
            Order History
          </h1>
          <p className="text-muted-foreground">
            View all your previous orders and payment history
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          {orders.length === 0 ? (
            <Card>
              <CardContent className="text-center py-16">
                <ShoppingBag className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                <h2 className="font-['Playfair_Display'] text-2xl mb-2">No Orders Yet</h2>
                <p className="text-muted-foreground mb-6">
                  You haven't placed any orders yet. Start shopping to see your order history here!
                </p>
                <a
                  href="/store"
                  className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-primary-foreground transition-colors hover:bg-primary/90 candle-glow"
                >
                  Browse Products
                </a>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <Card key={order.orderId} className="overflow-hidden">
                  <CardHeader className="bg-muted/50">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <Package className="h-5 w-5 text-primary" />
                        <div>
                          <CardTitle className="font-['Playfair_Display'] text-lg">
                            Order #{order.orderId}
                          </CardTitle>
                          <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                            <Calendar className="h-3.5 w-3.5" />
                            <span>{formatDate(order.date)}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge className={getStatusColor(order.status)}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </Badge>
                        <div className="flex items-center gap-1 text-lg font-semibold text-primary">
                          <DollarSign className="h-4 w-4" />
                          {order.total.toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="p-6">
                    {/* Customer Info */}
                    <div className="mb-6 p-4 rounded-lg bg-muted/30">
                      <h4 className="font-medium mb-3 flex items-center gap-2">
                        <ClipboardList className="h-4 w-4" />
                        Customer Information
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                        <div>
                          <span className="text-muted-foreground">Name:</span>{' '}
                          <span className="font-medium">{order.customerInfo.fullName}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Email:</span>{' '}
                          <span className="font-medium">{order.customerInfo.email}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Phone:</span>{' '}
                          <span className="font-medium">{order.customerInfo.phone}</span>
                        </div>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="space-y-4">
                      <h4 className="font-medium">Items Ordered</h4>
                      {order.items.map((item) => (
                        <div key={item.id} className="flex gap-4">
                          <div className="h-20 w-20 rounded-lg overflow-hidden bg-muted shrink-0">
                            <ImageWithFallback
                              src={item.image}
                              alt={item.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h5 className="font-medium text-sm">{item.name}</h5>
                            <p className="text-xs text-muted-foreground mb-1">{item.scent}</p>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-muted-foreground">
                                Quantity: {item.quantity}
                              </span>
                              <span className="font-medium text-sm">
                                ${(item.price * item.quantity).toFixed(2)}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <Separator className="my-4" />

                    {/* Price Summary */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span>${order.subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Shipping</span>
                        <span>
                          {order.shipping === 0 ? (
                            <span className="text-green-600 dark:text-green-400">Free</span>
                          ) : (
                            `$${order.shipping.toFixed(2)}`
                          )}
                        </span>
                      </div>
                      <Separator />
                      <div className="flex justify-between font-medium">
                        <span>Total Paid</span>
                        <span className="text-primary">${order.total.toFixed(2)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
