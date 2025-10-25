'use client';
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { LoginPage } from './LoginPage';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, LogOut, Phone, Wallet } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function ProtectedRoute({ children, fallback }: ProtectedRouteProps) {
  const { isAuthenticated, user, logout, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return fallback || <LoginPage />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* User Info Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-blue-100 rounded-full">
                <User className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Welcome back!
                </h2>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Phone className="h-4 w-4" />
                    {user?.phoneE164}
                  </div>
                  <div className="flex items-center gap-1">
                    <Wallet className="h-4 w-4" />
                    {user?.walletAddress.slice(0, 6)}...{user?.walletAddress.slice(-4)}
                  </div>
                </div>
              </div>
            </div>
            <Button
              onClick={logout}
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </div>
    </div>
  );
}

// Dashboard component for authenticated users
export function UserDashboard() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* User Info Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              User Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <label className="text-sm font-medium text-gray-500">Phone Number</label>
              <p className="text-sm text-gray-900">{user?.phoneE164}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Wallet Address</label>
              <p className="text-sm text-gray-900 font-mono">{user?.walletAddress}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Status</label>
              <p className="text-sm text-green-600">✓ Registered & Verified</p>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button className="w-full justify-start" variant="outline">
              Send Payment
            </Button>
            <Button className="w-full justify-start" variant="outline">
              View Transactions
            </Button>
            <Button className="w-full justify-start" variant="outline">
              Update Profile
            </Button>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500">No recent activity</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
