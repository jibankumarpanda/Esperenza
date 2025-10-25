'use client';
import { PaymentForm } from './PaymentForm';
import { PhoneRegistrationForm } from './PhoneRegistrationForm';
import { ContractInfo } from './ContractInfo';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function ContractDashboard() {
  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Smart Contract Dashboard</h1>
        <p className="text-gray-600">Manage payments and phone number registrations</p>
      </div>

      {/* Contract Information */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Contract Information</h2>
        <ContractInfo />
      </section>

      {/* Payment Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Payment Management</h2>
        <div className="flex justify-center">
          <PaymentForm />
        </div>
      </section>

      {/* Phone Registration Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Phone Number Management</h2>
        <PhoneRegistrationForm />
      </section>

      {/* API Endpoints Documentation */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">API Endpoints</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Payment</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-2">POST /api/payment</p>
              <p className="text-xs">Send payments with automatic 1% eco donation</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Phone Register</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-2">POST /api/phone/register</p>
              <p className="text-xs">Register phone number to wallet mapping</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Phone Lookup</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-2">POST /api/phone/lookup</p>
              <p className="text-xs">Lookup wallet address by phone number</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Contract Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-2">GET /api/contract/balance</p>
              <p className="text-xs">Get current contract balance</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Eco Fund</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-2">GET /api/contract/ecofund</p>
              <p className="text-xs">Get eco fund address</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Verify Transaction</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-2">POST /api/transaction/verify</p>
              <p className="text-xs">Verify transaction status</p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
