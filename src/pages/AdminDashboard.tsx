
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { DashboardCards } from '@/components/admin/DashboardCards';
import SalesAnalysisChart from '@/components/admin/SalesAnalysisChart';
import RecentOrdersTable from '@/components/admin/RecentOrdersTable';
import CustomRequestsPanel from '@/components/admin/CustomRequestsPanel';
import AdminDashboardLayout from '@/components/admin/AdminDashboardLayout';

interface Order {
  id: string;
  items: any[];
  total: number;
  date: string;
  status: string;
}

interface CustomRequest {
  id: string;
  title: string;
  status: string;
  date: string;
}

const AdminDashboard = () => {
  const { user, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [customRequests, setCustomRequests] = useState<CustomRequest[]>([]);
  const [salesData, setSalesData] = useState<any[]>([]);

  useEffect(() => {
    if (!isAdmin) {
      navigate('/login');
    }
  }, [isAdmin, navigate]);

  useEffect(() => {
    const savedOrders = localStorage.getItem('orders');
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }

    const savedRequests = localStorage.getItem('customRequests');
    if (savedRequests) {
      setCustomRequests(JSON.parse(savedRequests));
    }

    const savedSalesData = localStorage.getItem('salesData');
    if (savedSalesData) {
      const parsedData = JSON.parse(savedSalesData);
      const chartData = Object.entries(parsedData).map(([name, value]) => ({
        name,
        value
      }));
      setSalesData(chartData);
    }
  }, []);

  const newOrders = orders.filter(order => order.status === 'Processing').length;
  const shippedOrders = orders.filter(order => order.status === 'Shipped').length;
  const deliveredOrders = orders.filter(order => order.status === 'Delivered').length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  
  const pendingRequests = customRequests.filter(req => req.status === 'pending').length;

  if (!isAdmin) {
    return null;
  }

  return (
    <AdminDashboardLayout
      userName={user?.name}
      userEmail={user?.email}
      onLogout={logout}
    >
      <DashboardCards
        totalRevenue={totalRevenue}
        newOrders={newOrders}
        shippedOrders={shippedOrders}
        deliveredOrders={deliveredOrders}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <SalesAnalysisChart salesData={salesData} />
        <RecentOrdersTable orders={orders} />
      </div>
      
      <CustomRequestsPanel 
        customRequests={customRequests} 
        pendingRequests={pendingRequests} 
      />
    </AdminDashboardLayout>
  );
};

export default AdminDashboard;
