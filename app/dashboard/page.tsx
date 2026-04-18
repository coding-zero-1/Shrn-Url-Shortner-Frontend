"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { FaChartBar, FaTrash, FaCopy } from "react-icons/fa";
import API from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import Button from "@/components/ui/Button";
import CreateLink from "@/components/dashboard/CreateLink";
import AnalyticsModal from "@/components/dashboard/AnalyticsModal";
import ConfirmationModal from "@/components/ui/ConfirmationModal";

interface ShortLink {
  id: string;
  originalUrl: string;
  shortCode: string;
  isActive: boolean;
  createdAt: string;
}

export default function Dashboard() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [links, setLinks] = useState<ShortLink[]>([]);
  const [fetchingLinks, setFetchingLinks] = useState(true);
  const [selectedLinkId, setSelectedLinkId] = useState<string | null>(null);

  // Delete Modal State
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [linkToDelete, setLinkToDelete] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/auth/signin");
    }
  }, [isLoading, isAuthenticated, router]);

  const fetchLinks = async () => {
    setFetchingLinks(true);
    try {
      const res = await API.get("/shortLink/getAllShortLinks");
      setLinks(res.data.data);
    } catch {
      setLinks([]);
    } finally {
      setFetchingLinks(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchLinks();
    }
  }, [isAuthenticated]);

  const promptDelete = (id: string) => {
    setLinkToDelete(id);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!linkToDelete) return;
    setDeleting(true);
    try {
      await API.delete(`/shortLink/deleteShortLink/${linkToDelete}`);
      toast.success("Link deleted");
      fetchLinks();
    } catch {
      toast.error("Failed to delete link");
    } finally {
      setDeleting(false);
      setDeleteModalOpen(false);
      setLinkToDelete(null);
    }
  };

  const copyToClipboard = (shortCode: string) => {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/re/${shortCode}`;
    navigator.clipboard.writeText(url);
    toast.success("Copied to clipboard!");
  };

  // Prevent flash of content
  if (isLoading || !isAuthenticated) {
    return null;
  }

  return (
    <div className="mx-auto max-w-5xl">
      <motion.div
        initial={{ y: 18, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mb-6 rounded-3xl border border-slate-200 bg-white/95 px-6 py-5 shadow-[0_20px_55px_rgba(15,23,42,0.12)] sm:mb-8"
      >
        <h1 className="font-display text-3xl font-semibold text-slate-950 sm:text-4xl">
          Dashboard
        </h1>
        <p className="mt-2 text-slate-700">Manage your short links and view analytics.</p>
      </motion.div>

      <CreateLink onLinkCreated={fetchLinks} />

      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white/95 shadow-[0_20px_55px_rgba(15,23,42,0.12)]">
        <div className="border-b border-slate-200 px-6 py-4">
          <h2 className="font-display text-lg font-semibold text-slate-950">Your Links</h2>
        </div>

        {fetchingLinks ? (
          <div className="flex justify-center p-12">
            <span className="h-8 w-8 animate-spin rounded-full border-4 border-slate-500 border-t-transparent" />
          </div>
        ) : links.length === 0 ? (
          <div className="p-12 text-center text-slate-600">
            You haven&apos;t created any links yet.
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {links.map((link, index) => (
              <motion.div
                key={link.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: index * 0.04, ease: "easeOut" }}
                className="flex flex-col gap-4 px-6 py-5 transition-colors hover:bg-slate-50 md:flex-row md:items-center md:justify-between"
                title={link.originalUrl}
              >
                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex items-center gap-2">
                    <a
                      href={`${process.env.NEXT_PUBLIC_BACKEND_URL}/re/${link.shortCode}`}
                      target="_blank"
                      rel="noreferrer"
                      className="truncate font-display text-lg font-semibold text-slate-900 transition-colors hover:text-slate-950 hover:underline"
                    >
                      /{link.shortCode}
                    </a>
                    <button
                      onClick={() => copyToClipboard(link.shortCode)}
                      className="text-slate-500 transition-colors hover:text-slate-800"
                      title="Copy"
                    >
                      <FaCopy />
                    </button>
                  </div>
                  <p className="max-w-2xl truncate text-sm text-slate-700">{link.originalUrl}</p>
                  <p className="mt-1 text-xs text-slate-500">
                    {new Date(link.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex shrink-0 items-center gap-2">
                  <Button
                    variant="secondary"
                    className="text-sm"
                    onClick={() => setSelectedLinkId(link.id)}
                  >
                    <FaChartBar className="mr-2" /> Analytics
                  </Button>
                  <Button
                    variant="ghost"
                    className="text-sm text-rose-600 hover:bg-rose-50 hover:text-rose-700"
                    onClick={() => promptDelete(link.id)}
                  >
                    <FaTrash />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <AnalyticsModal
        shortLinkId={selectedLinkId || ""}
        isOpen={!!selectedLinkId}
        onClose={() => setSelectedLinkId(null)}
      />

      <ConfirmationModal
        isOpen={deleteModalOpen}
        title="Delete Link"
        message="Are you sure you want to delete this link? This action cannot be undone."
        onConfirm={confirmDelete}
        onCancel={() => setDeleteModalOpen(false)}
        isLoading={deleting}
      />
    </div>
  );
}
