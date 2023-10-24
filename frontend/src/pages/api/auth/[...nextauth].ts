import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                //aca va la llamada al backend
                const user = { id: "1", name: "J Smith", email: "jsmith@example.com" }

                if (user) {
                    // Any object returned will be saved in `user` property of the JWT
                    return user
                } else {
                    // If you return null then an error will be displayed advising the user to check their details.
                    return null

                    // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
                }
            },
        }),
    ],
    // callbacks: {
    //     async jwt({ token, user }) {
    //         return { ...token, ...user };
    //     },
    //     async session({ session, token }) {
    //         session.user = token as any;
    //         return session;
    //     },
    // },
});


