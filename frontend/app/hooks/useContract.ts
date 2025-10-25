import { useState } from 'react';

export function usePayment() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendPayment = async (receiver: string, amount: string, userId: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ receiver, amount, userId })
      });

      const data = await response.json();

      if (data.success) {
        return { success: true, txHash: data.txHash };
      } else {
        setError(data.error);
        return { success: false, error: data.error };
      }
    } catch (err) {
      setError('Network error');
      return { success: false, error: 'Network error' };
    } finally {
      setLoading(false);
    }
  };

  return { sendPayment, loading, error };
}

export function usePhoneRegistration() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const registerPhone = async (phoneNumber: string, userId: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/phone/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber, userId })
      });

      const data = await response.json();

      if (data.success) {
        return { success: true, txHash: data.txHash, phoneHash: data.phoneHash };
      } else {
        setError(data.error);
        return { success: false, error: data.error };
      }
    } catch (err) {
      setError('Network error');
      return { success: false, error: 'Network error' };
    } finally {
      setLoading(false);
    }
  };

  return { registerPhone, loading, error };
}