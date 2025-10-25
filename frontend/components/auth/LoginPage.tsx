'use client';
import React, { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
// Badge not used here
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Phone, Wallet, Shield, CheckCircle, AlertCircle, Sparkles, Globe, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { ethers } from 'ethers';

export function LoginPage() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [step, setStep] = useState<'phone' | 'wallet' | 'complete'>('phone');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [userData, setUserData] = useState<any>(null);
  
  const { address, isConnected } = useAccount();
  const { login, registerPhone, isLoading } = useAuth();

  // Handle wallet connection
  useEffect(() => {
    if (step === 'wallet' && isConnected && address) {
      handleWalletConnect();
    }
  }, [isConnected, address, step]);

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!phoneNumber.trim()) {
      setError('Please enter your phone number');
      return;
    }

    // Hash the phone number
    const phoneHash = ethers.keccak256(ethers.toUtf8Bytes(phoneNumber));
    setUserData({ phoneNumber, phoneHash });
    setStep('wallet');
    setSuccess('Phone number processed! Now connect your wallet.');
  };

  const handleWalletConnect = () => {
    if (isConnected && address) {
      // Store user data in database
      handleUserRegistration();
    }
  };

  const handleUserRegistration = async () => {
    if (!userData || !address) return;

  setError(null);
  setSuccess(null);

    try {
      // Register phone number on blockchain
      const result = await registerPhone(userData.phoneNumber);
      
      if (result.success) {
        // Create user object with all data
        const newUser = {
          id: Date.now(),
          phoneE164: userData.phoneNumber,
          phoneHash: userData.phoneHash,
          walletAddress: address,
          isRegistered: true
        };

        // Store in local storage for now (you can extend this to store in your database)
        localStorage.setItem('ecopay_user', JSON.stringify(newUser));
        
        setUserData(newUser);
        setStep('complete');
        setSuccess('Registration successful! Welcome to Esperenza!');
        
        // Redirect to dashboard after 2 seconds
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 2000);
      } else {
        setError(result.error || 'Registration failed');
      }
    } catch (error: any) {
      setError(error.message || 'An error occurred during registration');
    } finally {
      // context handles isLoading state inside registerPhone
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-lg"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="flex items-center justify-center mb-6"
          >
            <div className="relative">
              <div className="p-4 bg-gradient-to-br from-primary to-primary/80 rounded-2xl shadow-lg">
                <Sparkles className="h-8 w-8 text-primary-foreground" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-success rounded-full animate-pulse" />
            </div>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl font-bold text-slate-900 mb-3"
          >
            Welcome to Esperenza
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-slate-700 text-lg"
          >
            Connect your wallet and start your eco-friendly payment journey
          </motion.p>
        </div>

        {/* Step Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-6"
        >
          <div className="flex items-center justify-center space-x-4">
            <div className={`flex items-center space-x-2 ${step === 'phone' ? 'text-primary' : step === 'wallet' || step === 'complete' ? 'text-success' : 'text-muted-foreground'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'phone' ? 'bg-primary text-primary-foreground' : step === 'wallet' || step === 'complete' ? 'bg-success text-success-foreground' : 'bg-muted'}`}>
                {step === 'wallet' || step === 'complete' ? <CheckCircle className="h-4 w-4" /> : '1'}
              </div>
              <span className="text-sm font-medium">Phone</span>
            </div>
            
            <div className={`w-8 h-0.5 ${step === 'wallet' || step === 'complete' ? 'bg-success' : 'bg-muted'}`} />
            
            <div className={`flex items-center space-x-2 ${step === 'wallet' ? 'text-primary' : step === 'complete' ? 'text-success' : 'text-muted-foreground'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'wallet' ? 'bg-primary text-primary-foreground' : step === 'complete' ? 'bg-success text-success-foreground' : 'bg-muted'}`}>
                {step === 'complete' ? <CheckCircle className="h-4 w-4" /> : '2'}
              </div>
              <span className="text-sm font-medium">Wallet</span>
            </div>
            
            <div className={`w-8 h-0.5 ${step === 'complete' ? 'bg-success' : 'bg-muted'}`} />
            
            <div className={`flex items-center space-x-2 ${step === 'complete' ? 'text-success' : 'text-muted-foreground'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'complete' ? 'bg-success text-success-foreground' : 'bg-muted'}`}>
                {step === 'complete' ? <CheckCircle className="h-4 w-4" /> : '3'}
              </div>
              <span className="text-sm font-medium">Complete</span>
            </div>
          </div>
        </motion.div>

        {/* Step 1: Phone Number Entry */}
        {step === 'phone' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card className="border-2 border-border/50 shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-xl text-slate-900">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  Enter Your Phone Number
                </CardTitle>
                <CardDescription className='text-slate-700'>
                  We'll create a secure hash of your phone number
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <form onSubmit={handlePhoneSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-medium text-slate-900">
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+1234567890"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      required
                      className="h-12"
                    />
                    <p className="text-xs text-slate-600">
                      Enter your phone number in international format
                    </p>
                  </div>

                  <Button 
                    type="submit" 
                    disabled={!phoneNumber.trim()} 
                    className="w-full h-12 text-base font-medium"
                    size="lg"
                  >
                    <div className="flex items-center gap-2">
                      Continue to Wallet
                      <Zap className="h-4 w-4" />
                    </div>
                  </Button>
                </form>

                {/* Status Messages */}
                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription className="text-slate-900">{error}</AlertDescription>
                  </Alert>
                )}

                {success && (
                  <Alert className="border-success bg-success/10">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <AlertDescription className="text-success">
                      {success}
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Step 2: Wallet Connection */}
        {step === 'wallet' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card className="border-2 border-border/50 shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-xl text-slate-900">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Wallet className="h-5 w-5 text-primary" />
                  </div>
                  Connect Your Wallet
                </CardTitle>
                <CardDescription className='text-slate-700'>
                  Link your Celo wallet to complete registration
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {isConnected ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center gap-3 p-4 bg-success/10 border border-success/20 rounded-lg"
                  >
                    <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                    <div className="flex-1">
                      <p className="font-medium text-success">Wallet Connected</p>
                      <p className="text-sm text-slate-700">
                        {address?.slice(0, 6)}...{address?.slice(-4)}
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <div className="space-y-4">
                    <p className="text-sm text-slate-700">
                      Connect your wallet to continue with Esperenza
                    </p>
                    <div className="flex justify-center">
                      <ConnectButton />
                    </div>
                  </div>
                )}

                {/* Status Messages */}
                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription className="text-slate-900">{error}</AlertDescription>
                  </Alert>
                )}

                {success && (
                  <Alert className="border-success bg-success/10">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <AlertDescription className="text-success">
                      {success}
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Step 3: Complete */}
        {step === 'complete' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card className="border-2 border-success/50 shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-xl text-slate-900">
                  <div className="p-2 bg-success/10 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-success" />
                  </div>
                  Registration Complete!
                </CardTitle>
                <CardDescription className='text-slate-700'>
                  Welcome to Esperenza! Redirecting to dashboard...
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {userData && (
                  <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
                    <h3 className="font-medium text-success mb-2">Your Account Details</h3>
                    <div className="space-y-1 text-sm text-slate-700">
                      <p><strong>User ID:</strong> {userData.id}</p>
                      <p><strong>Phone:</strong> {userData.phoneE164}</p>
                      <p><strong>Phone Hash:</strong> {userData.phoneHash?.slice(0, 10)}...</p>
                      <p><strong>Wallet:</strong> {userData.walletAddress?.slice(0, 6)}...{userData.walletAddress?.slice(-4)}</p>
                      <p><strong>Status:</strong> Registered in Database</p>
                    </div>
                  </div>
                )}

                {isLoading && (
                  <div className="flex items-center justify-center gap-2 p-4">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary border-t-transparent" />
                    <span className="text-sm text-slate-700">Finalizing registration...</span>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Features Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <div className="flex items-start gap-3 p-4 bg-card rounded-xl border shadow-sm hover:shadow-md transition-shadow">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Shield className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-1">Secure</h3>
              <p className="text-sm text-slate-600">End-to-end encryption</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3 p-4 bg-card rounded-xl border shadow-sm hover:shadow-md transition-shadow">
            <div className="p-2 bg-success/10 rounded-lg">
              <Globe className="h-5 w-5 text-success" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-1">Global</h3>
              <p className="text-sm text-slate-600">Worldwide accessibility</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3 p-4 bg-card rounded-xl border shadow-sm hover:shadow-md transition-shadow">
            <div className="p-2 bg-warning/10 rounded-lg">
              <Zap className="h-5 w-5 text-warning" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-1">Fast</h3>
              <p className="text-sm text-slate-600">Instant transactions</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default LoginPage;
