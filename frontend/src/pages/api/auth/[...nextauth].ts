import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth"


export const authOptions : NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                //aca va la llamada al backend
                const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/login`, {
                    method: "POST", 
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*"
                    },
                    body: JSON.stringify(credentials),
                })

                const user = await res.json()
                if (res.ok && user) {
                    
                    return user
                }
                return user
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            return { ...token, ...user };
        },
        async session({ session, token }) {
            session.user = token as any;
            
            return session;
        },
    },
    pages: {
        signIn: "/login",
    },
    
};


export default NextAuth(authOptions)
