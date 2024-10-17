import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        // Here you would usually query your database to find the user and verify the password
        // For this example, we'll use a mock user
        if (credentials?.email === "user@example.com" && credentials?.password === "password") {
          return { id: "1", name: "J Smith", email: "user@example.com" }
        } else {
          return null
        }
      }
    })
  ],
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id
      }
      return session
    },
  },
}

export default NextAuth(authOptions)