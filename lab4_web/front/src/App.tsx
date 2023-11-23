import React, {useState} from 'react';
import './App.css';
import LoginSignUp from "./Components/LoginSignUp/LoginSignUp";
import 'react-toastify/dist/ReactToastify.css';
import ProductPage from "./Components/ProductPage/ProductPage";
import Header from "./Components/Header/Header";
import {BrowserRouter, Route, Router, Routes} from "react-router-dom";
import CartModal from "./Components/CartModal/CartModal";
import Profile from "./Components/Profile/Profile";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import AdminPage from "./Components/AdminPanel/AdminPanel";

function App() {
    const [isCartModalOpen, setCartModalOpen] = useState(false);

    const toggleCartModal = () => {
        setCartModalOpen(!isCartModalOpen);
    };
    return (
        <BrowserRouter>
            <Header toggleCartModal={toggleCartModal}/>
            <Routes>
                <Route index path='/products' element={<ProductPage/>}/>
                <Route path='/login' element={<LoginSignUp/>}/>
                <Route path='/profile' element={<Profile/>}/>
                <Route path='/products/:id' element={<ProductDetails />} />
                <Route path='/admin' element={<AdminPage />} />

            </Routes>
            {isCartModalOpen && <CartModal onClose={toggleCartModal} isOpen={isCartModalOpen}/>}
        </BrowserRouter>
    );
}

export default App;
