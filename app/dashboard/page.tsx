"use client";
import React, { useEffect, useState } from "react";
import { Users, UserPlus } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { Candidate, DashboardCounts } from "@/app/types/types";
import MetricCard from "./components/MetricCard";
import CandidatesTable from "./components/CandidatesTable";
import axios from "axios";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const staggeredContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function DashboardPage() {
  const { toast } = useToast();
  const [counts, setCounts] = useState<DashboardCounts>({ total: 0, new: 0 });
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const [countsResponse, candidatesResponse] = await Promise.all([
        axios.get("/api/candidates/count"),
        axios.get("/api/candidates/recent"),
      ]);

      setCounts(countsResponse.data);
      setCandidates(candidatesResponse.data);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to fetch dashboard data";

      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    const interval = setInterval(fetchDashboardData, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-background to-background/80 p-6"
    >
      <div className="max-w-7xl mx-auto space-y-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <h1 className="text-4xl font-bold tracking-tight">Dashboard</h1>
          <AnimatePresence mode="wait">
            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
              >
                <Alert variant="destructive" className="mt-4">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div
          variants={staggeredContainer}
          initial="initial"
          animate="animate"
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <MetricCard
            icon={<Users className="h-6 w-6" />}
            value={counts.total}
            label="Total Candidates"
            change="↑ 12%"
            isLoading={isLoading}
            delay={0.1}
          />
          <MetricCard
            icon={<UserPlus className="h-6 w-6" />}
            value={counts.new}
            label="New This Week"
            change="↑ 8%"
            isLoading={isLoading}
            delay={0.2}
          />
        </motion.div>

        <CandidatesTable
          candidates={candidates}
          isLoading={isLoading}
          fadeIn={fadeIn}
        />
      </div>
    </motion.div>
  );
}
