'use client';
import { useState } from 'react';
import { usePayment } from '@/hooks/useContract';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function PaymentForm() {
  const [receiver, setReceiver] = useState('');
  const [amount, setAmount] = useState('');
  const [userId, setUserId] = useState('');
  const { sendPayment, loading, error } = usePayment();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!receiver || !amount || !userId) {
      alert('Please fill in all fields');
      return;
    }

    const result = await sendPayment(receiver, amount, userId);
    
    if (result.success) {
      alert(`Payment sent! Transaction hash: ${result.txHash}`);
      setReceiver('');
      setAmount('');
      setUserId('');
    } else {
      alert(`Payment failed: ${result.error}`);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Send Payment</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="receiver">Receiver Address</Label>
            <Input
              id="receiver"
              placeholder="0x..."
              value={receiver}
              onChange={(e) => setReceiver(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="amount">Amount (CELO)</Label>
            <Input
              id="amount"
              type="number"
              step="0.001"
              placeholder="0.1"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="userId">User ID</Label>
            <Input
              id="userId"
              placeholder="123"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              required
            />
          </div>
          
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Sending...' : 'Send Payment'}
          </Button>
          
          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
