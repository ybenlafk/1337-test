import React from "react";
import { Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion, AnimatePresence } from "framer-motion";
import { Candidate } from "@/app/types/types";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const CandidatesTable = ({
  candidates,
  isLoading,
}: {
  candidates: Candidate[];
  isLoading: boolean;
}) => (
  <motion.div
    initial="initial"
    animate="animate"
    exit="exit"
    variants={fadeIn}
    transition={{ duration: 0.3, delay: 0.2 }}
  >
    <Card className="overflow-hidden bg-card">
      <CardHeader>
        <CardTitle>Recent Applications</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="px-4 py-2 text-left font-medium text-muted-foreground">
                  Candidate
                </th>
                <th className="px-4 py-2 text-left font-medium text-muted-foreground">
                  Email
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={2} className="px-4 py-8 text-center">
                    <Loader2 className="h-6 w-6 animate-spin mx-auto" />
                  </td>
                </tr>
              ) : (
                <AnimatePresence mode="sync">
                  {candidates.map((candidate, index) => (
                    <motion.tr
                      key={candidate.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.2, delay: index * 0.1 }}
                      className="border-b last:border-b-0 hover:bg-muted/50 transition-colors"
                    >
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Avatar className="h-8 w-8">
                              <AvatarImage
                                src={candidate.avatarUrl}
                                alt={candidate.name}
                              />
                              <AvatarFallback>
                                {candidate.name[0].toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                          </motion.div>
                          <span className="font-medium">{candidate.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-muted-foreground">
                        {candidate.email}
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

export default CandidatesTable;
