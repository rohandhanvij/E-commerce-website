import Cart from "../models/Cart.js";
//  add to cart
export const addToCart = async (req, res) => {
    try {
        const { productID, userid } = req.body;
        
        let cart = await Cart.findOne({ userid });
        if (!cart) {
            cart = new Cart({ userid, items: [
                { productID, quantity: 1 }
            ] });
        } else {
            const item = cart.items.find(
                i => i.productID.toString() === productID
            );

            if (item) {
                item.quantity += 1;
            } else {
                cart.items.push({ productID, quantity: 1 });
            }
        }

        await cart.save();
        res.json({ message: 'Product added to cart', cart });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


// remove item from cart
export const removeItem = async (req, res) => {
    try { 
        const { productID, userid } = req.body;
        const cart = await Cart.findOne({ userid });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        cart.items = cart.items.filter(
            i => i.productID.toString() !== productID
        );
        
        await cart.save();
        res.json({ message: 'Product removed from cart', cart });
    }catch (error) {
        res.status(500).json({ message: error.message });
    }

}

// update cart item quantity
export const updateCartItem = async (req, res) => {
    try {
        const { productID, userid, quantity } = req.body;
        const cart = await Cart.findOne({ userid });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        
        const item = cart.items.find(
            i => i.productID.toString() === productID
        );
        if (!item) {
            return res.status(404).json({ message: 'Product not found in cart' });
        }
        item.quantity = quantity;

        await cart.save();
        res.json({ message: 'Cart updated', cart });
    }catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// get cart items by user id

export const getCartItems = async (req, res) => {
    try {
        const { userid } = req.params;
        const cart = await Cart.findOne({ userid }).populate('items.productID');
        res.json(cart || { items: [] });

    }catch (error) {
        res.status(500).json({ message: error.message });
    }
}