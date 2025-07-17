import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import EmailProvider from 'next-auth/providers/email'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { prisma } from '../../../../lib/prisma'

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
    // Dummy admin account for testing
    CredentialsProvider({
      id: 'admin-credentials',
      name: 'Admin Login',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        // Check if it's the dummy admin account
        if (credentials?.email === 'admin@mail.com' && credentials?.password === 'admin123') {
          // Check if admin user exists in database, if not create it
          let adminUser = await prisma.user.findUnique({
            where: { email: 'admin@mail.com' }
          });

          if (!adminUser) {
            adminUser = await prisma.user.create({
              data: {
                email: 'admin@mail.com',
                name: 'Admin User',
                role: 'admin',
                departemen: 'IT',
                emailVerified: new Date(),
              }
            });
          }

          return {
            id: adminUser.id,
            email: adminUser.email,
            name: adminUser.name,
            role: adminUser.role,
            departemen: adminUser.departemen,
          };
        }
        return null;
      }
    }),
  ],
  callbacks: {
    async session({ session, user, token }) {
      // For database sessions (OAuth and email)
      if (user) {
        session.user.id = user.id;
        session.user.role = user.role;
        session.user.departemen = user.departemen;
      }
      // For JWT sessions (credentials)
      else if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.departemen = token.departemen;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.departemen = user.departemen;
      }
      return token;
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  session: {
    strategy: 'jwt', // Changed to JWT to support credentials provider
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
