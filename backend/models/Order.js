import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],
  address: {
    fullName: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    addressLine: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    pinCode: {
      type: String,
      required: true,
    },
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  paymentMethod: {
    type: String,
    default: 'Cash on Delivery',
  },
  status: {
    type: String,
    default: 'Placed',
  },
}, { timestamps: true });

export default mongoose.model('Order', orderSchema);
