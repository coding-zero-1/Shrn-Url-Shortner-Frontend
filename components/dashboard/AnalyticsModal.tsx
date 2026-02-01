"use client";

import React, { useEffect, useState } from "react";
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

const AnalyticsModal: React.FC<AnalyticsModalProps> = ({
  shortLinkId,
  isOpen,
  onClose,
}) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen && shortLinkId) {
      fetchAnalytics();
    }
  }, [isOpen, shortLinkId]);

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const res = await API.get(
        `/shortLink/getShortLinkAnalytics/${shortLinkId}`,
      );
      setData(res.data.data);
    } catch (error) {
      console.error("Failed to fetch analytics", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-gray-200">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10">
          <h2 className="text-xl font-bold text-gray-900">Analytics</h2>
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
        </div>

        <div className="p-6">
          {loading ? (
            <div className="flex justify-center p-12">
              <span className="animate-spin h-8 w-8 border-4 border-gray-900 border-t-transparent rounded-full" />
            </div>
          ) : data ? (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard title="Total Clicks" value={data.totalClicks} />
                <StatCard
                  title="Countries"
                  value={data.clicksByCountry.length}
                />
                <StatCard title="Devices" value={data.clicksByDevice.length} />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
            <p className="text-center text-gray-500">No data available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value }: { title: string; value: number }) => (
  <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
    <p className="text-sm text-gray-500">{title}</p>
    <p className="text-2xl font-bold text-gray-900">{value}</p>
  </div>
);

const ChartSection = ({
  title,
  data,
  dataKey,
}: {
  title: string;
  data: any[];
  dataKey: string;
}) => {
  const colors = ["#1f2937", "#4b5563", "#6b7280", "#9ca3af", "#d1d5db"];

  return (
    <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
      <h3 className="text-lg font-semibold mb-4 text-gray-900">{title}</h3>
      {data.length > 0 ? (
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="vertical">
              <CartesianGrid
                strokeDasharray="3 3"
                horizontal={false}
                stroke="#e5e7eb"
              />
              <XAxis type="number" hide />
              <YAxis
                dataKey={dataKey}
                type="category"
                width={80}
                tick={{ fontSize: 12, fill: "#374151" }}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: "8px",
                  border: "1px solid #e5e7eb",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                }}
                cursor={{ fill: "transparent" }}
              />
              <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={colors[index % colors.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="h-64 flex items-center justify-center text-gray-500 text-sm">
          No data
        </div>
      )}
    </div>
  );
};

export default AnalyticsModal;
