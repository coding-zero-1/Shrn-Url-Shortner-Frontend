"use client";

import React, { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import API from "@/lib/api";
import Button from "../ui/Button";

interface AnalyticsModalProps {
  shortLinkId: string;
  isOpen: boolean;
  onClose: () => void;
}

interface CountData {
  count: number;
  [key: string]: string | number;
}

interface AnalyticsData {
  totalClicks: number;
  clicksByCountry: CountData[];
  clicksByDevice: CountData[];
  clicksByBrowser: CountData[];
}

const AnalyticsModal: React.FC<AnalyticsModalProps> = ({
  shortLinkId,
  isOpen,
  onClose,
}) => {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchAnalytics = useCallback(async () => {
    setLoading(true);
    try {
      const res = await API.get(`/shortLink/getShortLinkAnalytics/${shortLinkId}`);
      setData(res.data.data);
    } catch (error) {
      console.error("Failed to fetch analytics", error);
    } finally {
      setLoading(false);
    }
  }, [shortLinkId]);

  useEffect(() => {
    if (isOpen && shortLinkId) {
      fetchAnalytics();
    }
  }, [isOpen, shortLinkId, fetchAnalytics]);

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm"
        >
          <motion.div
            initial={{ y: 24, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 16, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.26, ease: "easeOut" }}
            className="section-shell max-h-[90vh] w-full max-w-5xl overflow-y-auto"
          >
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-600/30 bg-slate-950/65 px-6 py-4 backdrop-blur-xl">
              <h2 className="font-display text-xl font-semibold text-slate-50">Analytics</h2>
              <Button variant="ghost" onClick={onClose}>
                Close
              </Button>
            </div>

            <div className="p-6">
              {loading ? (
                <div className="flex justify-center p-12">
                  <span className="h-8 w-8 animate-spin rounded-full border-4 border-cyan-200 border-t-transparent" />
                </div>
              ) : data ? (
                <div className="space-y-8">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <StatCard title="Total Clicks" value={data.totalClicks} />
                    <StatCard title="Countries" value={data.clicksByCountry.length} />
                    <StatCard title="Devices" value={data.clicksByDevice.length} />
                  </div>

                  <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    <ChartSection
                      title="Clicks by Browser"
                      data={data.clicksByBrowser}
                      dataKey="browser"
                    />
                    <ChartSection
                      title="Clicks by Device"
                      data={data.clicksByDevice}
                      dataKey="device"
                    />
                    <ChartSection
                      title="Clicks by Country"
                      data={data.clicksByCountry}
                      dataKey="country"
                    />
                  </div>
                </div>
              ) : (
                <p className="py-8 text-center text-slate-300">No data available.</p>
              )}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

const StatCard = ({ title, value }: { title: string; value: number }) => (
  <div className="glass-panel p-4">
    <p className="text-sm text-slate-400">{title}</p>
    <p className="font-display text-2xl font-semibold text-slate-50">{value}</p>
  </div>
);

const ChartSection = ({
  title,
  data,
  dataKey,
}: {
  title: string;
  data: CountData[];
  dataKey: string;
}) => {
  const colors = ["#7dd3fc", "#38bdf8", "#0ea5e9", "#0284c7", "#0369a1"];

  return (
    <div className="glass-panel p-4">
      <h3 className="font-display mb-4 text-lg font-semibold text-slate-50">{title}</h3>
      {data.length > 0 ? (
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#334155" />
              <XAxis type="number" hide />
              <YAxis
                dataKey={dataKey}
                type="category"
                width={90}
                tick={{ fontSize: 12, fill: "#cbd5e1" }}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: "12px",
                  border: "1px solid rgba(148,163,184,0.22)",
                  backgroundColor: "rgba(15,23,39,0.92)",
                  color: "#f8fafc",
                }}
                cursor={{ fill: "rgba(148,163,184,0.08)" }}
              />
              <Bar dataKey="count" radius={[0, 8, 8, 0]}>
                {data.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="flex h-64 items-center justify-center text-sm text-slate-400">
          No data
        </div>
      )}
    </div>
  );
};

export default AnalyticsModal;
