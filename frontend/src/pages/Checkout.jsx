import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

export default function Checkout() {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [cart, setCart] = useState(null);

  useEffect(() => {
    if (!userId) {
      navigate('/login');
      return;
    }

    api.get(`/cart/${userId}`)
      .then((res) => setCart(res.data))
      .catch((err) => console.error('Failed to load cart:', err));

    api.get(`/address/${userId}`)
      .then((res) => {
        setAddresses(res.data);
        if (res.data.length > 0) {
          setSelectedAddress(res.data[0]);
        }
      })
      .catch((err) => console.error('Failed to load addresses:', err));
  }, [userId, navigate]);

  const handlePlaceOrder = async () => {
    if (!selectedAddress) {
      alert('Please select an address!');
      return;
    }

    try {
      const response = await api.post('/order/place', {
        userId,
        address: selectedAddress,
      });

      if (response.status === 201) {
        window.dispatchEvent(new Event('cartUpdated'));
        navigate('/order-success', {
          state: { orderId: response.data.orderId },
        });
      }
    } catch (error) {
      console.error('Order failed', error);
      alert('Failed to place order. Please try again.');
    }
  };

  if (!cart) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Checkout</h1>
        <p>Loading your checkout details...</p>
      </div>
    );
  }

  const total = cart.items?.reduce((sum, item) => sum + item.quantity * (item.productID?.price || 0), 0) ?? 0;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      <div className="grid gap-6 lg:grid-cols-2">
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold">Delivery Address</h2>
            <button
              type="button"
              onClick={() => navigate('/checkout-address')}
              className="text-blue-600 hover:text-blue-800"
            >
              Add New Address
            </button>
          </div>

          {addresses.length === 0 ? (
            <div className="rounded border border-dashed border-gray-300 p-6 text-center text-gray-600">
              No saved addresses found. Add one to continue.
            </div>
          ) : (
            <div className="space-y-3">
              {addresses.map((addr) => (
                <div
                  key={addr._id}
                  onClick={() => setSelectedAddress(addr)}
                  className={`cursor-pointer rounded-lg border p-4 ${
                    selectedAddress?._id === addr._id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                  }`}
                >
                  <p className="font-semibold">{addr.fullName}</p>
                  <p>{addr.addressLine}</p>
                  <p>{addr.city}, {addr.state} - {addr.pincode}</p>
                  <p className="text-sm text-gray-500">Phone: {addr.phone}</p>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Total Items:</span>
              <span>{cart.items.length}</span>
            </div>
            <div className="border-t pt-4 text-lg font-bold flex justify-between">
              <span>Grand Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handlePlaceOrder}
            disabled={!selectedAddress}
            className={`mt-6 w-full rounded-lg py-3 text-white font-semibold transition ${
              selectedAddress ? 'bg-orange-500 hover:bg-orange-600' : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            Place Order (Cash on Delivery)
          </button>

          {!selectedAddress && (
            <p className="mt-3 text-sm text-gray-500">Select an address to place your order.</p>
          )}
        </section>
      </div>
    </div>
  );
}
