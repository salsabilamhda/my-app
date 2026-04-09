import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import bcrypt from "bcrypt";
import { signIn, loginWithOAuth } from "@/utils/db/servicefirebase";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    // 1. Provider Credentials (Email & Password)
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user: any = await signIn(credentials.email);

        if (user) {
          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (isPasswordValid) {
            return {
              id: user.id,
              email: user.email,
              fullname: user.fullname,
              role: user.role,
            };
          }
        }
        return null;
      },
    }),
    // 2. Provider Google
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    // 3. Provider GitHub
    GitHubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
  ],

  callbacks: {
    async jwt({ token, account, user }: any) {
      // Logika untuk login manual (Credentials)
      if (account?.provider === "credentials" && user) {
        token.email = user.email;
        token.fullname = user.fullname;
        token.role = user.role;
      }

      // Logika Reusable untuk OAuth (Google & GitHub)
      if (account?.provider === "google" || account?.provider === "github") {
        const data = {
          fullname: user.name,
          email: user.email,
          image: user.image,
          type: account.provider,
        };

        // Memanggil service gabungan yang sudah direfaktor
        await loginWithOAuth(data, (result: any) => {
          if (result.status) {
            token.fullname = result.data.fullname;
            token.email = result.data.email;
            token.image = result.data.image;
            token.type = result.data.type;
            token.role = result.data.role; // Role diambil dari Firestore
          }
        });
      }

      return token;
    },

    async session({ session, token }: any) {
      // Memindahkan semua data dari token ke session agar bisa diakses di client
      if (token) {
        session.user.email = token.email;
        session.user.fullname = token.fullname;
        session.user.role = token.role;
        session.user.image = token.image;
        session.user.type = token.type;
      }

      return session;
    },
  },

  pages: {
    signIn: "/auth/login",
  },
};

export default NextAuth(authOptions);