'use client';
import React, { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { CustomConnectButton } from '@/components/ui/CustomConnectButton';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Phone, Wallet, Shield, CheckCircle, AlertCircle, Sparkles, Globe, Zap, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ethers } from 'ethers';
import { parsePhoneNumber } from 'libphonenumber-js';
import './LoginModal.css';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [step, setStep] = useState<'phone' | 'wallet' | 'complete'>('phone');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const [isPhoneValid, setIsPhoneValid] = useState(false);
  
  const { address, isConnected } = useAccount();
  const { login, registerPhone, isLoading: authIsLoading } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  // Validate phone number
  const validatePhone = (phone: string) => {
    try {
      const parsed = parsePhoneNumber(phone);
      return parsed.isValid();
    } catch {
      return false;
    }
  };

  // Handle phone number change
  useEffect(() => {
    if (phoneNumber.trim()) {
      const isValid = validatePhone(phoneNumber);
      setIsPhoneValid(isValid);
      if (!isValid) {
        setError('Please enter a valid phone number');
      } else {
        setError(null);
      }
    } else {
      setIsPhoneValid(false);
      setError(null);
    }
  }, [phoneNumber]);

  // Handle wallet connection
  useEffect(() => {
    console.log('Wallet connection effect:', { step, isConnected, address, isPhoneValid });
    if (step === 'wallet' && isConnected && address && isPhoneValid) {
      console.log('Triggering wallet connect handler');
      handleWalletConnect();
    }
  }, [isConnected, address, step, isPhoneValid]);

  // Debug wallet connection status
  useEffect(() => {
    console.log('Wallet status changed:', { isConnected, address, step });
  }, [isConnected, address, step]);

  // Debug ConnectButton click
  const handleConnectClick = () => {
    console.log('Connect button clicked');
  };

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!phoneNumber.trim()) {
      setError('Please enter your phone number');
      return;
    }

    if (!isPhoneValid) {
      setError('Please enter a valid phone number');
      return;
    }

    // Hash the phone number
    const phoneHash = ethers.keccak256(ethers.toUtf8Bytes(phoneNumber));
    setUserData({ phoneNumber, phoneHash });
    setStep('wallet');
    setSuccess('Phone number validated! Now connect your wallet.');
  };

  const handleWalletConnect = () => {
    console.log('handleWalletConnect called:', { isConnected, address, isPhoneValid, userData });
    if (isConnected && address && isPhoneValid) {
      console.log('Proceeding with user registration');
      handleUserRegistration();
    } else {
      console.log('Cannot proceed:', { isConnected, address, isPhoneValid });
      setError('Please ensure wallet is connected and phone number is valid');
    }
  };

  const handleUserRegistration = async () => {
    console.log('handleUserRegistration called:', { userData, address, isPhoneValid });
    if (!userData || !address || !isPhoneValid) {
      console.log('Missing required data:', { userData, address, isPhoneValid });
      setError('Missing required data for registration');
      return;
    }

    setError(null);
    setSuccess(null);
    setIsLoading(true);

    try {
      console.log('Starting database registration first...');
      // Register user in database first
      const dbResponse = await fetch('/api/user/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phoneNumber: userData.phoneNumber,
          walletAddress: address
        })
      });

      const dbData = await dbResponse.json();
      console.log('Database registration result:', dbData);
      
      if (dbData.success) {
        console.log('Database registration successful, now registering on blockchain...');
        // Now register phone number on blockchain
        const blockchainResult = await registerPhone(userData.phoneNumber);
        console.log('Blockchain result:', blockchainResult);
        
        if (blockchainResult.success) {
          // Create user object with database ID
          const newUser = {
            id: dbData.user.id,
            phoneE164: dbData.user.phoneE164,
            phoneHash: dbData.user.phoneHash,
            walletAddress: dbData.user.walletAddress,
            isRegistered: true
          };

          console.log('User created successfully:', newUser);
          // Store in local storage
          localStorage.setItem('ecopay_user', JSON.stringify(newUser));
          
          setUserData(newUser);
          setStep('complete');
          setSuccess('Registration successful! Welcome to Esperenza!');
          
          // Redirect to dashboard after 2 seconds
          setTimeout(() => {
            window.location.href = '/dashboard';
          }, 2000);
        } else {
          console.error('Blockchain registration failed:', blockchainResult.error);
          setError(blockchainResult.error || 'Blockchain registration failed');
        }
      } else {
        console.error('Database registration failed:', dbData.error);
        setError(dbData.error || 'Failed to store user in database');
      }
    } catch (error: any) {
      console.error('Registration error:', error);
      setError(error.message || 'An error occurred during registration');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setStep('phone');
    setPhoneNumber('');
    setError(null);
    setSuccess(null);
    setUserData(null);
    setIsPhoneValid(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={handleClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="w-full max-w-lg bg-white rounded-2xl shadow-2xl login-modal"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-black">Welcome to Esperenza</h2>
                <p className="text-sm text-black">Connect your wallet to continue</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClose}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Step Indicator */}
          <div className="px-6 py-4 border-b">
            <div className="flex items-center justify-center space-x-4">
              <div className={`flex items-center space-x-2 ${step === 'phone' ? 'text-primary' : step === 'wallet' || step === 'complete' ? 'text-success' : 'text-muted-foreground'}`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step === 'phone' ? 'bg-primary text-primary-foreground' : step === 'wallet' || step === 'complete' ? 'bg-success text-success-foreground' : 'bg-muted'}`}>
                  {step === 'wallet' || step === 'complete' ? <CheckCircle className="h-3 w-3" /> : '1'}
                </div>
                <span className="text-xs font-medium">Phone</span>
              </div>
              
              <div className={`w-6 h-0.5 ${step === 'wallet' || step === 'complete' ? 'bg-success' : 'bg-muted'}`} />
              
              <div className={`flex items-center space-x-2 ${step === 'wallet' ? 'text-primary' : step === 'complete' ? 'text-success' : 'text-muted-foreground'}`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step === 'wallet' ? 'bg-primary text-primary-foreground' : step === 'complete' ? 'bg-success text-success-foreground' : 'bg-muted'}`}>
                  {step === 'complete' ? <CheckCircle className="h-3 w-3" /> : '2'}
                </div>
                <span className="text-xs font-medium">Wallet</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Step 1: Phone Number Entry */}
            {step === 'phone' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className='text-black'>
                  <Label htmlFor="phone" className="text-sm font-medium text-black">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+1234567890"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className={`h-12 ${!isPhoneValid && phoneNumber ? 'border-destructive' : ''}`}
                  />
                  <p className="text-xs text-slate-600 mt-1">
                    Enter your phone number in international format
                  </p>
                </div>

                <Button 
                  onClick={handlePhoneSubmit}
                  disabled={!isPhoneValid || !phoneNumber.trim()} 
                  className="w-full h-12 text-base font-medium"
                  size="lg"
                >
                  <div className="flex items-center gap-2 text-black border border-black px-4 py-2 rounded-lg rounded-full">
                    Continue to Wallet
                    <Zap className="h-4 w-4" />
                  </div>
                </Button>
              </motion.div>
            )}

            {/* Step 2: Wallet Connection */}
            {step === 'wallet' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="text-center">
                  <div className="p-3 bg-primary/10 rounded-lg w-fit mx-auto mb-3">
                    <Wallet className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-1">Connect Your Wallet</h3>
                  <p className="text-sm text-slate-600">
                    Link your Celo wallet to complete registration
                  </p>
                </div>

                {isConnected ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center gap-3 p-4 bg-success/10 border border-success/20 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                      <div className="flex-1">
                        <p className="font-medium text-success">Wallet Connected</p>
                        <p className="text-sm text-slate-700">
                          {address?.slice(0, 6)}...{address?.slice(-4)}
                        </p>
                      </div>
                    </div>
                    
                    {isPhoneValid && (
                      <Button 
                        onClick={handleWalletConnect}
                        className="w-full"
                        disabled={isLoading || authIsLoading}
                      >
                        {isLoading || authIsLoading ? (
                          <div className="flex items-center gap-2">
                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                            Registering...
                          </div>
                        ) : (
                          'Complete Registration'
                        )}
                      </Button>
                    )}
                  </motion.div>
                ) : (
                  <div className="space-y-4">
                    <p className="text-sm text-slate-600 text-center">
                      Click the button below to connect your wallet
                    </p>
                            <div className="flex justify-center">
                              <div className="w-full max-w-xs">
                                <CustomConnectButton 
                                  label="Connect Wallet"
                                  size="lg"
                                  className="w-full"
                                />
                              </div>
                            </div>
                    
                    {/* Fallback instructions */}
                    <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-xs text-blue-700 text-center mb-2">
                        <strong>Having trouble?</strong> Make sure you have MetaMask, WalletConnect, or another Celo-compatible wallet installed.
                      </p>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full text-xs"
                        onClick={() => window.location.reload()}
                      >
                        Refresh Page
                      </Button>
                    </div>
                    <p className="text-xs text-slate-500 text-center">
                      Make sure you have a Celo-compatible wallet installed
                    </p>
                  </div>
                )}
              </motion.div>
            )}

            {/* Step 3: Complete */}
            {step === 'complete' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="text-center">
                  <div className="p-3 bg-success/10 rounded-lg w-fit mx-auto mb-3">
                    <CheckCircle className="h-6 w-6 text-success" />
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-1">Registration Complete!</h3>
                  <p className="text-sm text-black ">
                    Welcome to Esperenza! Redirecting to dashboard...
                  </p>
                </div>

                {userData && (
                  <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
                    <h4 className="font-medium text-success mb-2">Your Account Details</h4>
                    <div className="space-y-1 text-sm text-slate-700">
                      <p><strong>Phone:</strong> {userData.phoneE164}</p>
                      <p><strong>Wallet:</strong> {userData.walletAddress?.slice(0, 6)}...{userData.walletAddress?.slice(-4)}</p>
                      <p><strong>Status:</strong> Registered</p>
                    </div>
                  </div>
                )}

                {(isLoading || authIsLoading) && (
                  <div className="flex items-center justify-center gap-2 p-4">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary border-t-transparent" />
                    <span className="text-sm text-slate-700">Finalizing registration...</span>
                  </div>
                )}
              </motion.div>
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
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
