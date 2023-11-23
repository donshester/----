import React, { useState, useEffect } from 'react';
import api, {getProducts, getUserInfo} from "../../api/api";
import ProductList from "../ProductList/ProductList";
import {} from "../../App";
import './ProductPage.css';
import {Product, User} from "../../api/dtos/response.interfaces";
import {toast} from "react-toastify";
const ProductPage = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [sortBy, setSortBy] = useState<string | undefined>(undefined);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [user, setUser] = useState<User| null>(null);

    const addToCart = (productId: string) => {
        const parsedMap = localStorage.getItem("cartMap");
        let cartMap = parsedMap ? JSON.parse(parsedMap) : {};
        if (cartMap.hasOwnProperty(productId)) {
            cartMap[productId]++;
        } else {
            cartMap[productId] = 1;
        }
        localStorage.setItem("cartMap", JSON.stringify(cartMap));
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getProducts(sortBy, searchTerm);
                setProducts(data.data);
            } catch (error) {
                toast.error('Error fetching products.', {
                    position: toast.POSITION.TOP_CENTER,
                });
            }
        };
        const fetchUserInfo = async () => {
            try {
                const userData = await getUserInfo();

                setUser(userData);
            } catch (error) {
                setUser(null);
            }
        };

        fetchUserInfo();
        fetchData();
    }, [sortBy, searchTerm]);

    return (
        <div className="product-page-card">
            <div className="filters">
                <label>
                    Sort By:
                    <select onChange={(e) => setSortBy(e.target.value)}>
                        <option value="name">Name</option>
                        <option value="price">Price</option>
                    </select>
                </label>
                <label>
                    Search:
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </label>
            </div>
            <ProductList products={products} onAddToCart={user?.role === 'admin' || !user ? undefined : addToCart} />
        </div>
    );
};


export default ProductPage;
