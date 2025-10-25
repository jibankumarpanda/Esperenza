'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Gift, 
  Users, 
  Star, 
  TrendingUp, 
  DollarSign, 
  Globe, 
  Shield, 
  Zap,
  Award,
  Target,
  Building,
  Heart
} from 'lucide-react';

interface ProgramCardProps {
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  category: string;
  reward: string;
  participants: number;
  status: 'active' | 'coming-soon' | 'limited';
  color: string;
  bgColor: string;
  borderColor: string;
}

const programCards: ProgramCardProps[] = [
  {
    title: "Gemini Referral Program",
    description: "Earn 50 points for each successful Gemini exchange referral. Perfect for crypto enthusiasts.",
    icon: Gift,
    category: "Crypto Exchange",
    reward: "50 Points",
    participants: 1240,
    status: 'active',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200'
  },
  {
    title: "ChatGPT Plus Referral",
    description: "Get 30 points for referring friends to ChatGPT Plus. Help others discover AI productivity.",
    icon: Star,
    category: "AI Tools",
    reward: "30 Points",
    participants: 890,
    status: 'active',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200'
  },
  {
    title: "Claude AI Ambassador",
    description: "Join our Claude AI ambassador program and earn 40 points per referral.",
    icon: Award,
    category: "AI Assistant",
    reward: "40 Points",
    participants: 567,
    status: 'active',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200'
  },
  {
    title: "Comet Referral Network",
    description: "Earn 25 points for each Comet platform referral. Great for developers and creators.",
    icon: Zap,
    category: "Development",
    reward: "25 Points",
    participants: 432,
    status: 'active',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200'
  },
  {
    title: "Nexo Premium Program",
    description: "Earn 100 points for each Nexo premium referral. High-value crypto banking referrals.",
    icon: Building,
    category: "Crypto Banking",
    reward: "100 Points",
    participants: 234,
    status: 'limited',
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200'
  },
  {
    title: "SoFi Financial Services",
    description: "Earn varying rewards ($50-$500) for SoFi financial service referrals.",
    icon: DollarSign,
    category: "Financial Services",
    reward: "$50-$500",
    participants: 1890,
    status: 'active',
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-200'
  },
  {
    title: "Acorns Investment App",
    description: "Earn 5 points for each Acorns investment app referral. Perfect for investment beginners.",
    icon: TrendingUp,
    category: "Investment",
    reward: "5 Points",
    participants: 3456,
    status: 'active',
    color: 'text-teal-600',
    bgColor: 'bg-teal-50',
    borderColor: 'border-teal-200'
  },
  {
    title: "Coursera Learning",
    description: "Earn 50% off coupons for Coursera course referrals. Help others learn new skills.",
    icon: Globe,
    category: "Education",
    reward: "50% Off",
    participants: 1234,
    status: 'active',
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50',
    borderColor: 'border-indigo-200'
  },
  {
    title: "Dropbox Storage Bonus",
    description: "Earn storage bonuses for Dropbox referrals. Perfect for teams and professionals.",
    icon: Shield,
    category: "Cloud Storage",
    reward: "Storage Bonus",
    participants: 2789,
    status: 'active',
    color: 'text-cyan-600',
    bgColor: 'bg-cyan-50',
    borderColor: 'border-cyan-200'
  },
  {
    title: "Swagbucks Rewards",
    description: "Earn 10% SB bonus for Swagbucks referrals. Great for online earning opportunities.",
    icon: Target,
    category: "Rewards",
    reward: "10% SB",
    participants: 4567,
    status: 'active',
    color: 'text-pink-600',
    bgColor: 'bg-pink-50',
    borderColor: 'border-pink-200'
  },
  {
    title: "Amber Housing (UK)",
    description: "Earn £50 vouchers for Amber housing referrals. Perfect for UK students and professionals.",
    icon: Heart,
    category: "Housing",
    reward: "£50 Voucher",
    participants: 123,
    status: 'limited',
    color: 'text-amber-600',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200'
  }
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'active':
      return <Badge className="bg-green-100 text-green-800">Active</Badge>;
    case 'limited':
      return <Badge className="bg-yellow-100 text-yellow-800">Limited</Badge>;
    case 'coming-soon':
      return <Badge className="bg-gray-100 text-gray-800">Coming Soon</Badge>;
    default:
      return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>;
  }
};

export function ProgramCards() {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Referral Programs</h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Discover amazing referral programs and earn rewards for sharing great services with your network.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {programCards.map((program, index) => (
          <motion.div
            key={program.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className={`border-2 ${program.borderColor} hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}>
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className={`p-3 ${program.bgColor} rounded-lg w-fit`}>
                    <program.icon className={`h-6 w-6 ${program.color}`} />
                  </div>
                  {getStatusBadge(program.status)}
                </div>
                <CardTitle className="text-lg font-semibold text-slate-900">
                  {program.title}
                </CardTitle>
                <p className="text-sm text-slate-600">
                  {program.description}
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-700">Category</span>
                  <Badge variant="outline" className="text-xs">
                    {program.category}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-700">Reward</span>
                  <span className={`font-semibold ${program.color}`}>
                    {program.reward}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-700">Participants</span>
                  <span className="text-sm text-slate-600">
                    {program.participants.toLocaleString()}
                  </span>
                </div>
                
                <Button 
                  className="w-full" 
                  variant="outline"
                  disabled={program.status === 'coming-soon'}
                >
                  {program.status === 'coming-soon' ? 'Coming Soon' : 'View Details'}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
