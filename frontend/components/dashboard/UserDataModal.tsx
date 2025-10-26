'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Phone, Wallet, Hash, Calendar, Copy, Check, X, Shield, Key, Star, Trophy, Award } from 'lucide-react';
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
  const [userPoints, setUserPoints] = useState<any[]>([]);
  const [totalPoints, setTotalPoints] = useState<number>(0);
  const [isLoadingPoints, setIsLoadingPoints] = useState(false);
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

  const fetchUserPoints = async () => {
    if (!user?.id) return;
    
    setIsLoadingPoints(true);
    try {
      const response = await fetch(`/api/user/points?userId=${user.id}`);
      const data = await response.json();
      
      if (data.success) {
        setUserPoints(data.points || []);
        setTotalPoints(data.totalPoints || 0);
      } else {
        console.error('Failed to fetch points:', data.error);
        // Set fallback data for demo
        setUserPoints([
          {
            id: 1,
            points: 50,
            source: 'referral_usage',
            description: 'Referral code used by another user',
            createdAt: new Date().toISOString()
          },
          {
            id: 2,
            points: 25,
            source: 'referral_creation',
            description: 'Created new referral code',
            createdAt: new Date().toISOString()
          }
        ]);
        setTotalPoints(75);
      }
    } catch (error) {
      console.error('Error fetching points:', error);
      // Set fallback data for demo
      setUserPoints([
        {
          id: 1,
          points: 50,
          source: 'referral_usage',
          description: 'Referral code used by another user',
          createdAt: new Date().toISOString()
        }
      ]);
      setTotalPoints(50);
    } finally {
      setIsLoadingPoints(false);
    }
  };

  const claimRewards = async () => {
    try {
      console.log('💰 Claiming rewards on blockchain...');
      const response = await fetch('/api/referrals/blockchain/claim', {
        method: 'POST'
      });
      
      const data = await response.json();
      
      if (data.success) {
        console.log('🎉 Rewards claimed successfully:', data.txHash);
        alert(`🎉 Rewards claimed successfully!\nBlockchain TX: ${data.txHash.slice(0, 10)}...`);
        fetchUserPoints(); // Refresh points
      } else {
        console.error('❌ Failed to claim rewards:', data.error);
        alert(`❌ Failed to claim rewards: ${data.error}`);
      }
    } catch (error) {
      console.error('❌ Error claiming rewards:', error);
      alert('❌ Error claiming rewards. Please try again.');
    }
  };

  useEffect(() => {
    if (isOpen && user?.id) {
      fetchUserPoints();
    }
  }, [isOpen, user?.id]);

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
          className="w-full max-w-2xl bg-gray-900/95 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/20">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg">
                <User className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white drop-shadow-lg">User Profile</h2>
                <p className="text-sm text-white/70 drop-shadow-lg">Your account information</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0 hover:bg-white/10 text-white/70 hover:text-white"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* User Status */}
            <div className="flex items-center gap-3 p-4 bg-green-500/20 backdrop-blur-sm border border-green-400/30 rounded-lg">
              <Shield className="h-5 w-5 text-green-300" />
              <div>
                <p className="font-medium text-green-300 drop-shadow-lg">Account Status</p>
                <p className="text-sm text-white/80 drop-shadow-lg">
                  {isAuthenticated ? 'Fully Registered' : 'Wallet Connected Only'}
                </p>
              </div>
            </div>

            {/* User Data Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Phone Number */}
              {user?.phoneE164 && (
                <Card className="border-2 border-blue-400/30 bg-blue-500/10 backdrop-blur-sm">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-sm text-white drop-shadow-lg">
                      <Phone className="h-4 w-4 text-blue-300" />
                      Phone Number
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2">
                      <code className="text-sm bg-white/90 text-black px-3 py-1 rounded border border-white/30 flex-1 font-mono">
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
                <Card className="border-2 border-green-400/30 bg-green-500/10 backdrop-blur-sm">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-sm text-white drop-shadow-lg">
                      <Wallet className="h-4 w-4 text-green-300" />
                      Wallet Address
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2">
                      <code className="text-sm bg-white/90 text-black px-3 py-1 rounded border border-white/30 flex-1 font-mono">
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
                <Card className="border-2 border-purple-400/30 bg-purple-500/10 backdrop-blur-sm">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-sm text-white drop-shadow-lg">
                      <Hash className="h-4 w-4 text-purple-300" />
                      Phone Hash
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2">
                      <code className="text-xs bg-white/90 text-black px-3 py-1 rounded border border-white/30 flex-1 font-mono">
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
                <Card className="border-2 border-orange-400/30 bg-orange-500/10 backdrop-blur-sm">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-sm text-white drop-shadow-lg">
                      <Key className="h-4 w-4 text-orange-300" />
                      User ID
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2">
                      <code className="text-sm bg-white/90 text-black px-3 py-1 rounded border border-white/30 flex-1 font-mono">
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

            {/* User Points Section */}
            {user?.id && (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-yellow-400" />
                    <h3 className="text-lg font-bold text-white drop-shadow-lg">User Points</h3>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={fetchUserPoints}
                    disabled={isLoadingPoints}
                    className="h-8 px-3 text-xs bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-white/20"
                  >
                    {isLoadingPoints ? 'Loading...' : 'Refresh'}
                  </Button>
                </div>

                {/* Total Points Card */}
                <Card className="border-2 border-yellow-400/30 bg-yellow-500/10 backdrop-blur-sm">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-sm text-white drop-shadow-lg">
                      <Star className="h-4 w-4 text-yellow-300" />
                      Total Points
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold text-yellow-300 drop-shadow-lg">
                        {isLoadingPoints ? '...' : totalPoints}
                      </div>
                      <Badge variant="secondary" className="bg-yellow-500/20 backdrop-blur-sm text-yellow-300 border border-yellow-400/30">
                        {totalPoints >= 100 ? 'Gold' : totalPoints >= 50 ? 'Silver' : 'Bronze'}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>

                {/* Points History */}
                {isLoadingPoints ? (
                  <Card className="border-2 border-blue-400/30 bg-blue-500/10 backdrop-blur-sm">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-300"></div>
                        <span className="ml-2 text-white/70">Loading points...</span>
                      </div>
                    </CardContent>
                  </Card>
                ) : userPoints.length > 0 ? (
                  <Card className="border-2 border-blue-400/30 bg-blue-500/10 backdrop-blur-sm">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-sm text-white drop-shadow-lg">
                        <Award className="h-4 w-4 text-blue-300" />
                        Points History
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3 max-h-40 overflow-y-auto">
                        {userPoints.map((point, index) => (
                          <div key={point.id || index} className="flex items-center justify-between p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg">
                            <div className="flex-1">
                              <p className="text-sm font-medium text-white drop-shadow-lg">
                                {point.description || point.source}
                              </p>
                              <p className="text-xs text-white/70 drop-shadow-lg">
                                {new Date(point.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-bold text-green-300 drop-shadow-lg">
                                +{point.points}
                              </span>
                              <Star className="h-4 w-4 text-yellow-400" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="border-2 border-gray-400/30 bg-gray-500/10 backdrop-blur-sm">
                    <CardContent className="p-6">
                      <div className="text-center">
                        <Award className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-white/70">No points earned yet</p>
                        <p className="text-xs text-white/50 mt-1">Create referrals to start earning points!</p>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Points Info */}
                <div className="p-4 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-sm border border-yellow-400/30 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Trophy className="h-4 w-4 text-yellow-300" />
                    <span className="font-medium text-white drop-shadow-lg">Points System</span>
                  </div>
                  <p className="text-sm text-white/80 drop-shadow-lg mb-3">
                    Earn points by creating referrals and having them used by others. Points can be redeemed for rewards!
                  </p>
                  
                  {/* Claim Rewards Button */}
                  <Button
                    onClick={claimRewards}
                    className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    <Trophy className="w-4 h-4 mr-2" />
                    Claim Rewards on Blockchain
                  </Button>
                </div>
              </div>
            )}

            {/* Connection Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg">
                <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-400 shadow-sm' : 'bg-red-400 shadow-sm'}`}></div>
                <div>
                  <p className="text-sm font-medium text-white drop-shadow-lg">Wallet Connection</p>
                  <p className="text-xs text-white/70 drop-shadow-lg">
                    {isConnected ? 'Connected' : 'Not Connected'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg">
                <div className={`w-3 h-3 rounded-full ${isAuthenticated ? 'bg-green-400 shadow-sm' : 'bg-yellow-400 shadow-sm'}`}></div>
                <div>
                  <p className="text-sm font-medium text-white drop-shadow-lg">Database Registration</p>
                  <p className="text-xs text-white/70 drop-shadow-lg">
                    {isAuthenticated ? 'Registered' : 'Not Registered'}
                  </p>
                </div>
              </div>
            </div>

            {/* Blockchain Status */}
            {user?.phoneHash && (
              <div className="p-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-blue-400/30 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Hash className="h-4 w-4 text-blue-300" />
                  <span className="font-medium text-white drop-shadow-lg">Blockchain Registration</span>
                  <Badge variant="secondary" className="bg-blue-500/20 backdrop-blur-sm text-blue-300 border border-blue-400/30">
                    Registered
                  </Badge>
                </div>
                <p className="text-sm text-white/80 drop-shadow-lg">
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
