
'use client';
import { Marquee3D } from "@/components/sections/Faq";
import { Features } from "@/components/sections/Features";
import { Hero } from "@/components/sections/Hero";
import { Impact } from "@/components/sections/Impact";
import { LoginModal } from "@/components/auth/LoginModal";
import { useAuth } from "@/contexts/AuthContext";
import { useAccount } from "wagmi";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Phone, Wallet, User } from "lucide-react";
import { useState, useEffect } from "react";

export default function Home() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { isAuthenticated, user } = useAuth();
  const { isConnected } = useAccount();

  // Auto-redirect to dashboard if authenticated
  useEffect(() => {
    if (isAuthenticated && isConnected) {
      window.location.href = '/dashboard';
    }
  }, [isAuthenticated, isConnected]);

  // Check if we should show login modal (e.g., from /login redirect)
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('login') === 'true') {
      setIsLoginModalOpen(true);
    }
  }, []);

  return (
    <main className="min-h-screen bg-white text-slate-900 font-sans">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-blue-100 rounded-full">
                <Phone className="h-6 w-6 text-blue-600" />
              </div>
              <span className="text-xl font-bold text-gray-900">Esperenza</span>
            </div>
            <div className="flex items-center gap-4">
              {isAuthenticated ? (
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 px-3 py-2 bg-green-50 rounded-lg">
                    <User className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-green-700">
                      {user?.phoneE164?.slice(0, 6)}...
                    </span>
                  </div>
                  <Link href="/dashboard">
                    <Button>Dashboard</Button>
                  </Link>
                </div>
              ) : (
                <>
                  <Button 
                    variant="outline" 
                    onClick={() => setIsLoginModalOpen(true)}
                  >
                    Login
                  </Button>
                  <Link href="/dashboard">
                    <Button>Dashboard</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      <Hero />
      <div className="bg-slate-50">
        <Features />
      </div>
      <Impact />
      <Marquee3D/>
      
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Connect your wallet and register your phone number to start using EcoPay
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="secondary" 
              className="w-full sm:w-auto"
              onClick={() => setIsLoginModalOpen(true)}
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Link href="/dashboard">
              <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent border-white text-white hover:bg-white hover:text-blue-600">
                View Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Login Modal */}
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
      />
    </main>
  );
}
