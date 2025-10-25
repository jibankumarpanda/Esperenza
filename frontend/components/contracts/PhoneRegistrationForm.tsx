'use client';
import { useState } from 'react';
import { usePhoneRegistration, usePhoneLookup } from '@/hooks/useContract';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function PhoneRegistrationForm() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [userId, setUserId] = useState('');
  const [lookupPhone, setLookupPhone] = useState('');
  const { registerPhone, loading: registerLoading, error: registerError } = usePhoneRegistration();
  const { lookupPhone: lookup, loading: lookupLoading, error: lookupError } = usePhoneLookup();
  const [lookupResult, setLookupResult] = useState<any>(null);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!phoneNumber || !userId) {
      alert('Please fill in all fields');
      return;
    }

    const result = await registerPhone(phoneNumber, userId);
    
    if (result.success) {
      alert(`Phone registered! Transaction hash: ${result.txHash}`);
      setPhoneNumber('');
      setUserId('');
    } else {
      alert(`Registration failed: ${result.error}`);
    }
  };

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!lookupPhone) {
      alert('Please enter a phone number');
      return;
    }

    const result = await lookup(lookupPhone);
    
    if (result.success) {
      setLookupResult(result);
    } else {
      alert(`Lookup failed: ${result.error}`);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Registration Form */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Register Phone Number</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                placeholder="+1234567890"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
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
            
            <Button type="submit" disabled={registerLoading} className="w-full">
              {registerLoading ? 'Registering...' : 'Register Phone'}
            </Button>
            
            {registerError && (
              <p className="text-red-500 text-sm">{registerError}</p>
            )}
          </form>
        </CardContent>
      </Card>

      {/* Lookup Form */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Lookup Phone Number</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLookup} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="lookupPhone">Phone Number</Label>
              <Input
                id="lookupPhone"
                placeholder="+1234567890"
                value={lookupPhone}
                onChange={(e) => setLookupPhone(e.target.value)}
                required
              />
            </div>
            
            <Button type="submit" disabled={lookupLoading} className="w-full">
              {lookupLoading ? 'Looking up...' : 'Lookup Phone'}
            </Button>
            
            {lookupError && (
              <p className="text-red-500 text-sm">{lookupError}</p>
            )}
          </form>

          {lookupResult && (
            <div className="mt-4 p-4 bg-gray-100 rounded-lg">
              <h3 className="font-semibold mb-2">Lookup Result:</h3>
              <p><strong>Wallet:</strong> {lookupResult.wallet}</p>
              <p><strong>Phone Hash:</strong> {lookupResult.phoneHash}</p>
              <p><strong>Has Wallet:</strong> {lookupResult.hasWallet ? 'Yes' : 'No'}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
