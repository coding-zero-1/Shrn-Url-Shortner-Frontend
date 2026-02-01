"use client";

import React, { useState } from "react";
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
    } catch (error: any) {
      toast.error(error.response?.data?.msg || "Failed to create link");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8">
      <h2 className="text-lg font-semibold mb-4 text-gray-900">
        Create New Short Link
      </h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row gap-4 items-end"
      >
        <div className="flex-1 w-full">
          <Input
            label="Destination URL"
            placeholder="https://example.com/very-long-url"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            required
            type="url"
          />
        </div>
        <div className="w-full sm:w-48 shrink-0">
          <Input
            label="Expires (Optional)"
            type="datetime-local"
            value={expiresAt}
            onChange={(e) => setExpiresAt(e.target.value)}
            min={new Date().toISOString().slice(0, 16)}
          />
        </div>
        <Button
          type="submit"
          isLoading={loading}
          className="w-full sm:w-auto shrink-0"
        >
          Shorten
        </Button>
      </form>
    </div>
  );
};

export default CreateLink;
