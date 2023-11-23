import React, { useState, useEffect } from 'react';
import api from "../../api/api";
import {Category} from "../../api/dtos/response.interfaces";
import './Categories.css';
const CategoryManagement = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [newCategoryName, setNewCategoryName] = useState<string>('');
    const [editCategoryName, setEditCategoryName] = useState<string>('');

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await api.get('/categories/all');
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    const handleSelectCategory = (category: Category) => {
        setSelectedCategory(category);
        setEditCategoryName(category.name);
    };

    const handleAddCategory = async () => {
        try {
            const response = await api.post('/categories', { name: newCategoryName });
            setCategories([...categories, response.data]);
            setNewCategoryName('');
        } catch (error) {
            console.error('Error adding category:', error);
        }
    };

    const handleDeleteCategory = async () => {
        if (selectedCategory) {
            try {
                await api.delete(`/categories/${selectedCategory.id}`);
                setCategories(categories.filter((category) => category.id !== selectedCategory.id));
                setSelectedCategory(null);
            } catch (error) {
                console.error('Error deleting category:', error);
            }
        }
    };

    const handleEditCategory = async () => {
        if (selectedCategory) {
            try {
                const response = await api.put(`/categories/${selectedCategory.id}`, {
                    name: editCategoryName,
                });
                setCategories(
                    categories.map((category) =>
                        category.id === selectedCategory.id ? response.data : category
                    )
                );
                setSelectedCategory(null);
            } catch (error) {
                console.error('Error editing category:', error);
            }
        }
    };

    return (
        <div className="category-management">
            <h2>Category Management</h2>
            <ul className="category-list">
                {categories.map((category) => (
                    <li key={category.id} onClick={() => handleSelectCategory(category)}>
                        {category.name}
                    </li>
                ))}
            </ul>

            <div className="new-category-form">
                <input
                    type="text"
                    placeholder="New Category Name"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                />
                <button onClick={handleAddCategory}>Add Category</button>
            </div>

            {selectedCategory && (
                <div className="selected-category">
                    <h3>Selected Category: {selectedCategory.name}</h3>
                    <input
                        type="text"
                        placeholder="Edit Category Name"
                        value={editCategoryName}
                        onChange={(e) => setEditCategoryName(e.target.value)}
                    />
                    <button onClick={handleEditCategory}>Save Changes</button>
                    <button onClick={handleDeleteCategory}>Delete Category</button>
                </div>
            )}
        </div>
    );
};


export default CategoryManagement;
