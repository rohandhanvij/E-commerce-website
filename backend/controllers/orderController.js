import Order from '../models/Order.js';
import Cart from '../models/Cart.js';
import Product from '../models/product.js';

export const placeOrder = async (req, res) => {
  try {
    const { userId, address } = req.body;

    const cart = await Cart.findOne({ userid: userId }).populate('items.productID');

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    const orderItems = cart.items.map((item) => ({
      productId: item.productID._id,
      quantity: item.quantity,
      price: item.productID.price,
    }));

    const totalAmount = orderItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    for (const item of cart.items) {
      await Product.findByIdAndUpdate(item.productID._id, {
        $inc: { stock: -item.quantity },
      });
    }

    const order = await Order.create({
      user: userId,
      items: orderItems,
      address: {
        fullName: address.fullName,
        phone: address.phone,
        addressLine: address.addressLine,
        city: address.city,
        state: address.state,
        pinCode: address.pinCode || address.pincode,
      },
      totalAmount,
      paymentMethod: 'Cash on Delivery',
    });

    cart.items = [];
    await cart.save();

    res.status(201).json({
      message: 'Order placed successfully',
      orderId: order._id,
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
