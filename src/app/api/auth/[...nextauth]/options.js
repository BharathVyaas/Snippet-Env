import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";

export const options = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username:",
          type: "text",
          placeholder: "your username...",
        },
        password: {
          label: "Password:",
          type: "password",
          placeholder: "your password...",
        },
      },
      async authorize(credentials) {
        const user = { id: "42", name: "dave", password: "nextauth" };

        if (
          credentials.username === user.name &&
          credentials.password === user.password
        ) {
          return user;
        } else return null;
      },
    }),
  ],
};
