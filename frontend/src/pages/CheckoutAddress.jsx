import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

export default function CheckoutAddress() {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    addressLine: '',
    city: '',
    state: '',
    pincode: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const saveAddress = async (e) => {
    e.preventDefault();
    if (!userId) {
      navigate('/login');
      return;
    }

    try {
      await api.post('/address/add', { ...form, user: userId });
      navigate('/checkout');
    } catch (error) {
      console.error('Error saving address:', error);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Delivery Address</h1>
      <form onSubmit={saveAddress} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="fullName">
            Full Name
          </label>
          <input
            id="fullName"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            className="border rounded p-3 w-full"
            placeholder="Full Name"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="phone">
            Phone Number
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            className="border rounded p-3 w-full"
            placeholder="Phone Number"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="addressLine">
            Address Line
          </label>
          <input
            id="addressLine"
            name="addressLine"
            value={form.addressLine}
            onChange={handleChange}
            className="border rounded p-3 w-full"
            placeholder="Address Line"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="city">
              City
            </label>
            <input
              id="city"
              name="city"
              value={form.city}
              onChange={handleChange}
              className="border rounded p-3 w-full"
              placeholder="City"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="state">
              State
            </label>
            <input
              id="state"
              name="state"
              value={form.state}
              onChange={handleChange}
              className="border rounded p-3 w-full"
              placeholder="State"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="pincode">
            PIN Code
          </label>
          <input
            id="pincode"
            name="pincode"
            type="text"
            value={form.pincode}
            onChange={handleChange}
            className="border rounded p-3 w-full"
            placeholder="PIN Code"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded px-4 py-3 w-full"
        >
          Save Address
        </button>
      </form>
    </div>
  );
}
