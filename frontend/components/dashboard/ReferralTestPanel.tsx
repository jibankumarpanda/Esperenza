'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';

interface TestResult {
  test: string;
  status: 'pending' | 'success' | 'error';
  message: string;
}

export default function ReferralTestPanel() {
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState<TestResult[]>([]);

  const runTests = async () => {
    setIsRunning(true);
    setResults([]);

    const tests: TestResult[] = [
      { test: 'Fetch Available Referrals', status: 'pending', message: 'Testing API endpoint...' },
      { test: 'Create Test Referral', status: 'pending', message: 'Creating test referral...' },
      { test: 'Select Referral', status: 'pending', message: 'Testing referral selection...' },
    ];

    setResults([...tests]);

    try {
      // Test 1: Fetch available referrals
      try {
        const response = await fetch('/api/referrals/available');
        const data = await response.json();
        
        if (data.success) {
          tests[0] = { 
            test: 'Fetch Available Referrals', 
            status: 'success', 
            message: `✅ Found ${data.referrals.length} referrals` 
          };
        } else {
          tests[0] = { 
            test: 'Fetch Available Referrals', 
            status: 'error', 
            message: `❌ ${data.error}` 
          };
        }
      } catch (error) {
        tests[0] = { 
          test: 'Fetch Available Referrals', 
          status: 'error', 
          message: `❌ Network error: ${error}` 
        };
      }

      setResults([...tests]);

      // Test 2: Create test referral
      try {
        const testReferral = {
          name: 'Test Service',
          code: `TEST${Date.now()}`,
          reward: '100 Points',
          maxUsage: 5,
          category: 'general',
          description: 'Test referral for system testing',
          userId: 1
        };

        const response = await fetch('/api/referrals/create', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(testReferral)
        });

        const data = await response.json();

        if (data.success) {
          tests[1] = { 
            test: 'Create Test Referral', 
            status: 'success', 
            message: `✅ Created referral: ${data.referral.code}` 
          };
          
          // Test 3: Select the referral
          try {
            const selectResponse = await fetch('/api/referrals/select', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                referralId: data.referral.id,
                userId: 2
              })
            });

            const selectData = await selectResponse.json();

            if (selectData.success) {
              tests[2] = { 
                test: 'Select Referral', 
                status: 'success', 
                message: `✅ Selected referral, awarded ${selectData.pointsAwarded} points` 
              };
            } else {
              tests[2] = { 
                test: 'Select Referral', 
                status: 'error', 
                message: `❌ ${selectData.error}` 
              };
            }
          } catch (error) {
            tests[2] = { 
              test: 'Select Referral', 
              status: 'error', 
              message: `❌ Selection error: ${error}` 
            };
          }
        } else {
          tests[1] = { 
            test: 'Create Test Referral', 
            status: 'error', 
            message: `❌ ${data.error}` 
          };
        }
      } catch (error) {
        tests[1] = { 
          test: 'Create Test Referral', 
          status: 'error', 
          message: `❌ Creation error: ${error}` 
        };
      }

      setResults([...tests]);

    } catch (error) {
      console.error('Test suite error:', error);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Loader2 className={`w-5 h-5 ${isRunning ? 'animate-spin' : ''}`} />
          Referral System Test Panel
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Button 
            onClick={runTests} 
            disabled={isRunning}
            className="w-full"
          >
            {isRunning ? 'Running Tests...' : 'Run Referral System Tests'}
          </Button>

          {results.length > 0 && (
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">Test Results:</h3>
              {results.map((result, index) => (
                <div key={index} className="flex items-center gap-3 p-3 rounded-lg border">
                  {result.status === 'success' && <CheckCircle className="w-5 h-5 text-green-600" />}
                  {result.status === 'error' && <XCircle className="w-5 h-5 text-red-600" />}
                  {result.status === 'pending' && <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />}
                  
                  <div className="flex-1">
                    <div className="font-medium">{result.test}</div>
                    <div className="text-sm text-gray-600">{result.message}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
            <strong>What this tests:</strong>
            <ul className="mt-2 space-y-1">
              <li>• API endpoints are accessible</li>
              <li>• Database connections work</li>
              <li>• Referral creation and selection flow</li>
              <li>• Points awarding system</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
