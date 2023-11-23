export interface LoginUserDto {
    login: string;
    password: string;
    rememberMe: boolean;
}


export interface CreateUserDto {
    firstName: string;
    lastName: string;
    login: string;
    email: string;
    phoneNumber?: string;
    password: string;
}

