import { AuthProvider } from "./context/AuthProvider";
import { SnippetProvider } from "./context/SnippetProvider";
import "./globals.css";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <AuthProvider>
        <SnippetProvider>
          <body>{children}</body>
        </SnippetProvider>
      </AuthProvider>
    </html>
  );
}
