"use client";
import React from 'react';
import { Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';

const MetricCard = ({
  icon,
  value,
  label,
  change,
  isLoading,
  delay = 0,
  fadeIn,
}: {
  icon: React.ReactNode;
  value: number;
  label: string;
  change: string;
  isLoading?: boolean;
  delay?: number;
  fadeIn?: any;
}) => (
  <motion.div
    initial="initial"
    animate="animate"
    exit="exit"
    variants={fadeIn}
    transition={{ duration: 0.3, delay }}
  >
    <Card className="bg-card transition-all hover:shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {label}
        </CardTitle>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          {icon}
        </motion.div>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
            >
              <p className="text-2xl font-bold">{value.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">{change}</p>
            </motion.div>
          )}
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

export default MetricCard;
