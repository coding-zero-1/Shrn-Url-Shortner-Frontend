"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import axios from "axios";
import toast from "react-hot-toast";
import API from "@/lib/api";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

const SignUp = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post("/user/signup", formData);
      toast.success("Account created! Please sign in.");
      router.push("/auth/signin");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.msg || "Failed to sign up");
      } else {
        toast.error("Failed to sign up");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto mt-6 grid w-full max-w-5xl grid-cols-1 gap-6 lg:mt-10 lg:grid-cols-2">
      <motion.section
        initial={{ opacity: 0, x: -25 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="section-shell hidden p-8 lg:block"
      >
        <p className="text-xs uppercase tracking-[0.16em] text-slate-400">
          Build Faster
        </p>
        <h1 className="mt-4 font-display text-4xl font-semibold leading-tight">
          Create your Shrn account
          <br />
          and ship links today.
        </h1>
        <p className="mt-4 max-w-sm text-slate-300">
          Start free, shorten any destination URL, and track campaign impact in
          real time.
        </p>
        <div className="mt-8 space-y-3">
          <AuthHighlight text="Simple setup in less than a minute" />
          <AuthHighlight text="No complexity for your team" />
          <AuthHighlight text="Insightful analytics from day one" />
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, x: 25 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="section-shell p-6 sm:p-8"
      >
        <h2 className="font-display text-2xl font-semibold text-slate-50">
          Create Account
        </h2>
        <p className="mt-2 text-sm text-slate-300">Start your free workspace.</p>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <Input
            label="Username"
            name="username"
            placeholder="johndoe"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <Input
            label="Email"
            name="email"
            type="email"
            placeholder="john@example.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <Input
            label="Password"
            name="password"
            type="password"
            placeholder="********"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <Button type="submit" className="w-full py-3" isLoading={loading}>
            Sign Up
          </Button>
        </form>
        <p className="mt-5 text-center text-sm text-slate-300">
          Already have an account?{" "}
          <Link href="/auth/signin" className="font-semibold text-cyan-300 hover:text-cyan-200">
            Sign In
          </Link>
        </p>
      </motion.section>
    </div>
  );
};

const AuthHighlight = ({ text }: { text: string }) => (
  <div className="glass-panel flex items-center gap-3 p-3 text-sm text-slate-200">
    <span className="h-2 w-2 rounded-full bg-cyan-300" />
    <span>{text}</span>
  </div>
);

export default SignUp;
