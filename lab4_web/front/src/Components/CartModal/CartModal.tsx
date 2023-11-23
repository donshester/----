import React, {useEffect, useState} from 'react';
import Cart from "../Cart/Cart";
import './CartModal.css';
interface CartModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const CartModal: React.FC<CartModalProps> = ({isOpen, onClose}) => {
    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };
        document.addEventListener('keydown', handleKeyPress);

        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [onClose]);

    return (
        <div className="cart-modal-overlay" onClick={handleOverlayClick}>
            <div className="cart-modal-content">
                <button className="close-button" onClick={onClose}>
                    &#10006;
                </button>
                <Cart/>
            </div>
        </div>
    );
};

export default CartModal;
