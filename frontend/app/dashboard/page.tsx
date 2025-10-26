'use client';

import { motion } from 'framer-motion';
import { Wallet, Gift, Users, ArrowUpRight, ChevronRight, X, Search, Phone, User, Copy, Check, Menu } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useAccount } from 'wagmi';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UserDataModal } from '@/components/dashboard/UserDataModal';
import { ProgramCards } from '@/components/dashboard/ProgramCards';
import LiquidEther from '@/components/ui/LiquidEther';
import Footer from '@/components/layout/Footer';
import Navigation from '@/components/layout/Navigation';

// Types
interface DashboardCardProps {
  title: string;
  value: string;
  icon: React.ComponentType<any>;
  className?: string;
}

interface ReferralItemProps {
  name: string;
  code: string;
  uses: number;
  reward: string;
  isActive?: boolean;
  maxUsage?: number;
}

interface ReferralFormData {
  name: string;
  code: string;
  reward?: string;
  maxUsage?: number;
  category?: string;
  description?: string;
}

interface AvailableReferral {
  id: string;
  platform: string;
  code: string;
  owner: string;
  rating: number;
  usesLeft: number;
}

const PLATFORMS = [
  { id: 'gemini', name: 'Gemini', reward: '50 Points' },
  { id: 'chatgpt', name: 'ChatGPT Plus', reward: '30 Points' },
  { id: 'claude', name: 'Claude AI', reward: '40 Points' },
  { id: 'comet', name: 'Comet', reward: '25 Points' },
  { id: 'nexo', name: 'Nexo', reward: '100 Points' },

  // Added popular student / referral programs & marketplace partners
  { id: 'sofi', name: 'SoFi', reward: 'Varies ($50–$500)' },
  { id: 'acorns', name: 'Acorns', reward: '5 Points' },
  { id: 'coursera', name: 'Coursera', reward: '50% Off' },
  { id: 'dropbox', name: 'Dropbox', reward: 'Storage Bonus' },
  { id: 'swagbucks', name: 'Swagbucks', reward: '10% SB' },
  { id: 'amber', name: 'Amber (Housing)', reward: '£50 / Voucher' },
  { id: 'fiverr', name: 'Fiverr', reward: '10% Credits' },
  { id: 'tmobile', name: 'T-Mobile', reward: '$50' },
  { id: 'wise', name: 'Wise', reward: '£50 (UK)' },
  { id: 'google_workspace', name: 'Google Workspace (Education)', reward: 'Referral $8–$23' },
  { id: 'ibotta', name: 'Ibotta', reward: '$10' },
  { id: 'codecademy', name: 'Codecademy', reward: '1 Month Pro' },
  { id: 'microverse', name: 'Microverse', reward: '$150' },
  { id: 'ita', name: 'International TEFL Academy (ITA)', reward: '$100' },
  { id: 'sugarsync', name: 'SugarSync', reward: '10 GB Storage' },
  { id: 'learning_a_z', name: 'Learning A-Z', reward: 'Varies' },
  { id: 'ccbst', name: 'CCBST', reward: 'Varies' },
  { id: 'revolut', name: 'Revolut', reward: 'Varies' }
];

const DashboardCard: React.FC<DashboardCardProps> = ({ title, value, icon: Icon, className = '' }) => (
  <div className={`group relative p-6 rounded-xl shadow-lg hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 hover:scale-105 ${className}`}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-white/80 group-hover:text-white transition-colors duration-300 drop-shadow-lg">{title}</p>
        <h3 className="text-2xl font-bold text-white mt-1 group-hover:text-white transition-colors duration-300 drop-shadow-lg">{value}</h3>
      </div>
      <div className="p-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 group-hover:bg-white/20 group-hover:shadow-lg group-hover:shadow-purple-300/50 transition-all duration-300">
        <Icon className="w-5 h-5 text-white group-hover:text-purple-200 transition-colors duration-300 drop-shadow-lg" />
      </div>
    </div>
    {/* Glow effect */}
    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/0 via-purple-500/5 to-pink-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
  </div>
);

