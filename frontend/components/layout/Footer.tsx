'use client';

import React from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, Twitter, Github, Linkedin, ExternalLink } from 'lucide-react';

interface FooterProps {
  variant?: 'default' | 'glass';
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ variant = 'default', className = '' }) => {
  const baseClasses = variant === 'glass' 
    ? 'bg-white/5 backdrop-blur-xl border-t border-white/10'
    : 'bg-slate-900 border-t border-slate-800';
    
  const textClasses = variant === 'glass' 
    ? 'text-white'
    : 'text-slate-300';
    
  const linkClasses = variant === 'glass'
    ? 'text-white/80 hover:text-white transition-colors duration-300'
    : 'text-slate-400 hover:text-white transition-colors duration-300';

  return (
    <footer className={`${baseClasses} ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className={`p-2 ${variant === 'glass' ? 'bg-gradient-to-br from-purple-500/30 to-pink-500/30 backdrop-blur-sm border border-white/20' : 'bg-indigo-600'} rounded-lg`}>
                <Phone className="h-6 w-6 text-white" />
              </div>
              <span className={`text-xl font-bold ${textClasses}`}>Esperenza</span>
            </div>
            <p className={`text-sm ${variant === 'glass' ? 'text-white/70' : 'text-slate-400'} max-w-xs`}>
              Revolutionizing payments with phone number-based transactions on the Celo blockchain. 
              Secure, fast, and accessible for everyone.
            </p>
            <div className="flex items-center space-x-4">
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`${variant === 'glass' ? 'text-white/60 hover:text-white' : 'text-slate-400 hover:text-white'} transition-colors duration-300`}
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`${variant === 'glass' ? 'text-white/60 hover:text-white' : 'text-slate-400 hover:text-white'} transition-colors duration-300`}
              >
                <Github className="h-5 w-5" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`${variant === 'glass' ? 'text-white/60 hover:text-white' : 'text-slate-400 hover:text-white'} transition-colors duration-300`}
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div className="space-y-4">
            <h3 className={`text-sm font-semibold ${textClasses} uppercase tracking-wider`}>
              Product
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/dashboard" className={linkClasses}>
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/features" className={linkClasses}>
                  Features
                </Link>
              </li>
              <li>
                <Link href="/referrals" className={linkClasses}>
                  Referral Program
                </Link>
              </li>
              <li>
                <Link href="/api-docs" className={linkClasses}>
                  API Documentation
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className={`text-sm font-semibold ${textClasses} uppercase tracking-wider`}>
              Resources
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/docs" className={linkClasses}>
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/support" className={linkClasses}>
                  Support Center
                </Link>
              </li>
              <li>
                <Link href="/blog" className={linkClasses}>
                  Blog
                </Link>
              </li>
              <li>
                <a 
                  href="https://celo.org" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`${linkClasses} flex items-center gap-1`}
                >
                  Celo Network
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Legal */}
          <div className="space-y-4">
            <h3 className={`text-sm font-semibold ${textClasses} uppercase tracking-wider`}>
              Contact & Legal
            </h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="mailto:support@esperenza.com" 
                  className={`${linkClasses} flex items-center gap-2`}
                >
                  <Mail className="h-4 w-4" />
                  Support
                </a>
              </li>
              <li>
                <Link href="/privacy" className={linkClasses}>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className={linkClasses}>
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/security" className={linkClasses}>
                  Security
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className={`mt-12 pt-8 border-t ${variant === 'glass' ? 'border-white/10' : 'border-slate-800'} flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0`}>
          <div className={`text-sm ${variant === 'glass' ? 'text-white/60' : 'text-slate-400'}`}>
            <p>&copy; 2025 Esperenza. All rights reserved.</p>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className={`text-sm ${variant === 'glass' ? 'text-white/60' : 'text-slate-400'} flex items-center gap-2`}>
              <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Celo Network Status: Online</span>
            </div>
            
            <div className={`text-xs ${variant === 'glass' ? 'text-white/50' : 'text-slate-500'} flex items-center gap-1`}>
              <MapPin className="h-3 w-3" />
              <span>Built with ❤️ globally</span>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className={`mt-6 pt-6 border-t ${variant === 'glass' ? 'border-white/5' : 'border-slate-800/50'}`}>
          <div className={`text-xs ${variant === 'glass' ? 'text-white/40' : 'text-slate-500'} text-center max-w-4xl mx-auto`}>
            <p className="mb-2">
              <strong>Disclaimer:</strong> Esperenza is a decentralized application built on the Celo blockchain. 
              Cryptocurrency transactions are irreversible. Please ensure you understand the risks involved.
            </p>
            <p>
              By using Esperenza, you agree to our terms of service and acknowledge that you are responsible 
              for the security of your wallet and private keys.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;