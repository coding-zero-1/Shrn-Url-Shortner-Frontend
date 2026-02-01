"use client";

import React, { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import API from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

const SignIn = () => {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
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
      const res = await API.post("/user/signin", formData);
      if (res.data.success) {
        login(res.data.data); // data is the token
      }
    } catch (error: any) {
      toast.error(error.response?.data?.msg || "Failed to sign in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-8 bg-white rounded-xl shadow-sm border border-gray-200">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-900">
        Welcome Back
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
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
          Sign In
        </Button>
      </form>
      <p className="mt-4 text-center text-sm text-gray-600">
        Don't have an account?{" "}
        <Link
          href="/auth/signup"
          className="text-gray-900 font-medium hover:underline"
        >
          Sign Up
        </Link>
      </p>
    </div>
  );
};

export default SignIn;
