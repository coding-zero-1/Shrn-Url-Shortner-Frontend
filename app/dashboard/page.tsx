"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
    } catch (error) {
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
    } catch (error) {
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
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">
          Manage your short links and view analytics.
        </p>
      </div>

      <CreateLink onLinkCreated={fetchLinks} />

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200 bg-gray-50/50">
          <h2 className="text-lg font-semibold text-gray-900">Your Links</h2>
        </div>

        {fetchingLinks ? (
          <div className="p-12 flex justify-center">
            <span className="animate-spin h-8 w-8 border-4 border-gray-900 border-t-transparent rounded-full" />
          </div>
        ) : links.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            You haven&apos;t created any links yet.
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {links.map((link) => (
              <div
                key={link.id}
                className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:bg-gray-50 transition-colors"
                title={link.originalUrl}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <a
                      href={`${process.env.NEXT_PUBLIC_BACKEND_URL}/re/${link.shortCode}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-lg font-bold text-gray-900 hover:text-blue-600 hover:underline truncate transition-colors"
                    >
                      /{link.shortCode}
                    </a>
                    <button
                      onClick={() => copyToClipboard(link.shortCode)}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                      title="Copy"
                    >
                      <FaCopy />
                    </button>
                  </div>
                  <p className="text-sm text-gray-500 truncate max-w-md">
                    {link.originalUrl}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(link.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Button
                    variant="secondary"
                    className="text-sm bg-white border border-gray-200 shadow-sm hover:bg-gray-50"
                    onClick={() => setSelectedLinkId(link.id)}
                  >
                    <FaChartBar className="mr-2" /> Analytics
                  </Button>
                  <Button
                    variant="ghost"
                    className="text-red-500 hover:bg-red-50 hover:text-red-700 text-sm"
                    onClick={() => promptDelete(link.id)}
                  >
                    <FaTrash />
                  </Button>
                </div>
              </div>
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
