import React, {useEffect, useState} from 'react';
import {Link, Outlet, useNavigate} from 'react-router-dom';
import './Header.css';
import api, {getUserInfo} from "../../api/api";
import {User} from "../../api/dtos/response.interfaces";
import {toast} from "react-toastify";

interface HeaderProps {
    toggleCartModal: () => void;
}

const Header: React.FC<HeaderProps> = ({toggleCartModal}) => {
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);
    const [currentDate, setCurrentDate] = useState<string>('');
    const [temperature, setTemperature] = useState(null);

    useEffect(() => {
        checkUserAuthentication();
        updateCurrentDate();
    }, []);
    const checkUserAuthentication = async () => {
        try {
            const response: User = await getUserInfo();
            setUser(response);
        } catch (error) {
            setUser(null);
        }
    };
    useEffect(() => {
        const getUserLocation = async () => {
            try {
                navigator.geolocation.getCurrentPosition(async (position) => {
                    const { latitude, longitude } = position.coords;
                    const apiKey = 'b3664610e3014864b71101414232311';

                    const response = await fetch(
                        `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${latitude},${longitude}`
                    );

                    if (response.ok) {
                        const data = await response.json();
                        setTemperature(data?.current?.temp_c);
                    } else {
                        console.error('Error fetching weather data');
                    }
                });
            } catch (error) {
                console.error('Error getting user location:', error);
            }
        };

        getUserLocation();
    }, []);

    const handleLogout = async () => {
        try {
            await api.post('auth/logout');
            setUser(null);
            navigate('/products');
        } catch (error) {
            toast.error('Logout failed.');
        }
    };
    const getUserTimeZone = () => {
        const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        return userTimeZone;
    };
    const updateCurrentDate = () => {
        const now = new Date();
        const formattedDate = new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        }).format(now);
        setCurrentDate(formattedDate);
    };

    return (
        <div className="header-container">
            <Link to="/products" className="header-link">
                Products
            </Link>
            <div className="user-actions">
                {user ? (
                    <>
                        <span>
        Welcome, {user.firstName}! (Time Zone: {getUserTimeZone()}) | Today's Date: {currentDate} | Temperature: {temperature}°C
                        </span>
                        <button onClick={handleLogout}>Logout</button>
                        <div className="cart-icon" onClick={toggleCartModal}>
                            Cart
                        </div>
                        {user.role === 'admin' && (
                            <Link to="/admin" className="header-link">
                                Admin Panel
                            </Link>
                        )}
                        <Link to="/profile" className="header-link">
                            Profile
                        </Link>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="header-link">
                            Login
                        </Link>
                    </>
                )}
            </div>
            <Outlet/>
        </div>
    );
};

export default Header;
