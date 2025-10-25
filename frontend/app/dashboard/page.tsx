'use client';

import { motion } from 'framer-motion';
import { Wallet, Gift, Users, ArrowUpRight, ChevronRight, X, Search, Phone, User, Copy, Check } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useAccount } from 'wagmi';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Types
interface DashboardCardProps {
  title: string;
  value: string;
  icon: React.ComponentType<any>;
  className?: string;
}

interface ReferralItemProps {
  code: string;
  platform: string;
  uses: number;
  reward: string;
}

interface ReferralFormData {
  platform: string;
  code: string;
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
  <div className={`p-6 rounded-xl bg-white shadow-sm border border-slate-100 ${className}`}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-slate-500">{title}</p>
        <h3 className="text-2xl font-bold text-slate-900 mt-1">{value}</h3>
      </div>
      <div className="p-3 rounded-lg bg-indigo-50">
        <Icon className="w-5 h-5 text-indigo-600" />
      </div>
    </div>
  </div>
);

const ReferralItem: React.FC<ReferralItemProps> = ({ code, platform, uses, reward }) => (
  <div className="flex items-center justify-between p-4 hover:bg-slate-50 rounded-lg transition-colors">
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
        <span className="font-semibold text-indigo-600">{platform[0]}</span>
      </div>
      <div>
        <p className="font-medium text-slate-900">{code}</p>
        <p className="text-sm text-slate-500">{platform}</p>
      </div>
    </div>
    <div className="flex items-center gap-6">
      <div className="text-right">
        <p className="text-sm text-slate-500">Uses</p>
        <p className="font-medium text-slate-900">{uses}</p>
      </div>
      <div className="text-right">
        <p className="text-sm text-slate-500">Reward</p>
        <p className="font-medium text-slate-900">{reward}</p>
      </div>
      <ChevronRight className="w-5 h-5 text-slate-400" />
    </div>
  </div>
);

const ReferralForm: React.FC<{ onClose: () => void; onSubmit: (data: ReferralFormData) => void }> = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState<ReferralFormData>({
    platform: '',
    code: '',
    description: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md relative">
        <button onClick={onClose} className="absolute right-4 top-4">
          <X className="w-5 h-5 text-slate-400" />
        </button>
        <h2 className="text-xl text-black font-semibold mb-4">Add New Referral</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Platform</label>
            <select
              className="w-full p-2 border rounded-lg"
              value={formData.platform}
              onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
              required
            >
              <option value="text-black" className='black'>Select Platform</option>
              {PLATFORMS.map((platform) => (
                <option className='text-black' key={platform.id} value={platform.id}>
                  {platform.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm text-black font-medium text-black-700 mb-1">Referral Code</label>
            <input
              type="text"
              className="w-full p-2 border rounded-lg"
              value={formData.code}
              onChange={(e) => setFormData({ ...formData, code: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Description (Optional)</label>
            <textarea
              className="w-full p-2 border rounded-lg"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Add Referral
          </button>
        </form>
      </div>
    </div>
  );
};

const SearchReferralsModal: React.FC<{ onClose: () => void; onSelect: (code: string) => void }> = ({ onClose, onSelect }) => {
  const [isSearching, setIsSearching] = useState(true);
  const [availableReferrals, setAvailableReferrals] = useState<AvailableReferral[]>([]);

  useEffect(() => {
    // Simulate API call with setTimeout
    const timer = setTimeout(() => {
      setIsSearching(false);
      setAvailableReferrals([
        { id: '1', platform: 'ChatGPT Plus', code: 'CHAT2024', owner: 'Alex M.', rating: 4.8, usesLeft: 5 },
        { id: '2', platform: 'Gemini', code: 'GEM50NEW', owner: 'Sarah K.', rating: 4.9, usesLeft: 3 },
        { id: '3', platform: 'Claude AI', code: 'CLAUDE25', owner: 'John D.', rating: 4.7, usesLeft: 8 },
        { id: '4', platform: 'Comet', code: 'COMET2024', owner: 'Maria R.', rating: 4.6, usesLeft: 4 },
      ]);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md relative">
        <button onClick={onClose} className="absolute right-4 top-4">
          <X className="w-5 h-5 text-slate-400" />
        </button>
        <h2 className="text-xl text-black font-semibold mb-4">Available Referrals</h2>
        
        {isSearching ? (
          <div className="py-12 flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
            <p className="text-slate-600">Searching for available referrals...</p>
          </div>
        ) : (
          <div className="space-y-4">
            {availableReferrals.map((referral) => (
              <div 
                key={referral.id} 
                className="p-4 border rounded-lg hover:border-indigo-200 transition-colors cursor-pointer"
                onClick={() => onSelect(referral.code)}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium text-slate-900">{referral.platform}</h3>
                    <p className="text-sm text-slate-500">By {referral.owner}</p>
                  </div>
                  <div className="flex items-center gap-1 text-amber-500">
                    <span>★</span>
                    <span className="text-sm">{referral.rating}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <code className="text-sm bg-slate-100 px-2 py-1 rounded">{referral.code}</code>
                  <span className="text-sm text-slate-500">{referral.usesLeft} uses left</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default function DashboardPage() {
  const [showForm, setShowForm] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [referrals, setReferrals] = useState<ReferralItemProps[]>(
    [
      { code: 'GEMINI50', platform: 'Gemini', uses: 24, reward: '50 Points' },
      { code: 'COMET25', platform: 'Comet', uses: 16, reward: '25 Points' },
      { code: 'NEXO100', platform: 'Nexo', uses: 8, reward: '100 Points' },
    ]
  );

  const { user, isAuthenticated } = useAuth();
  const { address, isConnected } = useAccount();

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

  const handleNewReferral = (data: ReferralFormData) => {
    const platform = PLATFORMS.find(p => p.id === data.platform);
    if (platform) {
      setReferrals([...referrals, { code: data.code, platform: platform.name, uses: 0, reward: platform.reward }]);
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-White-900">Dashboard</h1>
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Add Referral
        </button>
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
              <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Wallet className="h-5 w-5 text-blue-600" />
                    Wallet Connected
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Wallet Address</p>
                      <div className="flex items-center gap-2">
                        <code className="text-sm bg-white px-3 py-1 rounded border flex-1 font-mono">
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
              <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <User className="h-5 w-5 text-green-600" />
                    User Profile
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Phone Number</p>
                      <div className="flex items-center gap-2">
                        <code className="text-sm bg-white px-3 py-1 rounded border flex-1 font-mono">
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
                      <p className="text-sm text-gray-600 mb-1">Phone Hash</p>
                      <code className="text-xs bg-white px-2 py-1 rounded border font-mono block">
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

      <div className="bg-white rounded-xl p-6 shadow-md">
        <h2 className="text-xl text-black font-semibold mb-4">My Referrals</h2>
        
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={() => setShowSearchModal(true)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
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
    </div>
  );
}