"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FaBolt, FaChartLine, FaShieldAlt, FaArrowRight } from "react-icons/fa";
import Button from "@/components/ui/Button";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.5 } },
};

export default function Home() {
  return (
    <div className="space-y-8 pb-6 sm:space-y-10 sm:pb-10">
      <motion.section
        variants={container}
        initial="hidden"
        animate="show"
        className="section-shell relative overflow-hidden px-6 py-12 sm:px-10 sm:py-16"
      >
        <div className="absolute -right-24 -top-24 h-56 w-56 rounded-full bg-cyan-300/15 blur-3xl" />
        <div className="absolute -bottom-24 left-0 h-52 w-52 rounded-full bg-sky-500/20 blur-3xl" />
        <motion.p variants={item} className="muted mb-5 text-sm tracking-[0.16em] uppercase">
          LINK INFRASTRUCTURE FOR GROWTH
        </motion.p>
        <motion.h1
          variants={item}
          className="font-display text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl"
        >
          <span className="hero-gradient-text">Shorten smarter.</span> Track every click.
          Move faster.
        </motion.h1>
        <motion.p
          variants={item}
          className="mt-6 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg"
        >
          Shrn helps teams launch branded short links in seconds and measure
          audience behavior with clean, actionable analytics.
        </motion.p>
        <motion.div
          variants={item}
          className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
        >
          <Link href="/auth/signup">
            <Button className="w-full px-7 py-3 text-base sm:w-auto">
              Start for Free <FaArrowRight className="text-xs" />
            </Button>
          </Link>
          <Link href="/auth/signin">
            <Button variant="secondary" className="w-full px-7 py-3 sm:w-auto">
              Sign In
            </Button>
          </Link>
        </motion.div>
        <motion.div
          variants={item}
          className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3"
        >
          <StatCard label="Links created" value="1.2M+" />
          <StatCard label="Avg redirect" value="49ms" />
          <StatCard label="Global uptime" value="99.99%" />
        </motion.div>
      </motion.section>

      <motion.section
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="grid grid-cols-1 gap-4 md:grid-cols-3"
      >
        <motion.div variants={item}>
          <FeatureCard
            icon={<FaBolt className="h-5 w-5 text-cyan-200" />}
            title="Lightning Speed"
            description="Optimized redirects ensure users reach destination pages almost instantly."
          />
        </motion.div>
        <motion.div variants={item}>
          <FeatureCard
            icon={<FaChartLine className="h-5 w-5 text-cyan-200" />}
            title="Actionable Insights"
            description="Measure clicks by browser, device, and geography with clear visual analytics."
          />
        </motion.div>
        <motion.div variants={item}>
          <FeatureCard
            icon={<FaShieldAlt className="h-5 w-5 text-cyan-200" />}
            title="Reliable Security"
            description="Built with secure auth and robust APIs to keep campaigns stable and protected."
          />
        </motion.div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.45 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="section-shell flex flex-col items-start justify-between gap-6 px-6 py-8 sm:flex-row sm:items-center sm:px-8"
      >
        <div>
          <h2 className="font-display text-2xl font-semibold sm:text-3xl">
            Ready to modernize your link stack?
          </h2>
          <p className="mt-2 max-w-xl text-slate-300">
            Create links, monitor impact, and control performance from one
            elegant dashboard.
          </p>
        </div>
        <Link href="/auth/signup" className="w-full sm:w-auto">
          <Button className="w-full px-6 py-3 sm:w-auto">Create Account</Button>
        </Link>
      </motion.section>
    </div>
  );
}

const StatCard = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className="glass-panel p-4">
      <p className="text-xs uppercase tracking-[0.16em] text-slate-400">{label}</p>
      <p className="mt-2 font-display text-2xl font-semibold text-slate-50">{value}</p>
    </div>
  );
};

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
    <div className="section-shell h-full p-6">
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-300/25 bg-cyan-400/10">
        {icon}
      </div>
      <h3 className="font-display text-xl font-semibold text-slate-50">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-300">{description}</p>
    </div>
  );
};
