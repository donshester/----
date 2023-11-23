import {useState, useEffect} from 'react';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Order, User} from "../../api/dtos/response.interfaces";
import api, {getMyOrders, getUserInfo} from "../../api/api";
import './Profile.css';
import {useNavigate} from "react-router-dom";
function convertToUserTimezone(utcTimeString: Date| string) {
    const userDate = new Date(utcTimeString);

    const userLocale = navigator.language;

    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        timeZoneName: 'short',
    };

    return new Intl.DateTimeFormat(userLocale, options).format(userDate);
}
const Profile = () => {
    let navigate = useNavigate();

    const [user, setUser] = useState<User | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedUser, setEditedUser] = useState<User | null>(null);
    const [updatedEmail, setUpdatedEmail] = useState('');
    const [updatedLogin, setUpdatedLogin] = useState('');
    const [updatedPassword, setUpdatedPassword] = useState('');
    const [myOrders, setMyOrders] = useState<Order[]>([]);
    const [showMyOrders, setShowMyOrders] = useState(false);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const userData = await getUserInfo();
                setUser(userData);
                setEditedUser(userData);
            } catch (error) {
                toast.error('Error retrieving user info.');
            }
        };

        fetchUserInfo();
        if(user?.role==='user'){
            fetchMyOrders();
        }
    }, []);

    const handleEdit = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsEditing(!isEditing);
    };
    const fetchMyOrders = async () => {
        try {
            const orders = await getMyOrders();
            setMyOrders(orders);
        } catch (error) {
            toast.error('Error fetching my orders.');
        }
    };
    const handleSave = async (e: React.MouseEvent) => {
        e.preventDefault();
        try {
            const updatedFields: Partial<User & {password: string}> = {};

            if (editedUser?.firstName !== user?.firstName) {
                updatedFields.firstName = editedUser?.firstName;
            }
            if (editedUser?.lastName !== user?.lastName) {
                updatedFields.lastName = editedUser?.lastName;
            }
            if (editedUser?.email !== user?.email) {
                updatedFields.email = editedUser?.email;
            }
            if (editedUser?.phoneNumber !== user?.phoneNumber) {
                updatedFields.phoneNumber = editedUser?.phoneNumber;
            }
            if (editedUser?.login !== user?.login) {
                updatedFields.login = editedUser?.login;
            }
            if (updatedPassword) {
                updatedFields.password = updatedPassword;
            }

            const response = await api.put('/users/me', updatedFields);
            setIsEditing(false);
            const updatedUserInfo = await getUserInfo();
            setUser(updatedUserInfo);
            toast.success('Profile updated successfully!');
        } catch (error: any) {
            if (error?.response?.data?.errors && Array.isArray(error?.response?.data?.errors )) {
                error?.response?.data?.errors .forEach((errorMessage:any) => {
                    console.error(errorMessage);
                    toast.error(errorMessage);
                });
            } else {
                toast.error('Error updating profile. Please try again.');
            }
        }
    };

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete your profile?')) {
            try {
                await api.delete('/users/me');
                toast.success('Profile deleted successfully!');
                setUser(null);
                navigate('/products');
            } catch (error) {
                toast.error('Error deleting profile. Please try again.');
            }
        }
    };
    const toggleMyOrders = () => {
        setShowMyOrders(!showMyOrders);
    };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setEditedUser((prevUser) => {
            if (prevUser) {
                return {...prevUser, [name]: value} as User;
            }
            return prevUser;
        });
        if (name === 'updatedEmail') {
            setUpdatedEmail(value);
        } else if (name === 'updatedLogin') {
            setUpdatedLogin(value);
        } else if (name === 'updatedPassword') {
            setUpdatedPassword(value);
        }
    };

    return (
        <div className="profile-container">
            {user ? (
                <>
                    <h2>Profile</h2>
                    <div className="profile-info">
                        <p>
                            <strong>Name:</strong> {user.firstName} {user.lastName}
                        </p>
                        <p>
                            <strong>Email:</strong> {user.email}
                        </p>
                        <p>
                            <strong>Phone Number:</strong> {user.phoneNumber || 'N/A'}
                        </p>
                        {isEditing ? (
                            <form className="profile-form">
                                <label>
                                    <span>First Name:</span>
                                    <input type="text" name="firstName" value={editedUser?.firstName || ''} onChange={handleChange} />
                                </label>
                                <label>
                                    <span>Last Name:</span>
                                    <input type="text" name="lastName" value={editedUser?.lastName || ''} onChange={handleChange} />
                                </label>
                                <label>
                                    <span>Email:</span>
                                    <input type="text" name="email" value={editedUser?.email || ''} onChange={handleChange} />
                                </label>
                                <label>
                                    <span>Phone Number:</span>
                                    <input type="text" name="phoneNumber" value={editedUser?.phoneNumber || ''} onChange={handleChange} />
                                </label>
                                <label>
                                    <span>Login:</span>
                                    <input type="text" name="login" value={editedUser?.login || ''} onChange={handleChange} />
                                </label>
                                <label>
                                    <span>Password:</span>
                                    <input type="password" name="updatedPassword" value={updatedPassword} onChange={handleChange} />
                                </label>
                                <div className="profile-buttons">
                                    <button onClick={handleSave}>Save</button>
                                    <button className="cancel" onClick={handleEdit}>
                                        Cancel
                                    </button>
                                    {user.role === 'user' && (
                                        <button onClick={toggleMyOrders}>My Orders</button>
                                    )}
                                </div>


                            </form>
                        ) : (
                            <div className="profile-buttons">
                                <button onClick={handleEdit}>Edit</button>
                                <button onClick={handleDelete}>Delete Profile</button>
                                {user.role === 'user' && (
                                    <button onClick={toggleMyOrders}>My Orders</button>
                                )}
                            </div>
                        )}
                    </div>
                </>
            ) : (
                <p>Loading user information...</p>
            )}
            { showMyOrders  && (
                <div className="my-orders-section">
                    <h3>My Orders</h3>
                    <ul className="my-orders-list">
                        {myOrders.map((order) => (
                            <li key={order.id} className="order-item">
                                <h4>Order ID: {order.id}</h4>
                                <p>Created At: {convertToUserTimezone(order.createdAt)}</p>
                                <ul>
                                    {order.products.map((product) => (
                                        <li key={product.id}>
                                            <p>
                                                Product: {product.product.name} (Quantity: {product.quantity}),
                                                Price: ${(product.quantity * product.product.price).toFixed(2)}
                                            </p>
                                        </li>
                                    ))}
                                </ul>
                                <p className="total-price">Total Price: ${(order.products.reduce((total, product) => total + product.quantity * product.product.price, 0)).toFixed(2)}</p>
                            </li>
                        ))}

                    </ul>
                </div>
            )}

        </div>
    );
};

export default Profile;
