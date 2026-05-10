import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function OrderSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const orderId = location.state?.orderId;

  useEffect(() => {
    if (!orderId) {
      navigate('/');
    }
  }, [orderId, navigate]);

  if (!orderId) {
    return null;
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-6 text-center">
      <div className="mb-6 rounded-full bg-green-100 p-6 text-green-700">
        <svg className="h-16 w-16" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      </div>
      <h1 className="text-4xl font-bold text-gray-900">Order Placed!</h1>
      <p className="mt-2 text-gray-600">Thank you for your purchase. Your order is now being processed.</p>

      <div className="mt-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <p className="text-sm uppercase tracking-wide text-gray-500">Order ID</p>
        <p className="mt-2 font-mono text-lg font-semibold text-gray-900">{orderId}</p>
      </div>

      <button
        type="button"
        onClick={() => navigate('/')}
        className="mt-8 rounded-full bg-blue-600 px-8 py-3 text-white transition hover:bg-blue-700"
      >
        Continue Shopping
      </button>
    </div>
  );
}
