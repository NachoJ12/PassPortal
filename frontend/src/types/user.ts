export interface User {
    userID: number;
    username: string;
    role: string;
    accessToken: string;
    expiresIn: number;
    refreshToken: string;
    scope: string;
}