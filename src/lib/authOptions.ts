import { AuthOptions } from "next-auth";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import dbConnect from "./connectDB";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

const authOptions: AuthOptions = {
  adapter: MongoDBAdapter(await dbConnect()),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials!;
        const User = (await import("@/lib/userModel")).default;
        const user = await User.findOne({ email });

        if (!user) {
          throw new Error("No user found with this email");
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
          throw new Error("Invalid password");
        }

        return { id: user._id, email: user.email };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default authOptions;