const ReferralItem: React.FC<ReferralItemProps> = ({ name, code, uses, reward, isActive = true, maxUsage }) => (
  <div className="group flex items-center justify-between p-4 hover:bg-white/10 hover:backdrop-blur-md rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 hover:border hover:border-white/20">
    <div className="flex items-center gap-4">
      <div className={`w-10 h-10 rounded-full ${isActive ? 'bg-white/20 backdrop-blur-sm border border-white/30 group-hover:shadow-lg group-hover:shadow-purple-300/50 group-hover:bg-white/30' : 'bg-gray-500/20 border border-gray-400/30'} flex items-center justify-center transition-all duration-300`}>
        <span className={`font-semibold ${isActive ? 'text-white drop-shadow-lg group-hover:text-purple-200' : 'text-gray-300'} transition-colors duration-300`}>{code[0] || 'R'}</span>
      </div>
        <div>
          <p className="font-medium text-white group-hover:text-white transition-colors duration-300 drop-shadow-lg">{name}</p>
          <p className="text-sm text-white/70 group-hover:text-white/80 transition-colors duration-300 drop-shadow-lg">
            {code} • {isActive ? 'Active' : 'Inactive'} • {maxUsage ? `${maxUsage} max uses` : 'Unlimited'}
          </p>
        </div>
    </div>
    <div className="flex items-center gap-6">
      <div className="text-right">
        <p className="text-sm text-white/60 group-hover:text-white/80 transition-colors duration-300 drop-shadow-lg">Uses</p>
        <p className="font-medium text-white group-hover:text-white transition-colors duration-300 drop-shadow-lg">{uses}</p>
      </div>
      <div className="text-right">
        <p className="text-sm text-white/60 group-hover:text-white/80 transition-colors duration-300 drop-shadow-lg">Reward</p>
        <p className="font-medium text-white group-hover:text-white transition-colors duration-300 drop-shadow-lg">{reward}</p>
      </div>
      <ChevronRight className="w-5 h-5 text-white/50 group-hover:text-purple-300 transition-colors duration-300 drop-shadow-lg" />
    </div>
  </div>
);

