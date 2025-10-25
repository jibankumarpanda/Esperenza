'use client';
import { useState, useEffect } from 'react';
import { useContractInfo, useTransactionVerification } from '@/hooks/useContract';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function ContractInfo() {
  const [balance, setBalance] = useState<string | null>(null);
  const [ecoFund, setEcoFund] = useState<string | null>(null);
  const [txHash, setTxHash] = useState('');
  const [verificationResult, setVerificationResult] = useState<any>(null);
  
  const { getContractBalance, getEcoFund, loading: infoLoading, error: infoError } = useContractInfo();
  const { verifyTransaction, loading: verifyLoading, error: verifyError } = useTransactionVerification();

  const loadContractInfo = async () => {
    const balanceResult = await getContractBalance();
    if (balanceResult.success) {
      setBalance(balanceResult.balance);
    }

    const ecoFundResult = await getEcoFund();
    if (ecoFundResult.success) {
      setEcoFund(ecoFundResult.ecoFund);
    }
  };

  const handleVerifyTransaction = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!txHash) {
      alert('Please enter a transaction hash');
      return;
    }

    const result = await verifyTransaction(txHash);
    if (result.success) {
      setVerificationResult(result);
    } else {
      alert(`Verification failed: ${result.error}`);
    }
  };

  useEffect(() => {
    loadContractInfo();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Contract Information */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Contract Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="font-medium">Contract Balance:</span>
            <span className="text-lg font-bold">
              {balance ? `${balance} CELO` : 'Loading...'}
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="font-medium">Eco Fund Address:</span>
            <span className="text-sm font-mono break-all">
              {ecoFund || 'Loading...'}
            </span>
          </div>
          
          <Button onClick={loadContractInfo} disabled={infoLoading} className="w-full">
            {infoLoading ? 'Loading...' : 'Refresh Info'}
          </Button>
          
          {infoError && (
            <p className="text-red-500 text-sm">{infoError}</p>
          )}
        </CardContent>
      </Card>

      {/* Transaction Verification */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Verify Transaction</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleVerifyTransaction} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="txHash">Transaction Hash</Label>
              <Input
                id="txHash"
                placeholder="0x..."
                value={txHash}
                onChange={(e) => setTxHash(e.target.value)}
                required
              />
            </div>
            
            <Button type="submit" disabled={verifyLoading} className="w-full">
              {verifyLoading ? 'Verifying...' : 'Verify Transaction'}
            </Button>
            
            {verifyError && (
              <p className="text-red-500 text-sm">{verifyError}</p>
            )}
          </form>

          {verificationResult && (
            <div className="mt-4 p-4 bg-gray-100 rounded-lg">
              <h3 className="font-semibold mb-2">Verification Result:</h3>
              <p><strong>Status:</strong> {verificationResult.status}</p>
              <p><strong>Block Number:</strong> {verificationResult.blockNumber}</p>
              <p><strong>Success:</strong> {verificationResult.status === 'success' ? 'Yes' : 'No'}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
