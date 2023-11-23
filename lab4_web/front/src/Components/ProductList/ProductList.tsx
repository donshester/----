import React from 'react';
import {Product} from "../../api/dtos/response.interfaces";
import ProductCard from "../ProductCard/ProductCard";
import './ProductList.css';
interface ProductListProps {
    products: Product[];
    onAddToCart?: (productId: string) => void;
}
const ProductList: React.FC<ProductListProps> = ({ products, onAddToCart }) => {
    return (
        <div className="product-list-container">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
            ))}
        </div>
    );
};

export default ProductList;
