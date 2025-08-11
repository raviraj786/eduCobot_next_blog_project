import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/context/AuthContext";
import { cookies } from "next/headers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EduCOBOT",
  description: "Blogs apps.........",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {



  const cookieStore = cookies();
  const authToken = cookieStore.get("auth_token")?.value;
  const isLoggedIn = Boolean(authToken);




  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider initialIsLoggedIn={isLoggedIn} >
          <Header />
          <div className="min-h-screen">{children}</div>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
