import express from 'express';
import {
    addToCart, removeItem, updateCartItem, getCartItems
}from '../controllers/cartController.js';

const router = express.Router();

router.post('/add', addToCart); // add to cart

router.post('/remove', removeItem); // remove item from cart

router.post('/update', updateCartItem); // update cart item quantity

router.get('/:userid', getCartItems); // get cart items for a user

export default router;