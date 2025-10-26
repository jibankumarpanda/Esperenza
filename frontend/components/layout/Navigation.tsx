'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Phone, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useAccount } from 'wagmi';

interface NavigationProps {
  variant?: 'default' | 'glass';
  className?: string;
  onLoginClick?: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ 
  variant = 'default', 
  className = '',
  onLoginClick 
}) => {
  const { isAuthenticated, user } = useAuth();
  const { isConnected } = useAccount();

  const baseClasses = variant === 'glass' 
    ? 'bg-gray-500/20 backdrop-blur-xl shadow-2xl border border-gray-400/30'
    : 'bg-gray-100 shadow-lg border border-gray-300';

  return (
    <nav className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50  ${className}`}>
      <div className={`${baseClasses} rounded-full px-6 py-3 mx-4 max-w-4xl`}>
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <div className={`p-2 ${variant === 'glass' ? 'bg-gradient-to-br from-gray-600/50 to-gray-700/50 backdrop-blur-sm border border-gray-400/30' : 'bg-gray-600'} rounded-full shadow-lg hover:shadow-xl transition-all duration-300`}>
              <Phone className="h-5 w-5 text-white" />
            </div>
            <span className={`text-lg font-bold ${variant === 'glass' ? 'text-white drop-shadow-lg' : 'text-gray-800'} hidden sm:block`}>
              Esperenza
            </span>
          </Link>
          
          <div className="flex items-center gap-5">
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <div className={`flex items-center gap-2 px-3 py-2 ${variant === 'glass' ? 'bg-white/10 backdrop-blur-md border border-white/20 text-black' : 'bg-gray-100 border border-gray-200 text-gray-900'} rounded-lg shadow-lg`}>
                  <User className="h-4 w-4" />
                  <span className="text-sm font-medium">
                    {user?.phoneE164?.slice(0, 6)}...
                  </span>
                </div>
                <Link href="/dashboard">
                  <Button className={variant === 'glass' 
                    ? 'bg-gradient-to-r from-purple-900 to-pink-500/10  border border-white/20 text-black hover:from-purple-500/30 hover:to-pink-500/30 hover:shadow-lg hover:shadow-purple-500/20'
                    : 'bg-indigo-600 text-black hover:bg-indigo-700'
                  }>
                    Dashboard
                  </Button>
                </Link>
              </div>
            ) : (
              <>
                <Button 
                  variant="outline" 
                  className={variant === 'glass'
                    ? 'bg-white/10 backdrop-blur-md border border-white/20 text-black hover:bg-white/20 hover:shadow-lg hover:shadow-white/10'
                    : 'border-gray-300 text-black hover:bg-gray-50'
                  }
                  onClick={onLoginClick}
                >
                  Login
                </Button>
                <Link href="/dashboard">
                  <Button className={variant === 'glass' 
                    ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-md border border-white/20 text-white hover:from-purple-500/30 hover:to-pink-500/30 hover:shadow-lg hover:shadow-purple-500/20'
                    : 'bg-indigo-600 text-white hover:bg-indigo-700'
                  }>
                    Dashboard
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;