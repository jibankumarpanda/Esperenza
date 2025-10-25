'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAccount, useDisconnect } from 'wagmi';
import { ethers } from 'ethers';
import { parsePhoneNumber } from 'libphonenumber-js';

interface User {
  id: number;
  phoneE164: string;
  phoneHash: string;
  walletAddress: string;
  isRegistered: boolean;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (phoneNumber: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  registerPhone: (phoneNumber: string) => Promise<{ success: boolean; error?: string }>;
  checkPhoneRegistration: (phoneNumber: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('ecopay_user');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        localStorage.removeItem('ecopay_user');
      }
    }
  }, []);

  // Load user from database when wallet connects
  useEffect(() => {
    if (isConnected && address && !user) {
      loadUserFromDatabase();
    }
  }, [isConnected, address, user]);

      const loadUserFromDatabase = async () => {
        try {
          const response = await fetch(`/api/user/profile?walletAddress=${address}`);
          const data = await response.json();
          
          if (data.success && data.user) {
            const userData: User = {
              id: data.user.id,
              phoneE164: data.user.phoneE164,
              phoneHash: data.user.phoneHash,
              walletAddress: data.user.walletAddress,
              isRegistered: true
            };
            
            setUser(userData);
            localStorage.setItem('ecopay_user', JSON.stringify(userData));
          } else {
            // User not found in database, but wallet is connected
            // This is normal for new users who haven't registered yet
            console.log('User not found in database, wallet connected but not registered');
          }
        } catch (error) {
          console.error('Error loading user from database:', error);
        }
      };

  const isAuthenticated = !!user && isConnected;

  // Hash phone number function
  const hashPhoneNumber = (phoneNumber: string): string => {
    return ethers.keccak256(ethers.toUtf8Bytes(phoneNumber));
  };

  // Parse and validate phone number
  const parseAndValidatePhone = (phoneNumber: string) => {
    try {
      const parsed = parsePhoneNumber(phoneNumber);
      return {
        isValid: true,
        e164: parsed.format('E.164'),
        national: parsed.formatNational(),
        country: parsed.country
      };
    } catch (error) {
      return {
        isValid: false,
        error: 'Invalid phone number format'
      };
    }
  };

  // Check if phone is registered on blockchain
  const checkPhoneRegistration = async (phoneNumber: string): Promise<boolean> => {
    try {
      const phoneHash = hashPhoneNumber(phoneNumber);
      const response = await fetch('/api/phone/lookup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber })
      });

      const data = await response.json();
      return data.success && data.hasWallet;
    } catch (error) {
      console.error('Error checking phone registration:', error);
      return false;
    }
  };

  // Login function
  const login = async (phoneNumber: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    try {
      // Validate phone number
      const phoneData = parseAndValidatePhone(phoneNumber);
      if (!phoneData.isValid) {
        return { success: false, error: phoneData.error };
      }

      // Check if phone is registered
      const isRegistered = await checkPhoneRegistration(phoneData.e164!);
      if (!isRegistered) {
        return { 
          success: false, 
          error: 'Phone number not registered. Please register first.' 
        };
      }

      // Create user object
      const phoneHash = hashPhoneNumber(phoneData.e164!);
      const userData: User = {
        id: Date.now(), // Temporary ID
        phoneE164: phoneData.e164!,
        phoneHash: phoneHash,
        walletAddress: address || '',
        isRegistered: true
      };

      setUser(userData);
      return { success: true };
    } catch (error: any) {
      console.error('Login error:', error);
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  // Register phone function
  const registerPhone = async (phoneNumber: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    try {
      // Validate phone number
      const phoneData = parseAndValidatePhone(phoneNumber);
      if (!phoneData.isValid) {
        return { success: false, error: phoneData.error };
      }

      // Check if already registered
      const isRegistered = await checkPhoneRegistration(phoneData.e164!);
      if (isRegistered) {
        return { 
          success: false, 
          error: 'Phone number already registered' 
        };
      }

      // Register on blockchain first
      const blockchainResponse = await fetch('/api/phone/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          phoneNumber: phoneData.e164!,
          userId: Date.now() // Temporary user ID
        })
      });

      const blockchainData = await blockchainResponse.json();
      if (blockchainData.success) {
        // Now store user in database
        const dbResponse = await fetch('/api/user/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            phoneNumber: phoneData.e164!,
            walletAddress: address || ''
          })
        });

        const dbData = await dbResponse.json();
        if (dbData.success) {
          // Create user object with database ID
          const userData: User = {
            id: dbData.user.id,
            phoneE164: dbData.user.phoneE164,
            phoneHash: dbData.user.phoneHash,
            walletAddress: dbData.user.walletAddress,
            isRegistered: true
          };

          // Store in localStorage for persistence
          localStorage.setItem('ecopay_user', JSON.stringify(userData));
          setUser(userData);
          return { success: true };
        } else {
          return { success: false, error: dbData.error || 'Failed to store user in database' };
        }
      } else {
        return { success: false, error: blockchainData.error };
      }
    } catch (error: any) {
      console.error('Registration error:', error);
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('ecopay_user');
    disconnect();
  };

  // Auto-login if wallet is connected and user data exists in localStorage
  useEffect(() => {
    if (isConnected && address && !user) {
      const savedUser = localStorage.getItem('ecopay_user');
      if (savedUser) {
        try {
          const userData = JSON.parse(savedUser);
          if (userData.walletAddress === address) {
            setUser(userData);
          }
        } catch (error) {
          localStorage.removeItem('ecopay_user');
        }
      }
    }
  }, [isConnected, address, user]);

  // Save user data to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem('ecopay_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('ecopay_user');
    }
  }, [user]);

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated,
    login,
    logout,
    registerPhone,
    checkPhoneRegistration
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
