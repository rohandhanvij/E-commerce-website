import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

export default function Cart() {
    const navigate = useNavigate();
    const userid = localStorage.getItem('userId');
    const [cart, setCart] = useState({ items: [] });

    // Load cart items
    const loadCart = async () => {
        if (!userid) return;
        try {
            const res = await api.get(`/cart/${userid}`);
            setCart(res.data);
        } catch (error) {
            console.error('Failed to load cart:', error);
        }
    };

    useEffect(() => {
        loadCart();
    }, []);

    const removeItem = async (productId) => {
        try {
            await api.post(`/cart/remove`, { userid, productId });
            loadCart();
            window.dispatchEvent(new Event('cartUpdated'));
        } catch (error) {
            console.error('Failed to remove item:', error);
        }
    };

    // Update item quantity
    const updateQTY = async (productId, quantity) => {
        if (quantity === 0) {
            await removeItem(productId);
            return;
        }

        try {
            await api.post(`/cart/update`, { userid, productId, quantity });
            loadCart();
            window.dispatchEvent(new Event('cartUpdated'));
        } catch (error) {
            console.error('Failed to update quantity:', error);
        }
    };

    if (!userid) {
        return (
            <div className="max-w-4xl mx-auto p-6">
                <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
                <p className="text-gray-600">Please log in to view your cart.</p>
            </div>
        );
    }

    if (cart.items.length === 0) {
        return (
            <div className="max-w-4xl mx-auto p-6">
                <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
                <p className="text-gray-600">Your cart is empty.</p>
            </div>
        );
    }

    const totalPrice = cart.items.reduce((total, item) => total + item.product.price * item.quantity, 0);

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

            <div className="space-y-4">
                {cart.items.map((item) => (
                    <div key={item.product._id} className="flex items-center justify-between gap-4 border-b border-gray-200 pb-4">
                        <div className="flex items-center gap-4 flex-1">
                            <img src={item.product.image} alt={item.product.title} className="w-20 h-20 object-cover rounded" />
                            <div>
                                <h2 className="text-lg font-semibold">{item.product.title}</h2>
                                <p className="text-gray-600">${item.product.price.toFixed(2)}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => updateQTY(item.product._id, item.quantity - 1)}
                                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                            >
                                −
                            </button>
                            <span className="w-8 text-center font-semibold">{item.quantity}</span>
                            <button
                                onClick={() => updateQTY(item.product._id, item.quantity + 1)}
                                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                            >
                                +
                            </button>
                        </div>
                        <p className="font-semibold w-24 text-right">${(item.product.price * item.quantity).toFixed(2)}</p>
                        <button
                            onClick={() => removeItem(item.product._id)}
                            className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                        >
                            Remove
                        </button>
                    </div>
                ))}
            </div>
            <div className="mt-6 border-t border-gray-200 pt-4">
                <div className="text-2xl font-bold text-right">
                    Total: ${totalPrice.toFixed(2)}
                </div>
                <button
                    onClick={() => navigate('/checkout-address')}
                    className="mt-4 w-full bg-blue-500 text-white px-4 py-3 rounded hover:bg-blue-600"
                >
                    Proceed To Checkout
                </button>
            </div>
        </div>
    );
}
