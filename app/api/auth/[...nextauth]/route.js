import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // TODO: Replace with real user lookup (DB, API, etc.)
        if (
          credentials.username === "admin@mail.com" &&
          credentials.password === "password123"
        ) {
          return { id: 1, name: "Admin User", email: "admin@example.com" };
        }
        return null; // return null if authentication fails
      },
    }),
  ],

  pages: {
    signIn: "/auth/signin", // custom sign-in page
  },

  callbacks: {
    async redirect({ url, baseUrl }) {
      return `${baseUrl}/dashboard-test`; // always go to dashboard after login
    },
  },

  session: {
    strategy: "jwt", // use JWT sessions (simpler for API routes)
  },

  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
