export interface User {
    userId: number;
    username: string;
    role: string;
    accessToken: string;
    expiresIn: number;
    refreshToken: string;
    scope: string;
}