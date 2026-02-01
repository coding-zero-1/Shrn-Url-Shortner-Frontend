"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
    } catch (error: any) {
      toast.error(error.response?.data?.msg || "Failed to sign up");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-8 bg-white rounded-xl shadow-sm border border-gray-200">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-900">
        Create Account
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
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
          placeholder="••••••••"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <Button type="submit" className="w-full" isLoading={loading}>
          Sign Up
        </Button>
      </form>
      <p className="mt-4 text-center text-sm text-gray-600">
        Already have an account?{" "}
        <Link
          href="/auth/signin"
          className="text-gray-900 font-medium hover:underline"
        >
          Sign In
        </Link>
      </p>
    </div>
  );
};

export default SignUp;
