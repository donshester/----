import React, { useState, useEffect } from 'react';
import api from "../../api/api";
import {Manufacturer} from "../../api/dtos/response.interfaces";
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import './Manufacturers.css';
const ManufacturerManagement = () => {
    const [manufacturers, setManufacturers] = useState<Manufacturer[]>([]);
    const [selectedManufacturer, setSelectedManufacturer] = useState<Manufacturer | null>(null);
    const [newManufacturerName, setNewManufacturerName] = useState<string>('');
    const [newManufacturerCountry, setNewManufacturerCountry] = useState<string>('');
    const [newManufacturerFoundationDate, setNewManufacturerFoundationDate] = useState<Date | null>(null);
    const [editManufacturerFoundationDate, setEditManufacturerFoundationDate] = useState<Date | null>(null);
    const [editManufacturerName, setEditManufacturerName] = useState<string>('');
    const [editManufacturerCountry, setEditManufacturerCountry] = useState<string>('');

    useEffect(() => {
        const fetchManufacturers = async () => {
            try {
                const response = await api.get('/manufacturers/all');
                setManufacturers(response.data);
            } catch (error) {
                console.error('Error fetching manufacturers:', error);
            }
        };

        fetchManufacturers();
    }, []);

    const handleSelectManufacturer = (manufacturer: Manufacturer) => {
        setSelectedManufacturer(manufacturer);
        setEditManufacturerName(manufacturer.name);
        setEditManufacturerCountry(manufacturer.country);
        setEditManufacturerFoundationDate(new Date(manufacturer.foundationDate));
    };

    const handleAddManufacturer = async () => {
        try {
            const response = await api.post('/manufacturers', {
                name: newManufacturerName,
                country: newManufacturerCountry,
                foundationDate: newManufacturerFoundationDate,
            });
            setManufacturers([...manufacturers, response.data]);
            setNewManufacturerName('');
            setNewManufacturerCountry('');
            setNewManufacturerFoundationDate(null);
        } catch (error) {
            console.error('Error adding manufacturer:', error);
        }
    };

    const handleDeleteManufacturer = async () => {
        if (selectedManufacturer) {
            try {
                await api.delete(`/manufacturers/${selectedManufacturer.id}`);
                setManufacturers(
                    manufacturers.filter((manufacturer) => manufacturer.id !== selectedManufacturer.id)
                );
                setSelectedManufacturer(null);
            } catch (error) {
                console.error('Error deleting manufacturer:', error);
            }
        }
    };

    const handleEditManufacturer = async () => {
        if (selectedManufacturer) {
            try {
                const response = await api.put(`/manufacturers/${selectedManufacturer.id}`, {
                    name: editManufacturerName,
                    country: editManufacturerCountry,
                    foundationDate: editManufacturerFoundationDate,
                });
                setManufacturers(
                    manufacturers.map((manufacturer) =>
                        manufacturer.id === selectedManufacturer.id ? response.data : manufacturer
                    )
                );
                setSelectedManufacturer(null);
            } catch (error) {
                console.error('Error editing manufacturer:', error);
            }
        }
    };

    return (
        <div className="manufacturer-management">
            <h2>Manufacturer Management</h2>
            {/* Вывод списка производителей */}
            <ul className="manufacturer-list">
                {manufacturers.map((manufacturer) => (
                    <li key={manufacturer.id} onClick={() => handleSelectManufacturer(manufacturer)}>
                        {manufacturer.name}
                    </li>
                ))}
            </ul>

            <div className="new-manufacturer-form">
                <input
                    type="text"
                    placeholder="New Manufacturer Name"
                    value={newManufacturerName}
                    onChange={(e) => setNewManufacturerName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="New Manufacturer Country"
                    value={newManufacturerCountry}
                    onChange={(e) => setNewManufacturerCountry(e.target.value)}
                />
                <label>
                    New Manufacturer Foundation Date:
                    <DatePicker
                        selected={newManufacturerFoundationDate}
                        onChange={(date: Date | null) => setNewManufacturerFoundationDate(date)}
                        dateFormat="yyyy-MM-dd"
                    />
                </label>
                <button onClick={handleAddManufacturer}>Add Manufacturer</button>
            </div>

            {selectedManufacturer && (
                <div className="selected-manufacturer">
                    <h3>Selected Manufacturer: {selectedManufacturer.name}</h3>
                    <p>Country: {selectedManufacturer.country}</p>
                    <p>Foundation Date: {selectedManufacturer.foundationDate}</p>
                    <input
                        type="text"
                        placeholder="Edit Manufacturer Name"
                        value={editManufacturerName}
                        onChange={(e) => setEditManufacturerName(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Edit Manufacturer Country"
                        value={editManufacturerCountry}
                        onChange={(e) => setEditManufacturerCountry(e.target.value)}
                    />
                    <label>
                        Edit Manufacturer Foundation Date:
                        <DatePicker
                            selected={editManufacturerFoundationDate}
                            onChange={(date: Date | null) => setEditManufacturerFoundationDate(date)}
                            dateFormat="yyyy-MM-dd"
                        />
                    </label>
                    <button onClick={handleEditManufacturer}>Save Changes</button>
                    <button onClick={handleDeleteManufacturer}>Delete Manufacturer</button>
                </div>
            )}
        </div>
    );
};

export default ManufacturerManagement;
