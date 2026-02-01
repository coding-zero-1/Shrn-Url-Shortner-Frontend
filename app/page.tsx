"use client";

import Link from "next/link";
import { FaBolt, FaChartLine, FaShieldAlt } from "react-icons/fa";
import Button from "@/components/ui/Button";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-65px)] text-center overflow-hidden">
      <div className="max-w-3xl px-4">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 text-gray-900">
          Shorten Your Links, <br /> Expand Your Reach.
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
          A powerful URL shortener built for the modern web. Track clicks,
          analyze your audience, and manage your links in one place.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link href="/auth/signup">
            <Button className="px-8 py-4 text-lg shadow-sm hover:shadow-md transition-all">
              Get Started for Free
            </Button>
          </Link>
          <Link href="/auth/signin">
            <Button
              variant="secondary"
              className="px-8 py-4 text-lg border border-gray-200"
            >
              Sign In
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <FeatureCard
            icon={<FaBolt className="w-6 h-6 text-gray-900" />}
            title="Lightning Fast"
            description="Redirect your users instantly with our optimized infrastructure."
          />
          <FeatureCard
            icon={<FaChartLine className="w-6 h-6 text-gray-900" />}
            title="Detailed Analytics"
            description="Track every click, device, browser, and country in real-time."
          />
          <FeatureCard
            icon={<FaShieldAlt className="w-6 h-6 text-gray-900" />}
            title="Secure & Reliable"
            description="Your links are safe with us. Enterprise-grade security included."
          />
        </div>
      </div>
    </div>
  );
}

const FeatureCard = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => {
  return (
    <div className="p-6 bg-white rounded-xl border border-gray-200 hover:border-gray-300 transition-colors">
      <div className="mb-4 bg-gray-50 w-12 h-12 flex items-center justify-center rounded-lg">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2 text-gray-900">{title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
    </div>
  );
};
