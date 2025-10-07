import React from 'react';
import { FLAGS } from '@/lib/flags';

export default function AdminTest() {
  return (
    <div className="min-h-screen bg-cream-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Admin Debug Information</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Environment Variables</h2>
          <div className="space-y-2">
            <p><strong>REQUIRE_ADMIN_AUTH:</strong> {FLAGS.REQUIRE_ADMIN_AUTH ? 'true' : 'false'}</p>
            <p><strong>ADMIN_ALLOWED_EMAILS:</strong> {JSON.stringify(FLAGS.ADMIN_ALLOWED_EMAILS)}</p>
            <p><strong>VITE_ADMIN_PASSWORD:</strong> {import.meta.env.VITE_ADMIN_PASSWORD ? 'Set' : 'Not set'}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">All Environment Variables</h2>
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
            {JSON.stringify(import.meta.env, null, 2)}
          </pre>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Quick Access</h2>
          <div className="space-y-2">
            <a href="/admin" className="block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Go to Admin Dashboard
            </a>
            <a href="/admin-test" className="block bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
              This Debug Page
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
