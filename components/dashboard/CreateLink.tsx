"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import toast from "react-hot-toast";
import API from "@/lib/api";
import Button from "../ui/Button";
import Input from "../ui/Input";

interface CreateLinkProps {
  onLinkCreated: () => void;
}

const CreateLink: React.FC<CreateLinkProps> = ({ onLinkCreated }) => {
  const [originalUrl, setOriginalUrl] = useState("");
  const [expiresAt, setExpiresAt] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post("/shortLink/generateShortLink", {
        originalUrl,
        expiresAt: expiresAt ? new Date(expiresAt) : undefined,
      });
      toast.success("Short link created!");
      setOriginalUrl("");
      setExpiresAt("");
      onLinkCreated();
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.msg || "Failed to create link");
      } else {
        toast.error("Failed to create link");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ y: 18, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="mb-6 rounded-3xl border border-slate-200 bg-white/95 p-5 shadow-[0_20px_55px_rgba(15,23,42,0.12)] sm:mb-8 sm:p-6"
    >
      <h2 className="font-display mb-4 text-lg font-semibold text-slate-950">
        Create New Short Link
      </h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 md:flex-row md:items-end"
      >
        <div className="flex-1 w-full">
          <Input
            label="Destination URL"
            labelClassName="text-slate-800"
            placeholder="https://example.com/very-long-url"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            required
            type="url"
          />
        </div>
        <div className="w-full md:w-56 shrink-0">
          <Input
            label="Expires (Optional)"
            labelClassName="text-slate-800"
            type="datetime-local"
            value={expiresAt}
            onChange={(e) => setExpiresAt(e.target.value)}
            min={new Date().toISOString().slice(0, 16)}
          />
        </div>
        <Button
          type="submit"
          isLoading={loading}
          className="w-full md:w-auto shrink-0"
        >
          Shorten
        </Button>
      </form>
    </motion.div>
  );
};

export default CreateLink;
