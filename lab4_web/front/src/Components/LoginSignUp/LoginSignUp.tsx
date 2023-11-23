import React, {useState} from "react";
import './LoginSignUp.css';
import user_icon from '../../Assets/user-svgrepo-com.svg';
import password_icon from '../../Assets/password-protection-privacy-access-verification-code-svgrepo-com.svg';
import email_icon from '../../Assets/email-1573-svgrepo-com.svg';
import name_icon from '../../Assets/id-card-svgrepo-com.svg';
import phone_icon from '../../Assets/phone-number-svgrepo-com.svg';
import * as yup from 'yup';
import {useFormik} from "formik";
import { toast } from 'react-toastify';

import {createUser, loginUser} from "../../api/api";
import {useNavigate} from "react-router-dom";
const phoneRegExp = /^\+((\\d{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const loginValidationSchema = yup.object({
    login: yup.string().required('Login is required'),
    password: yup.string().required('Password is required'),
    rememberMe: yup.boolean(),
});

const signupValidationSchema = yup.object({
    email: yup.string().email('Invalid email address').required('Email is required'),
    login: yup.string().required('Login is required'),
    password: yup.string().required('Password is required'),
    firstName: yup.string().required('First Name is required'),
    lastName: yup.string().required('Last Name is required'),
    phoneNumber: yup.string().matches(phoneRegExp, 'Phone number is not valid')
});
const LoginSignUp = () => {
    let navigate = useNavigate();

    const [action, setAction] = useState('Login');

    const validationSchema = action === 'Login' ? loginValidationSchema : signupValidationSchema;

    const formik = useFormik({
        initialValues: {
            email: '',
            login: '',
            password: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            rememberMe: false,
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {

            let request;
            if (action === 'Login') {
                request = loginUser({
                    login: values.login,
                    password: values.password,
                    rememberMe: values.rememberMe,
                });
            } else {
                request = createUser({
                    email: values.email,
                    login: values.login,
                    password: values.password,
                    firstName: values.firstName,
                    lastName: values.lastName,
                    phoneNumber: values.phoneNumber,
                });
            }

            request.then((response: any) => {
                if (response.status === 200 || response.status === 201) {
                    if (action === 'Login') {
                        console.log('Login successful:', response);
                        navigate('/products')
                    } else {
                        console.log('Registration successful:', response);
                        navigate('/login')
                    }
                }else if(response.code===401){
                    toast.error("Password or Login are incorrect",{
                        position: toast.POSITION.TOP_CENTER,
                    })
                }
                else {
                    console.log(response)
                    // @ts-ignore
                    toast.error("network error", {
                        position: toast.POSITION.TOP_CENTER,
                    });
                }
            }).catch((error) => {
                toast.error('Error in onSubmit:', error);
                toast.error('Unknown error occurred');
            });
        },

    });
    return (
        <form onSubmit={formik.handleSubmit}>
            <div className="container">
                <div className="header">
                    <div className="text">{action}</div>
                    <div className="underline"/>

                    {action === 'Sign Up' && (
                        <div className="input">
                            <img src={email_icon} alt=""/>
                            <input
                                type="email"
                                placeholder="Email"
                                {...formik.getFieldProps('email')}
                                style={{borderColor: formik.touched.email && formik.errors.email ? 'red' : ''}}
                            />
                            {formik.touched.email && formik.errors.email && (
                                <div className="error">{formik.errors.email}</div>
                            )}
                        </div>
                    )}

                    <div className="input">
                        <img src={user_icon} alt=""/>
                        <input
                            type="text"
                            placeholder="Login"
                            id="login"
                            {...formik.getFieldProps('login')}
                            style={{borderColor: formik.touched.login && formik.errors.login ? 'red' : ''}}
                        />
                        {formik.touched.login && formik.errors.login && (
                            <div className="error">{formik.errors.login}</div>
                        )}
                    </div>

                    <div className="input">
                        <img src={password_icon} alt=""/>
                        <input
                            type="password"
                            placeholder="Password"
                            {...formik.getFieldProps('password')}
                            style={{borderColor: formik.touched.password && formik.errors.password ? 'red' : ''}}
                        />
                        {formik.touched.password && formik.errors.password && (
                            <div className="error">{formik.errors.password}</div>
                        )}
                    </div>

                    {action === 'Sign Up' && (
                        <>
                            <div className="input">
                                <img src={name_icon} alt=""/>
                                <input
                                    type="text"
                                    id="firstName"
                                    placeholder="First Name"
                                    {...formik.getFieldProps('firstName')}
                                    style={{
                                        borderColor: formik.touched.firstName && formik.errors.firstName ? 'red' : '',
                                    }}
                                />
                                {formik.touched.firstName && formik.errors.firstName && (
                                    <div className="error">{formik.errors.firstName}</div>
                                )}
                            </div>
                            <div className="input">
                                <img src={name_icon} alt=""/>
                                <input
                                    type="text"
                                    id="lastName"
                                    placeholder="Last Name"
                                    {...formik.getFieldProps('lastName')}
                                    style={{
                                        borderColor: formik.touched.lastName && formik.errors.lastName ? 'red' : '',
                                    }}
                                />
                                {formik.touched.lastName && formik.errors.lastName && (
                                    <div className="error">{formik.errors.lastName}</div>
                                )}
                            </div>
                            <div className="input">
                                <img src={phone_icon} alt=""/>
                                <input
                                    type="tel"
                                    id="phoneNumber"
                                    placeholder="Phone Number"
                                    {...formik.getFieldProps('phoneNumber')}
                                    style={{
                                        borderColor: formik.touched.phoneNumber && formik.errors.phoneNumber ? 'red' : '',
                                    }}
                                />
                                {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                                    <div className="error">{formik.errors.phoneNumber}</div>
                                )}
                            </div>
                        </>
                    )}
                </div>
                {action === 'Login' && (
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <label style={{ marginLeft: '60px' }}>
                            <input
                                type="checkbox"
                                {...formik.getFieldProps('rememberMe')}
                            />
                            Remember Me
                        </label>
                    </div>
                )}

                <div className="submit-container">
                    <div
                        className={action === 'Login' ? 'submit gray' : 'submit'}
                        onClick={() => setAction('Sign Up')}
                    >
                        Sign Up
                    </div>
                    <div
                        className={action === 'Sign Up' ? 'submit gray' : 'submit'}
                        onClick={() => setAction('Login')}
                    >
                        Login
                    </div>
                </div>
                <button type="submit" className="submitButton">
                    Submit
                </button>
            </div>

        </form>
    );
};

export default LoginSignUp;