import React, { useEffect, useState } from 'react';
import api from "../../api/api";
import {Product} from "../../api/dtos/response.interfaces";
import './Cart.css';
import {toast} from "react-toastify";
interface CartObject extends Product {
    quantity: number;
}

const Cart = () => {
    const [cartProducts, setCartProducts] = useState<CartObject[]>([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const storedCart = localStorage.getItem('cartMap');
        const cartMap = storedCart ? JSON.parse(storedCart) : {};

        const productIds = Object.keys(cartMap);

        const productRequests = productIds.map(async (productId) => {
            const response = await api.get(`/products/${productId}`);
            const productWithQuantity: CartObject = {
                ...response.data,
                quantity: cartMap[productId],
            };
            return productWithQuantity;
        });

        const productsData = await Promise.all(productRequests);

        setCartProducts(productsData);
    };

    const handleRemoveProduct = (productId: string) => {
        const currentCartMapString = localStorage.getItem('cartMap');

        if (currentCartMapString) {
            const currentCartMap = JSON.parse(currentCartMapString);

            delete currentCartMap[productId];
            localStorage.setItem('cartMap', JSON.stringify(currentCartMap));

            fetchData();
        }
    };

    const handleDecrementQuantity = (productId: string) => {
        const currentCartMapString = localStorage.getItem('cartMap');

        if (currentCartMapString) {
            const currentCartMap = JSON.parse(currentCartMapString);

            if (currentCartMap[productId] > 1) {
                currentCartMap[productId]--;
            } else {
                delete currentCartMap[productId];
            }

            localStorage.setItem('cartMap', JSON.stringify(currentCartMap));

            fetchData();
        }
    };
    const handleOrder = async () => {
        try {
            const orderData = cartProducts.map((product) => ({
                productId: product.id,
                quantity: product.quantity,
            }));
            console.log(orderData);

            await api.post('/orders/create', { products: orderData });

            localStorage.removeItem('cartMap');
            setCartProducts([]);

            toast.success('Order placed successfully!');
        } catch (error) {
            toast.error('Error placing the order. Please try again.');
        }
    };

    return (
        <div className="cart-container">
            <h2>Shopping Cart</h2>
            {cartProducts.length > 0 ? (
                <div>
                    <ul>
                        {cartProducts.map((product) => (
                            <li key={product.id}>
                                {product.name} - Quantity: {product.quantity} - Price: ${(product.price * product.quantity).toFixed(2)}
                                <button onClick={() => handleDecrementQuantity(product.id)}>-</button>
                                <button onClick={() => handleRemoveProduct(product.id)}>Remove</button>
                            </li>
                        ))}
                    </ul>
                    <button className="order-button" onClick={handleOrder}>
                        Order
                    </button>
                </div>

                ) : (
                <p>Your shopping cart is empty.</p>
                )}
        </div>
    );
};


export default Cart;
