import {Product} from "../../api/dtos/response.interfaces";
import './ProductCard.css';
import pie_img from '../../Assets/pie.png';
import {Link} from "react-router-dom";
interface ProductCardProps{
    product: Product;
    onAddToCart?: (productId: string)=>void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart  }) => {
    const formattedPrice = typeof product.price === 'string' ? parseFloat(product.price) : product.price;

    return (
        <div className="product-card">
            <Link to={`/products/${product.id}`}>
            <img
                src={pie_img}
                alt={product.name}
                className="product-image"
                style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
            />
            </Link>
            <div className="product-info">
                <Link to={`/products/${product.id}`}>
                <h3 className="product-name">{product.name}</h3>
                </Link>
                <p className="product-price">${formattedPrice.toFixed(2)}</p>
                <p className="product-category">{product.category.name}</p>
                {onAddToCart  && (
                    <button className="add-to-cart-button" onClick={()=>onAddToCart(product.id)}>
                        Add to Cart
                    </button>
                )}
            </div>
        </div>
    );
};

export default ProductCard;