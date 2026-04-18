import type { Metadata } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "react-hot-toast";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shrn - Smart Link Platform",
  description: "Modern URL shortener with insights and control",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${manrope.variable} ${spaceGrotesk.variable} app-bg min-h-screen antialiased text-slate-100`}
      >
        <AuthProvider>
          <div className="relative flex min-h-screen flex-col overflow-x-clip">
            <div className="pointer-events-none absolute inset-0 z-0">
              <div className="aurora aurora-left" />
              <div className="aurora aurora-right" />
              <div className="noise-overlay" />
            </div>
            <Navbar />
            <main className="relative z-10 mx-auto flex-1 w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
              {children}
            </main>
            <Toaster position="bottom-right" toastOptions={{ duration: 3000 }} />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
