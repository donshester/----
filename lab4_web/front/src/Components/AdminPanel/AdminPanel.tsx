import React, {useState} from 'react';
import ManufacturerManagement from "./Manufacturers";
import CategoryManagement from "./Caregories";
import ProductManagement from "./Products";
import './AdminPanel.css';

const AdminPage = () => {
    const [selectedMenu, setSelectedMenu] = useState('manufacturers');

    return (
        <div className="admin-page-container">
            <h1>Admin Panel</h1>
            <div className="admin-menu">
                <button onClick={() => setSelectedMenu('manufacturers')}>Manufacturers</button>
                <button onClick={() => setSelectedMenu('categories')}>Categories</button>
                <button onClick={() => setSelectedMenu('products')}>Products</button>
            </div>

            <div className="admin-content">
                {selectedMenu === 'manufacturers' && <ManufacturerManagement />}
                {selectedMenu === 'categories' && <CategoryManagement />}
                {selectedMenu === 'products' && <ProductManagement />}
            </div>
        </div>
    );
};
export default AdminPage;
