export interface Manufacturer {
    id: string;
    name: string;
    country: string;
    foundationDate: string;
}

export interface Category {
    id: string;
    name: string;
}
export interface Product{
    id: string;
    name: string;
    price: number;
    unit: string;
    createdAt: Date;
    updatedAt: Date;
    category: Category;
    manufacturer?: Manufacturer;
}
export interface ProductResponse extends Array<Product> {}
export interface User {
    firstName: string;
    lastName: string;
    login: string;
    role: string;
    email: string;
    phoneNumber: string | null;
    authProvider: string;
    createdAt: string;
    updatedAt: string;
}


interface ProductInOrder {
    id: string;
    quantity: number;
    product: {
        id: string;
        name: string;
        unit: string;
        price: number;
        manufacturer: Manufacturer;
    };
}

export interface Order {
    id: string;
    createdAt: string;
    products: ProductInOrder[];
}
