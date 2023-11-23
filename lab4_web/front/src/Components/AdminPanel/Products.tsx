import React, { useState, useEffect } from 'react';
import api from "../../api/api";
import {Category, Manufacturer, Product} from "../../api/dtos/response.interfaces";
import './Products.css';
export enum Unit {
    KILOGRAM = 'kilogram',
    LITER = 'liter',
}
const ProductManagement = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [manufacturersList, setManufacturersList] = useState<Manufacturer[]>([]);
    const [categoriesList, setCategoriesList] = useState<Category[]>([]);

    const [newProductName, setNewProductName] = useState('');
    const [newProductPrice, setNewProductPrice] = useState<number | ''>('');
    const [newProductUnit, setNewProductUnit] = useState<Unit>(Unit.KILOGRAM);
    const [newProductCreatedAt, setNewProductCreatedAt] = useState<Date | null>(null);
    const [newProductManufacturerId, setNewProductManufacturerId] = useState<string>('');
    const [newProductCategoryId, setNewProductCategoryId] = useState<string>('');
    const [newProductQuantity, setNewProductQuantity] = useState<number | ''>('');

    const [editProductName, setEditProductName] = useState('');
    const [editProductPrice, setEditProductPrice] = useState<number | ''>('');
    const [editProductUnit, setEditProductUnit] = useState<Unit>(Unit.KILOGRAM);
    const [editProductCreatedAt, setEditProductCreatedAt] = useState<Date | null>(null);
    const [editProductManufacturerId, setEditProductManufacturerId] = useState<string>('');
    const [editProductCategoryId, setEditProductCategoryId] = useState<string>('');
    const [editProductQuantity, setEditProductQuantity] = useState<number | ''>('');
    useEffect(() => {
        const fetchManufacturersList = async () => {
            try {
                const response = await api.get('/manufacturers/all');
                setManufacturersList(response.data);
            } catch (error) {
                console.error('Error fetching manufacturers list:', error);
            }
        };

        fetchManufacturersList();
    }, []);

    useEffect(() => {
        const fetchCategoriesList = async () => {
            try {
                const response = await api.get('/categories/all');
                setCategoriesList(response.data);
            } catch (error) {
                console.error('Error fetching categories list:', error);
            }
        };

        fetchCategoriesList();
    }, []);
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await api.get('/products');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    const handleSelectProduct = (product: Product) => {
        setSelectedProduct(product);
    };

    const handleAddProduct = async () => {
        try {
            const newProductDto = {
                name: newProductName,
                price: newProductPrice!,
                unit: newProductUnit,
                createdAt: newProductCreatedAt,
                manufacturerId: newProductManufacturerId,
                categoryId: newProductCategoryId,
                quantity: newProductQuantity!,
            };

            await api.post('/products', newProductDto);

            const response = await api.get('/products');
            setProducts(response.data);

            setNewProductName('');
            setNewProductPrice('');
            setNewProductUnit(Unit.KILOGRAM);
            setNewProductCreatedAt(null);
            setNewProductManufacturerId('');
            setNewProductCategoryId('');
            setNewProductQuantity('');
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    const handleEditProduct = async () => {
        try {
            const editProductDto = {
                name: editProductName,
                price: editProductPrice!,
                unit: editProductUnit,
                createdAt: editProductCreatedAt,
                manufacturerId: editProductManufacturerId,
                categoryId: editProductCategoryId,
                quantity: editProductQuantity!,
            };

            await api.put(`/products/${selectedProduct?.id}`, editProductDto);

            const response = await api.get('/products');
            setProducts(response.data);

            setEditProductName('');
            setEditProductPrice('');
            setEditProductUnit(Unit.KILOGRAM);
            setEditProductCreatedAt(null);
            setEditProductManufacturerId('');
            setEditProductCategoryId('');
            setEditProductQuantity('');

            setSelectedProduct(null);
        } catch (error) {
            console.error('Error editing product:', error);
        }
    };

    const handleDeleteProduct = async () => {
        try {
            console.log(selectedProduct?.id);
            await api.delete(`/products/${selectedProduct?.id}`);

            const response = await api.get('/products');
            setProducts(response.data);

            setSelectedProduct(null);
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    return (
        <div className="product-management">
            <h2>Product Management</h2>
            <ul className="product-list">
                {products.map((product) => (
                    <li key={product.id} onClick={() => handleSelectProduct(product)}>
                        {product.name}
                    </li>
                ))}
            </ul>

            {selectedProduct && (
                <div className="selected-product">
                    <h3>Selected Product: {selectedProduct.name}</h3>
                    <p>Price: {selectedProduct.price}</p>
                    <p>Unit: {selectedProduct.unit}</p>
                    <p>Created At: {new Date(selectedProduct.createdAt).toLocaleString()}</p>
                    <label>
                        Edit Product Quantity:
                        <input type="number" value={editProductQuantity} onChange={(e) => setEditProductQuantity(e.target.value === '' ? '' : parseInt(e.target.value, 10))
                        } />
                    </label>
                    <label>
                        Edit Product Manufacturer:
                        <select value={editProductManufacturerId} onChange={(e) => setEditProductManufacturerId(e.target.value)}>
                            <option value="">Select Manufacturer</option>
                            {manufacturersList.map((manufacturer) => (
                                <option key={manufacturer.id} value={manufacturer.id}>
                                    {manufacturer.name}
                                </option>
                            ))}
                        </select>
                    </label>
                    <label>
                        Edit Product Category:
                        <select value={editProductCategoryId} onChange={(e) => setEditProductCategoryId(e.target.value)}>
                            <option value="">Select Category</option>
                            {categoriesList.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </label>

                    <button onClick={handleEditProduct}>Edit Product</button>
                    <button onClick={handleDeleteProduct}>Delete Product</button>
                </div>
            )}

            <div className="new-product-form">
                <label>
                    New Product Name:
                    <input type="text" value={newProductName} onChange={(e) => setNewProductName(e.target.value)} />
                </label>
                <label>
                    New Product Price:
                    <input type="number" value={newProductPrice || ''} onChange={(e) => setNewProductPrice(e.target.value === '' ? '' : parseInt(e.target.value, 10))} />
                </label>
                <label>
                    New Product Unit:
                    <select value={newProductUnit} onChange={(e) => setNewProductUnit(e.target.value as Unit)}>
                        {Object.values(Unit).map((unit) => (
                            <option key={unit} value={unit}>
                                {unit}
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    New Product Quantity:
                    <input type="number" value={newProductQuantity} onChange={(e) => setNewProductQuantity(e.target.value === '' ? '' : parseInt(e.target.value, 10))} />
                </label>
                <label>
                    New Product Manufacturer:
                    <select value={newProductManufacturerId} onChange={(e) => setNewProductManufacturerId(e.target.value)}>
                        <option value="">Select Manufacturer</option>
                        {manufacturersList.map((manufacturer) => (
                            <option key={manufacturer.id} value={manufacturer.id}>
                                {manufacturer.name}
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    New Product Category:
                    <select value={newProductCategoryId} onChange={(e) => setNewProductCategoryId(e.target.value)}>
                        <option value="">Select Category</option>
                        {categoriesList.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </label>
                <button onClick={handleAddProduct}>Add Product</button>
            </div>

        </div>
    );
};
export default ProductManagement;
