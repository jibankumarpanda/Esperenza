import { useState } from 'react';

// Payment Contract Hooks
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
        return { success: true, txHash: data.txHash, blockNumber: data.blockNumber };
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

// Phone Registration Hooks
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
        return { 
          success: true, 
          txHash: data.txHash, 
          phoneHash: data.phoneHash,
          blockNumber: data.blockNumber
        };
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

// Phone Lookup Hooks
export function usePhoneLookup() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const lookupPhone = async (phoneNumber: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/phone/lookup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber })
      });

      const data = await response.json();

      if (data.success) {
        return { 
          success: true, 
          wallet: data.wallet,
          phoneHash: data.phoneHash,
          hasWallet: data.hasWallet
        };
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

  return { lookupPhone, loading, error };
}

// Contract Information Hooks
export function useContractInfo() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getContractBalance = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/contract/balance');
      const data = await response.json();

      if (data.success) {
        return { success: true, balance: data.balance, currency: data.currency };
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

  const getEcoFund = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/contract/ecofund');
      const data = await response.json();

      if (data.success) {
        return { success: true, ecoFund: data.ecoFund };
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

  return { getContractBalance, getEcoFund, loading, error };
}

// Transaction Verification Hooks
export function useTransactionVerification() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const verifyTransaction = async (txHash: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/transaction/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ txHash })
      });

      const data = await response.json();

      if (data.success) {
        return { 
          success: true, 
          status: data.status,
          blockNumber: data.blockNumber,
          receipt: data.receipt
        };
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

  return { verifyTransaction, loading, error };
}
