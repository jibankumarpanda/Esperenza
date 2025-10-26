
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
import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import GridDistortion from "@/components/ui/GridDistortion";
import Footer from "@/components/layout/Footer";
import Navigation from "@/components/layout/Navigation";

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
    <main className="min-h-screen relative text-white font-sans overflow-hidden">
      {/* Animated Grid Distortion Background */}
      <div className="fixed inset-0 z-0">
        <GridDistortion
          grid={25}
          mouse={0.2}
          strength={0.3}
          relaxation={0.92}
          imageSrc="/gradient-bg.svg"
          className="w-full h-full"
        />
      </div>

      {/* Content Layer */}
      <div className="relative z-10">
        {/* Navigation */}
        <Navigation 
          variant="glass" 
          onLoginClick={() => setIsLoginModalOpen(true)}
        />

      <div className="relative">
        <Hero />
      </div>
      <div className="bg-white/5 backdrop-blur-xl border-y border-white/10 shadow-2xl">
        <Features />
      </div>
      <div className="relative">
        <Impact />
      </div>
      <div className="bg-white/3 backdrop-blur-lg border-y border-white/5">
        <Marquee3D/>
      </div>
      
      {/* CTA Section */}
      <section className="py-16 bg-white/5 backdrop-blur-xl border-t border-white/10 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4 drop-shadow-lg">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-white/90 mb-8 drop-shadow-md">
            Connect your wallet and register your phone number to start using EcoPay
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="w-full sm:w-auto bg-gradient-to-r from-purple-500/60 to-pink-500/60 backdrop-blur-lg border border-white/20 text-white hover:from-purple-500/80 hover:to-pink-500/80 hover:shadow-2xl hover:shadow-purple-500/40 transition-all duration-300"
              onClick={() => setIsLoginModalOpen(true)}
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Link href="/dashboard">
              <Button 
                size="lg" 
                variant="outline" 
                className="w-full sm:w-auto bg-white/10 backdrop-blur-lg border-white/20 text-white hover:bg-white/20 hover:shadow-2xl hover:shadow-white/30 transition-all duration-300"
              >
                View Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer variant="glass" />

      {/* Login Modal */}
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
      />
      </div>
    </main>
  );
}