const ReferralForm: React.FC<{ onClose: () => void; onSubmit: (data: ReferralFormData) => void }> = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState<ReferralFormData>({
    name: '',
    code: '',
    reward: '',
    maxUsage: undefined,
    category: 'general',
    description: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await onSubmit(formData);
    onClose();
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white/95 backdrop-blur-md rounded-xl p-6 w-full max-w-md relative">
        <button onClick={onClose} className="absolute right-4 top-4">
          <X className="w-5 h-5 text-slate-400" />
        </button>
        <h2 className="text-xl text-black font-semibold mb-4">Add New Referral</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-black font-medium mb-1">Service Name</label>
            <input
              type="text"
              className="w-full p-2 border rounded-lg bg-white/80 backdrop-blur-sm placeholder-black/70 text-black focus:bg-white/90 transition-all duration-300"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., Perplexity, Comet, Claude, Gemini"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-black font-medium mb-1">Referral Code</label>
            <input
              type="text"
              className="w-full p-2 border rounded-lg bg-white/80 backdrop-blur-sm placeholder-black/70 text-black focus:bg-white/90 transition-all duration-300"
              value={formData.code}
              onChange={(e) => setFormData({ ...formData, code: e.target.value })}
              placeholder="Enter unique referral code"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Reward (Optional)</label>
            <input
              type="text"
              className="w-full p-2 border rounded-lg bg-white/80 backdrop-blur-sm placeholder-black/70 text-black focus:bg-white/90 transition-all duration-300"
              value={formData.reward}
              onChange={(e) => setFormData({ ...formData, reward: e.target.value })}
              placeholder="e.g., 10 CELO bonus, 50 Points"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Max Usage (Optional)</label>
            <input
              type="number"
              className="w-full p-2 border rounded-lg bg-white/80 backdrop-blur-sm placeholder-black/70 text-black focus:bg-white/90 transition-all duration-300"
              value={formData.maxUsage || ''}
              onChange={(e) => setFormData({ ...formData, maxUsage: e.target.value ? parseInt(e.target.value) : undefined })}
              placeholder="Leave empty for unlimited"
              min="1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
            <select
              className="w-full p-2 border rounded-lg bg-white/80 backdrop-blur-sm text-black focus:bg-white/90 transition-all duration-300"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            >
              <option value="general">General</option>
              <option value="crypto">Crypto</option>
              <option value="ai">AI Tools</option>
              <option value="finance">Finance</option>
              <option value="education">Education</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Description (Optional)</label>
            <textarea
              className="w-full p-2 border rounded-lg bg-white/80 backdrop-blur-sm placeholder-black/70 text-black focus:bg-white/90 transition-all duration-300"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe your referral code..."
              rows={3}
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2 bg-gradient-to-r from-indigo-500/80 to-purple-600/80 backdrop-blur-sm text-white rounded-lg hover:from-indigo-600 hover:to-purple-700 hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 border border-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                Creating...
              </div>
            ) : (
              'Add Referral'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

const SearchReferralsModal: React.FC<{ onClose: () => void; onSelect: (code: string) => void }> = ({ onClose, onSelect }) => {
  const [isSearching, setIsSearching] = useState(true);
  const [availableReferrals, setAvailableReferrals] = useState<any[]>([]);
  const [selectedReferral, setSelectedReferral] = useState<any>(null);
  const [isSelecting, setIsSelecting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const { user } = useAuth();

  const loadAvailableReferrals = async () => {
    try {
      setIsSearching(true);
      const params = new URLSearchParams();
      if (searchTerm) params.append('search', searchTerm);
      if (category !== 'all') params.append('category', category);
      
      const response = await fetch(`/api/referrals/available?${params}`);
      const data = await response.json();
      
      if (data.success) {
        setAvailableReferrals(data.referrals);
      } else {
        console.error('Failed to load referrals:', data.error);
      }
    } catch (error) {
      console.error('Error loading referrals:', error);
    } finally {
      setIsSearching(false);
    }
  };

  useEffect(() => {
    loadAvailableReferrals();
  }, [searchTerm, category]);

  const handleSelectReferral = async (referral: any) => {
    if (!user?.id) {
      alert('Please log in to select a referral');
      return;
    }

    setIsSelecting(true);
    try {
      const response = await fetch('/api/referrals/select', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          referralId: referral.id,
          userId: user.id
        })
      });

      const data = await response.json();
      
      if (data.success) {
        setSelectedReferral({
          ...referral,
          provider: data.provider,
          pointsAwarded: data.pointsAwarded
        });
        alert(`Referral selected! Provider details revealed and ${data.pointsAwarded} points awarded to them.`);
      } else {
        alert(`Failed to select referral: ${data.error}`);
      }
    } catch (error) {
      console.error('Error selecting referral:', error);
      alert('Error selecting referral. Please try again.');
    } finally {
      setIsSelecting(false);
    }
  };

  return (
    <div className="fixed inset-0 pb-40 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white/95 backdrop-blur-md rounded-xl p-6 w-full max-w-2xl relative max-h-[80vh] overflow-y-auto">
        <button onClick={onClose} className="absolute right-4 top-4">
          <X className="w-5 h-5 text-slate-400" />
        </button>
        <h2 className="text-xl text-black font-semibold mb-4">Discover Referrals</h2>
        
        {/* Search and Filter */}
        <div className="mb-6 space-y-4">
          <div>
            <input
              type="text"
              placeholder="Search referrals..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 border rounded-lg bg-white/80 backdrop-blur-sm placeholder-black/70 text-black focus:bg-white/90 transition-all duration-300"
            />
          </div>
          <div>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-2 border rounded-lg bg-white/80 backdrop-blur-sm text-black focus:bg-white/90 transition-all duration-300"
            >
              <option value="all">All Categories</option>
              <option value="crypto">Crypto</option>
              <option value="ai">AI Tools</option>
              <option value="finance">Finance</option>
              <option value="education">Education</option>
              <option value="general">General</option>
            </select>
          </div>
        </div>
        
        {isSearching ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto mb-4"></div>
            <p className="text-slate-600">Searching for available referrals...</p>
          </div>
        ) : (
          <div className="space-y-4">
            {availableReferrals.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-slate-600">No referrals found matching your criteria</p>
              </div>
            ) : (
              availableReferrals.map((referral) => (
                <div key={referral.id} className="group p-4 border border-white/30 rounded-lg hover:bg-white/30 hover:border-white/50 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-medium text-slate-900 group-hover:text-black transition-colors duration-300">
                          {referral.name} - {referral.code}
                        </h3>
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                          {referral.category || 'general'}
                        </span>
                        {referral.isAvailable && (
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                            Available
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-slate-600 group-hover:text-slate-700 transition-colors duration-300">
                        {referral.reward || 'Standard reward'}
                      </p>
                      {referral.description && (
                        <p className="text-xs text-slate-500 mt-1">
                          {referral.description}
                        </p>
                      )}
                      <div className="flex items-center gap-4 mt-2 text-xs text-slate-500">
                        <span>Used: {referral.usageCount}</span>
                        {referral.maxUsage && (
                          <span>Max: {referral.maxUsage}</span>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <button
                        onClick={() => handleSelectReferral(referral)}
                        disabled={!referral.isAvailable || isSelecting}
                        className="px-4 py-2 bg-gradient-to-r from-indigo-500/80 to-purple-600/80 backdrop-blur-sm text-white rounded-lg hover:from-indigo-600 hover:to-purple-700 hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 border border-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSelecting ? 'Selecting...' : 'Select'}
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Selected Referral Details */}
        {selectedReferral && (
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <h3 className="font-semibold text-green-800 mb-2">Referral Selected!</h3>
            <div className="space-y-2 text-sm">
              <p><strong>Code:</strong> {selectedReferral.code}</p>
              <p><strong>Reward:</strong> {selectedReferral.reward}</p>
              <p><strong>Provider:</strong> {selectedReferral.provider?.phoneE164}</p>
              <p><strong>Points Awarded:</strong> {selectedReferral.pointsAwarded}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default function DashboardPage() {
  const [showForm, setShowForm] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [referrals, setReferrals] = useState<ReferralItemProps[]>(
    [
      { name: 'Welcome Offer', code: 'WELCOME50', uses: 24, reward: '50 Points', isActive: true, maxUsage: 100 },
      { name: 'Comet Launch', code: 'COMET25', uses: 16, reward: '25 Points', isActive: true, maxUsage: 50 },
      { name: 'Nexo Bonus', code: 'NEXO100', uses: 8, reward: '100 Points', isActive: true },
    ]
  );

  const { user, isAuthenticated } = useAuth();
  const { address, isConnected } = useAccount();

  // Load referrals from database
  const loadUserReferrals = async () => {
    if (!user?.id) return;

    try {
      console.log('Loading user referrals from database...');
      const response = await fetch(`/api/referrals/user?userId=${user.id}`);
      const data = await response.json();
      
      if (data.success) {
        console.log('Referrals loaded:', data.referrals);
            setReferrals(data.referrals.map((ref: any) => ({
              name: ref.name || 'Unknown Service',
              code: ref.code,
              uses: ref.usageCount || 0,
              reward: ref.reward || 'Standard reward',
              isActive: ref.isActive !== false,
              maxUsage: ref.maxUsage
            })));
      } else {
        console.error('Failed to load referrals:', data.error);
      }
    } catch (error) {
      console.error('Error loading referrals:', error);
    }
  };

  // Load referrals when user is authenticated
  useEffect(() => {
    if (user?.id) {
      loadUserReferrals();
    }
  }, [user?.id]);

  const copyToClipboard = async (text: string, type: 'address' | 'phone') => {
    try {
      await navigator.clipboard.writeText(text);
      if (type === 'address') {
        setCopiedAddress(true);
        setTimeout(() => setCopiedAddress(false), 2000);
      } else {
        setCopiedPhone(true);
        setTimeout(() => setCopiedPhone(false), 2000);
      }
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleNewReferral = async (data: ReferralFormData) => {
    if (!user?.id) {
      console.error('User not authenticated');
      return;
    }

    try {
      console.log('Creating referral in database...');
      const response = await fetch('/api/referrals/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          code: data.code,
          reward: data.reward || 'Standard reward',
          maxUsage: data.maxUsage,
          category: data.category || 'general',
          description: data.description || '',
          userId: user.id
        })
      });

      const result = await response.json();
      
      if (result.success) {
        console.log('Referral created successfully:', result.referral);
            // Add to local state
            setReferrals([...referrals, { 
              name: data.name,
              code: result.referral.code, 
              uses: result.referral.usageCount || 0, 
              reward: result.referral.reward || 'Standard reward',
              isActive: result.referral.isActive !== false,
              maxUsage: result.referral.maxUsage
            }]);
      } else {
        console.error('Failed to create referral:', result.error);
        
        // Check if it's a database schema issue
        if (result.error.includes('Database schema not updated')) {
          alert('Database needs to be updated. Please contact support or try again later.');
        } else {
          // Fallback: Store in localStorage temporarily
          console.log('Storing referral in localStorage as fallback...');
              const tempReferral = {
                name: data.name,
                code: data.code,
                uses: 0,
                reward: data.reward || 'Standard reward',
                temp: true // Mark as temporary
              };
          
          setReferrals([...referrals, tempReferral]);
          alert('Referral saved temporarily. Database will be updated soon.');
        }
      }
    } catch (error) {
      console.error('Error creating referral:', error);
      alert('Error creating referral. Please try again.');
    }
  };

  return (
    <div className="relative min-h-screen">
      {/* Animated Liquid Background */}
      <div className="fixed inset-0 z-0">
        <LiquidEther
          mouseForce={20}
          cursorSize={100}
          isViscous={false}
          viscous={30}
          iterationsViscous={32}
          iterationsPoisson={32}
          dt={0.014}
          BFECC={true}
          resolution={0.5}
          isBounce={false}
          colors={['#5227FF', '#FF9FFC', '#B19EEF']}
          autoDemo={true}
          autoSpeed={0.5}
          autoIntensity={2.2}
          takeoverDuration={0.25}
          autoResumeDelay={1000}
          autoRampDuration={0.6}
          className="w-full h-full"
        />
      </div>
      
      {/* Navigation */}
      <Navigation variant="glass" />
      
      {/* Main Content */}
      <div className="relative z-10 p-6 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-white drop-shadow-lg">Dashboard</h1>
        <div className="flex items-center gap-3">
          {/* User Data Modal Button */}
          {(isAuthenticated || isConnected) && (
            <Button
              variant="outline"
              onClick={() => setShowUserModal(true)}
              className="flex items-center gap-2"
            >
              <User className="h-4 w-4" />
              My Profile
            </Button>
          )}
        <button
          onClick={() => setShowForm(true)}
            className="px-4 py-2 bg-gradient-to-r from-indigo-500/80 to-purple-600/80 backdrop-blur-sm text-white rounded-lg hover:from-indigo-600 hover:to-purple-700 hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 border border-white/20"
        >
          Add Referral
        </button>
      </div>
      </div>

      {/* Wallet & User Info Section */}
      {(isAuthenticated || isConnected) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Wallet Info Card */}
            {isConnected && address && (
              <Card className="group border-2 border-white/30 bg-white/20 backdrop-blur-md hover:bg-white/30 hover:border-white/50 hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg text-slate-900 group-hover:text-black transition-colors duration-300">
                    <Wallet className="h-5 w-5 text-blue-600 group-hover:text-blue-700 transition-colors duration-300" />
                    Wallet Connected
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-slate-700 group-hover:text-slate-800 mb-1 transition-colors duration-300">Wallet Address</p>
                      <div className="flex items-center gap-2">
                        <code className="text-sm bg-white/80 backdrop-blur-sm px-3 py-1 rounded border border-white/30 flex-1 font-mono text-black">
                          {address.slice(0, 6)}...{address.slice(-4)}
                        </code>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => copyToClipboard(address, 'address')}
                          className="h-8 w-8 p-0"
                        >
                          {copiedAddress ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-green-600">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      Connected to Celo Network
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* User Info Card */}
            {isAuthenticated && user && (
              <Card className="group border-2 border-white/30 bg-white/20 backdrop-blur-md hover:bg-white/30 hover:border-white/50 hover:shadow-xl hover:shadow-green-500/20 transition-all duration-300">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg text-slate-900 group-hover:text-black transition-colors duration-300">
                    <User className="h-5 w-5 text-green-600 group-hover:text-green-700 transition-colors duration-300" />
                    User Profile
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-slate-700 group-hover:text-slate-800 mb-1 transition-colors duration-300">Phone Number</p>
                      <div className="flex items-center gap-2">
                        <code className="text-sm bg-white/80 backdrop-blur-sm px-3 py-1 rounded border border-white/30 flex-1 font-mono text-black">
                          {user.phoneE164}
                        </code>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => copyToClipboard(user.phoneE164, 'phone')}
                          className="h-8 w-8 p-0"
                        >
                          {copiedPhone ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-slate-700 group-hover:text-slate-800 mb-1 transition-colors duration-300">Phone Hash</p>
                      <code className="text-xs bg-white/80 backdrop-blur-sm px-2 py-1 rounded border border-white/30 font-mono block text-black">
                        {user.phoneHash?.slice(0, 10)}...
                      </code>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-green-600">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      Registered in Database
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </motion.div>
      )}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <DashboardCard title="Total Referrals" value={`${referrals.length}`} icon={Users} />
        <DashboardCard title="Pending Approval" value="2" icon={ArrowUpRight} className="bg-yellow-50" />
        <DashboardCard title="Total Rewards" value="150 Points" icon={Gift} className="bg-green-50" />
      </div>

      <div className="rounded-xl p-6 transition-all duration-300">
        <h2 className="text-xl text-white font-semibold mb-4 drop-shadow-lg">My Referrals</h2>
        
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={() => setShowSearchModal(true)}
            className="px-4 py-2 bg-gradient-to-r from-indigo-500/80 to-purple-600/80 backdrop-blur-sm text-white rounded-lg hover:from-indigo-600 hover:to-purple-700 hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 border border-white/20"
          >
            Search Referrals
          </button>
        </div>

        <div className="space-y-4">
          {referrals.map((referral, idx) => (
            <ReferralItem key={idx} {...referral} />
          ))}
        </div>
      </div>

      {/* Program Cards Section */}
      <div className="mt-12">
        <ProgramCards />
      </div>

      {/* Modals */}
      {showForm && <ReferralForm onClose={() => setShowForm(false)} onSubmit={handleNewReferral} />}
      {showSearchModal && (
        <SearchReferralsModal 
          onClose={() => setShowSearchModal(false)} 
          onSelect={(code) => {
            setShowSearchModal(false);
            // Handle referral code selection
          }}
        />
      )}
      {showUserModal && (
        <UserDataModal 
          isOpen={showUserModal} 
          onClose={() => setShowUserModal(false)} 
        />
      )}

      {/* Footer */}
      <Footer variant="glass" />
      </div>
    </div>
  );
}