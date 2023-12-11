export interface User {
    userId: number;
    username: string;
    email: string;

    role: string;
    accessToken: string;
    expiresIn: number;
    refreshToken: string;
    scope: string;
}