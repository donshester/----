import React, { useEffect, useState } from 'react';
import api from '../../api/api';
import {Product} from "../../api/dtos/response.interfaces";
import {useParams} from "react-router-dom";
import {toast} from "react-toastify";
import pie_img from "../../Assets/pie.png";
import './ProductDetails.css';
const ProductDetails= () => {
    const { id } = useParams();
    const [product, setProduct] = useState<Product | null>(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await api.get(`/products/${id}`);
                setProduct(response.data);
            } catch (error: any) {
                toast.error('Error fetching product:', error);
            }
        };

        fetchProduct();
    }, [id]);

    if (!product) {
        return <p>Loading...</p>;
    }
    return (
        <div className="product-details-container">
            <img
                src={pie_img}
                alt={product.name}
                className="product-image"
            />
            <div className="product-details-content">
                <h2 className="product-name">{product.name}</h2>
                <p className="product-price">Price: ${Number(product.price).toFixed(2)}</p>
                <p className="product-info">Unit: {product.unit}</p>
                <p className="product-info">Category: {product.category.name}</p>
                <p className="product-info">Manufacturer: {product.manufacturer?.name}</p>
                <p className="product-info">Country: {product.manufacturer?.country}</p>
                <p className="product-info">Foundation Date: {product.manufacturer?.foundationDate}</p>
                <p className="product-info">Created At: {new Date(product.createdAt).toLocaleString()}</p>
                <p className="product-info">Updated At: {new Date(product.updatedAt).toUTCString()}</p>
            </div>
        </div>
    );
};

export default ProductDetails;
