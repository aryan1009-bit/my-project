
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag, ArrowLeft, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface Order {
  id: string;
  items: OrderItem[];
  total: number;
  date: string;
  status: string;
}

const OrderDetails = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // Get orders from localStorage
    const orders: Order[] = JSON.parse(localStorage.getItem('orders') || '[]');
    const foundOrder = orders.find(order => order.id === orderId);
    
    if (foundOrder) {
      setOrder(foundOrder);
    }
    
    setLoading(false);
  }, [orderId]);

  if (loading) {
    return (
      <div className="container mx-auto py-24 px-4 flex items-center justify-center min-h-screen">
        <div className="animate-pulse">Loading order details...</div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container mx-auto py-24 px-4 flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-semibold mb-4">Order Not Found</h1>
        <p className="text-towel-gray mb-6">We couldn't find the order you're looking for.</p>
        <Link to="/">
          <Button>Return to Homepage</Button>
        </Link>
      </div>
    );
  }

  return (
    <motion.div 
      className="container mx-auto py-24 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="glass-panel p-8 rounded-lg max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Link to="/">
              <Button variant="ghost" size="icon" className="rounded-full">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-2xl font-semibold">Order Details</h1>
          </div>
          <div className="bg-towel-beige/30 px-4 py-2 rounded-full text-sm font-medium">
            {order.status}
          </div>
        </div>
        
        <div className="mb-8">
          <div className="flex flex-wrap justify-between gap-4 text-sm text-towel-gray">
            <div>
              <p>Order ID</p>
              <p className="font-medium text-foreground">{order.id}</p>
            </div>
            <div>
              <p>Date Placed</p>
              <p className="font-medium text-foreground">
                {new Date(order.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
            <div>
              <p>Total Amount</p>
              <p className="font-medium text-foreground">₹{order.total.toFixed(2)}</p>
            </div>
          </div>
        </div>
        
        <div className="mb-8">
          <h2 className="text-xl font-medium mb-4">Order Items</h2>
          <div className="bg-white rounded-lg shadow divide-y">
            {order.items.map(item => (
              <div key={item.id} className="p-4 flex items-center gap-4">
                <div className="w-16 h-16 bg-towel-beige/20 rounded-lg overflow-hidden">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-sm text-towel-gray">Qty: {item.quantity}</p>
                </div>
                <div className="font-medium">₹{(item.price * item.quantity).toFixed(2)}</div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-towel-beige/20 p-6 rounded-lg">
          <div className="flex justify-between mb-2">
            <span>Subtotal</span>
            <span>₹{order.total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className="flex justify-between font-semibold text-lg pt-3 border-t">
            <span>Total</span>
            <span>₹{order.total.toFixed(2)}</span>
          </div>
        </div>
        
        <div className="mt-8 flex justify-center">
          <div className="flex flex-col items-center text-towel-gray">
            <Package className="mb-2 h-10 w-10 text-towel-blue" />
            <p className="font-medium text-lg text-foreground">Thank you for your order!</p>
            <p className="text-sm">You will receive an update when your order ships.</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default OrderDetails;
