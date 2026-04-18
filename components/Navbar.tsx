"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import Button from "./ui/Button";

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="sticky top-0 z-50 border-b border-slate-700/40 bg-slate-950/45 backdrop-blur-xl"
    >
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="font-display text-2xl font-bold tracking-tight text-slate-100"
        >
          Shrn<span className="text-cyan-300">.</span>
        </Link>
        <div className="flex items-center gap-2 sm:gap-4">
          {isAuthenticated ? (
            <>
              <Link
                href="/dashboard"
                className="rounded-lg px-3 py-1.5 text-sm font-medium text-slate-300 transition-colors hover:text-slate-100"
              >
                Dashboard
              </Link>
              <Button onClick={logout} variant="ghost" className="text-sm">
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Link href="/auth/signin">
                <Button variant="ghost" className="text-sm sm:text-base">
                  Sign In
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button className="text-sm sm:text-base">Get Started</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
