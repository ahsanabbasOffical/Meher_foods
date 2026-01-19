'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

interface Delivery {
  id: number;
  user_first_name: string;
  user_last_name: string;
  user_email: string;
  product: { name: string; price: number };
  quantity: number;
  total_price: number;
  address_snapshot: string;
  status: string;
  created_at: string;
}

interface Invoice {
  id: number;
  invoice_number: string;
  user_first_name: string;
  user_last_name: string;
  total_amount: number;
  status: string;
  created_at: string;
}

interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
}

export default function ShopkeeperDashboard() {
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<number | null>(null);
  const [error, setError] = useState('');
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    if (!token || !userStr) {
      router.push('/shopkeeper/login');
      return;
    }

    const user = JSON.parse(userStr);
    if (user.username !== 'shop_meher') {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      router.push('/shopkeeper/login');
      return;
    }

    fetchData(token);
  }, [router]);

  const fetchData = async (token: string) => {
    setLoading(true);
    try {
      await Promise.all([
        fetchDeliveries(token),
        fetchInvoices(token),
        fetchUsers(token),
      ]);
    } catch (err) {
      setError('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const fetchDeliveries = async (token: string) => {
    const response = await fetch(`${API_BASE}/deliveries/`, {
      headers: { Authorization: `Token ${token}` },
    });

    if (response.ok) {
      const data = await response.json();
      setDeliveries(data);
    } else if (response.status === 403) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      router.push('/shopkeeper/login');
    } else {
      setError('Failed to fetch orders');
    }
  };

  const fetchInvoices = async (token: string) => {
    const response = await fetch(`${API_BASE}/invoices/`, {
      headers: { Authorization: `Token ${token}` },
    });
    if (response.ok) {
      const data = await response.json();
      setInvoices(data);
    }
  };

  const fetchUsers = async (token: string) => {
    const response = await fetch(`${API_BASE}/users/`, {
      headers: { Authorization: `Token ${token}` },
    });
    if (response.ok) {
      const data = await response.json();
      setUsers(data);
    }
  };

  const updateStatus = async (id: number, newStatus: string) => {
    const token = localStorage.getItem('token');
    if (!token) return;

    setUpdating(id);
    try {
      const response = await fetch(`${API_BASE}/deliveries/${id}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        setDeliveries(prev => prev.map(d => d.id === id ? { ...d, status: newStatus } : d));
        toast({ title: 'Status updated', description: `Order ${id} updated to ${newStatus}.` });
      } else {
        toast({ variant: 'destructive', title: 'Update failed', description: 'Please try again.' });
      }
    } catch (err) {
      toast({ variant: 'destructive', title: 'Network error', description: 'Update failed.' });
    } finally {
      setUpdating(null);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/shopkeeper/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <Card className="max-w-7xl mx-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Shopkeeper Dashboard</CardTitle>
          <Button onClick={handleLogout}>Logout</Button>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <Tabs defaultValue="orders" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="invoices">Invoices</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
            </TabsList>
            <TabsContent value="orders">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead>Qty</TableHead>
                    <TableHead>Total (PKR)</TableHead>
                    <TableHead>Address</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {deliveries.map((delivery) => (
                    <TableRow key={delivery.id}>
                      <TableCell>{delivery.id}</TableCell>
                      <TableCell>{delivery.user_first_name} {delivery.user_last_name} ({delivery.user_email})</TableCell>
                      <TableCell>{delivery.product.name}</TableCell>
                      <TableCell>{delivery.quantity}</TableCell>
                      <TableCell>{delivery.total_price}</TableCell>
                      <TableCell className="max-w-xs truncate">{delivery.address_snapshot}</TableCell>
                      <TableCell>{delivery.status}</TableCell>
                      <TableCell>
                        <Select value={delivery.status} onValueChange={(value) => updateStatus(delivery.id, value)}>
                          <SelectTrigger className="w-[120px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="confirmed">Confirmed</SelectItem>
                            <SelectItem value="processing">Processing</SelectItem>
                            <SelectItem value="shipped">Shipped</SelectItem>
                            <SelectItem value="out_for_delivery">Out for Delivery</SelectItem>
                            <SelectItem value="delivered">Delivered</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                            <SelectItem value="returned">Returned</SelectItem>
                          </SelectContent>
                        </Select>
                        {updating === delivery.id && <Loader2 className="h-4 w-4 animate-spin ml-2" />}
                      </TableCell>
                    </TableRow>
                  ))}
                  {deliveries.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-8">No orders found.</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="invoices">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Invoice Number</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Total Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created At</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell>{invoice.id}</TableCell>
                      <TableCell>{invoice.invoice_number}</TableCell>
                      <TableCell>{invoice.user_first_name} {invoice.user_last_name}</TableCell>
                      <TableCell>{invoice.total_amount}</TableCell>
                      <TableCell>{invoice.status}</TableCell>
                      <TableCell>{new Date(invoice.created_at).toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            <TabsContent value="users">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Username</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Name</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.id}</TableCell>
                      <TableCell>{user.username}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.first_name} {user.last_name}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
