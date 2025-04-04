import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { ArrowLeft, Search } from 'lucide-react';
import { getUserByEmail } from '@/services/userService';

interface Order {
  id: string;
  items: any[];
  total: number;
  date: string;
  status: string;
  userName?: string;
  userEmail?: string;
}

const AllOrders = () => {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Redirect if not an admin
  useEffect(() => {
    if (!isAdmin) {
      navigate('/login');
    }
  }, [isAdmin, navigate]);

  // Load orders from localStorage and add user names
  useEffect(() => {
    const savedOrders = localStorage.getItem('orders');
    if (savedOrders) {
      const parsedOrders = JSON.parse(savedOrders);
      
      // Enhance orders with user names if available
      const enhancedOrders = parsedOrders.map((order: Order) => {
        if (order.userEmail) {
          const user = getUserByEmail(order.userEmail);
          if (user && user.name) {
            return {
              ...order,
              userName: user.name
            };
          }
        }
        return order;
      });
      
      setOrders(enhancedOrders);
      setFilteredOrders(enhancedOrders);
    }
  }, []);

  // Handle search functionality
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    if (term.trim() === '') {
      setFilteredOrders(orders);
    } else {
      const filtered = orders.filter(order => 
        order.id.toLowerCase().includes(term.toLowerCase()) ||
        (order.userName && order.userName.toLowerCase().includes(term.toLowerCase())) ||
        (order.userEmail && order.userEmail.toLowerCase().includes(term.toLowerCase()))
      );
      setFilteredOrders(filtered);
    }
  };

  // Handle order status update
  const updateOrderStatus = (orderId: string, newStatus: string) => {
    const updatedOrders = orders.map(order => {
      if (order.id === orderId) {
        return { ...order, status: newStatus };
      }
      return order;
    });
    
    setOrders(updatedOrders);
    setFilteredOrders(
      filteredOrders.map(order => {
        if (order.id === orderId) {
          return { ...order, status: newStatus };
        }
        return order;
      })
    );
    
    // Update in localStorage
    const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    const updatedSavedOrders = savedOrders.map((order: Order) => {
      if (order.id === orderId) {
        return { ...order, status: newStatus };
      }
      return order;
    });
    localStorage.setItem('orders', JSON.stringify(updatedSavedOrders));
  };

  return (
    <motion.div 
      className="container mx-auto py-24 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="glass-panel p-8 rounded-lg">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full"
              onClick={() => navigate('/admin-dashboard')}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-semibold">All Orders</h1>
          </div>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-towel-gray h-4 w-4" />
            <Input
              className="pl-10 w-[250px]"
              placeholder="Search by order ID or customer..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>
        
        {filteredOrders.length > 0 ? (
          <Table>
            <TableCaption>A list of all customer orders.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">
                    <Link to={`/order-details/${order.id}`} className="hover:underline text-towel-blue">
                      {order.id.substring(0, 10)}...
                    </Link>
                  </TableCell>
                  <TableCell>{order.userName || (order.userEmail || "Unknown")}</TableCell>
                  <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                  <TableCell>{order.items.length} items</TableCell>
                  <TableCell>₹{order.total.toFixed(2)}</TableCell>
                  <TableCell>
                    <select 
                      value={order.status}
                      onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                      className="px-2 py-1 rounded border border-input bg-transparent text-sm"
                    >
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => navigate(`/order-details/${order.id}`)}
                    >
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-12">
            <p className="text-towel-gray">No orders found</p>
            {searchTerm && (
              <Button 
                variant="link" 
                onClick={() => {
                  setSearchTerm('');
                  setFilteredOrders(orders);
                }}
              >
                Clear search
              </Button>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default AllOrders;
