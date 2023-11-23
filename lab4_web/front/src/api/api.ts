import axios from 'axios';
import {CreateUserDto, LoginUserDto} from "./dtos/request.interfaces";
import {Order, ProductResponse, User} from "./dtos/response.interfaces";

const apiBaseUrl = "http://localhost:3000/api"


const api = axios.create({
    baseURL: apiBaseUrl,
    headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "http:/localhost:3001",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
    },
    withCredentials: true,
});

interface ApiResponse<T> {
    data: T;
    status: number;
}

interface ErrorApiResponse {
    error: string;
    code: number;
}
export const getProducts = async (sortBy?: string, search?: string) => {
    try {
        const response = await api.get('/products', {
            params: {
                sortBy,
                search,
            },
        });
        return { data: response.data, status: response.status }
    } catch (error) {
        // @ts-ignore
        throw error.response.data;
    }
};
export const loginUser = async (loginUserDto: LoginUserDto): Promise<ApiResponse<any> | ErrorApiResponse> => {
    try {
        console.log(loginUserDto);
        const response = await api.post('/auth/login', JSON.stringify(loginUserDto), {headers: {
                "Access-Control-Allow-Origin": "http:/localhost:3001",
                "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
                'Content-Type': 'application/json',
            },});
        return { data: response.data, status: response.status } as ApiResponse<any>;
    } catch (error: any) {
        if (error.response) {
            return { error: error.response.errors, code: error.response.status } as ErrorApiResponse;
        }
        throw { error: 'Unknown error', code: 500 } as ErrorApiResponse;
    }
};

export const createUser = async (createUserDto: CreateUserDto): Promise<ApiResponse<any> | ErrorApiResponse> => {
    try {
        const response = await api.post('/users/create', JSON.stringify(createUserDto));
        return { data: response.data, status: response.status } as ApiResponse<any>;
    } catch (error:any) {
        if (error.response) {
            return { error: error.response.data, code: error.response.status } as ErrorApiResponse;
        }
        throw { error: 'Unknown error', code: 500 } as ErrorApiResponse;
    }
};
export const getUserInfo = async (): Promise<User> => {
    try {
        const response = await api.get('/users/me');
        return response.data.data as User;
    } catch (error: any) {
        throw new Error(error.response?.data?.text || 'Error retrieving user info');
    }
};
export const getMyOrders = async (): Promise<Order[]>=>{
    try {
        const response = await api.get('/orders/my-orders');
        return response.data as Order[];
    } catch (error: any) {
        throw new Error(error.response?.data?.text || 'Error retrieving user orders');
    }
}
export default api;
