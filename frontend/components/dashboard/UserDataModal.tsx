'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Phone, Wallet, Hash, Calendar, Copy, Check, X, Shield, Key } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useAccount } from 'wagmi';

interface UserDataModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function UserDataModal({ isOpen, onClose }: UserDataModalProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const { user, isAuthenticated } = useAuth();
  const { address, isConnected } = useAccount();

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <User className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">User Profile</h2>
                <p className="text-sm text-slate-600">Your account information</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* User Status */}
            <div className="flex items-center gap-3 p-4 bg-success/10 border border-success/20 rounded-lg">
              <Shield className="h-5 w-5 text-success" />
              <div>
                <p className="font-medium text-success">Account Status</p>
                <p className="text-sm text-slate-700">
                  {isAuthenticated ? 'Fully Registered' : 'Wallet Connected Only'}
                </p>
              </div>
            </div>

            {/* User Data Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Phone Number */}
              {user?.phoneE164 && (
                <Card className="border-2 border-blue-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-blue-600" />
                      Phone Number
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2">
                      <code className="text-sm bg-blue-50 px-3 py-1 rounded border flex-1 font-mono">
                        {user.phoneE164}
                      </code>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyToClipboard(user.phoneE164, 'phone')}
                        className="h-8 w-8 p-0"
                      >
                        {copiedField === 'phone' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Wallet Address */}
              {address && (
                <Card className="border-2 border-green-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-sm">
                      <Wallet className="h-4 w-4 text-green-600" />
                      Wallet Address
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2">
                      <code className="text-sm bg-green-50 px-3 py-1 rounded border flex-1 font-mono">
                        {address.slice(0, 6)}...{address.slice(-4)}
                      </code>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyToClipboard(address, 'wallet')}
                        className="h-8 w-8 p-0"
                      >
                        {copiedField === 'wallet' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Phone Hash */}
              {user?.phoneHash && (
                <Card className="border-2 border-purple-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-sm">
                      <Hash className="h-4 w-4 text-purple-600" />
                      Phone Hash
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2">
                      <code className="text-xs bg-purple-50 px-3 py-1 rounded border flex-1 font-mono">
                        {user.phoneHash.slice(0, 10)}...
                      </code>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyToClipboard(user.phoneHash, 'hash')}
                        className="h-8 w-8 p-0"
                      >
                        {copiedField === 'hash' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* User ID */}
              {user?.id && (
                <Card className="border-2 border-orange-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-sm">
                      <Key className="h-4 w-4 text-orange-600" />
                      User ID
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2">
                      <code className="text-sm bg-orange-50 px-3 py-1 rounded border flex-1 font-mono">
                        #{user.id}
                      </code>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyToClipboard(user.id.toString(), 'id')}
                        className="h-8 w-8 p-0"
                      >
                        {copiedField === 'id' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Connection Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <div>
                  <p className="text-sm font-medium">Wallet Connection</p>
                  <p className="text-xs text-slate-600">
                    {isConnected ? 'Connected' : 'Not Connected'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                <div className={`w-3 h-3 rounded-full ${isAuthenticated ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                <div>
                  <p className="text-sm font-medium">Database Registration</p>
                  <p className="text-xs text-slate-600">
                    {isAuthenticated ? 'Registered' : 'Not Registered'}
                  </p>
                </div>
              </div>
            </div>

            {/* Blockchain Status */}
            {user?.phoneHash && (
              <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Hash className="h-4 w-4 text-blue-600" />
                  <span className="font-medium text-blue-900">Blockchain Registration</span>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    Registered
                  </Badge>
                </div>
                <p className="text-sm text-blue-700">
                  Your phone number is registered on the Celo blockchain and linked to your wallet address.
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
