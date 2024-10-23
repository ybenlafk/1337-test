"use client";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil, Trash2, Check, X, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Candidate, EditForm } from "@/app/types/types";
import { Badge } from "@/components/ui/badge";
import Pagination from "@/app/dashboard/candidates/components/Pagination";

const ITEMS_PER_PAGE = 10;

const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-40">
    <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
  </div>
);

const EmptyState = () => (
  <div className="flex items-center justify-center h-40">
    <span className="text-gray-500 dark:text-gray-400">
      No candidates found.
    </span>
  </div>
);

const TableHeader = () => (
  <thead>
    <tr className="border-b border-gray-200 dark:border-gray-800">
      <th className="px-4 py-2 text-left font-medium text-gray-500 dark:text-gray-400 w-1/4">
        Candidate
      </th>
      <th className="px-4 py-2 text-left font-medium text-gray-500 dark:text-gray-400 w-1/4">
        Email
      </th>
      <th className="px-4 py-2 text-left font-medium text-gray-500 dark:text-gray-400 w-2/5">
        Skills
      </th>
      <th className="px-4 py-2 text-right font-medium text-gray-500 dark:text-gray-400 w-1/12">
        Actions
      </th>
    </tr>
  </thead>
);

const SkillBadge = ({
  skill,
  onRemove,
  isEditing,
}: {
  skill: string;
  onRemove?: () => void;
  isEditing: boolean;
}) => (
  <Badge
    className="mr-1 mb-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
    variant="secondary"
  >
    {skill}
    {isEditing && (
      <button
        onClick={onRemove}
        className="ml-1 hover:text-blue-600 dark:hover:text-blue-300"
      >
        ×
      </button>
    )}
  </Badge>
);

export default function CandidateManagement() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [editForm, setEditForm] = useState<EditForm>({
    name: "",
    email: "",
    skills: [],
  });
  const [newSkill, setNewSkill] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const totalPages = useMemo(
    () => Math.ceil(candidates.length / ITEMS_PER_PAGE),
    [candidates.length]
  );

  const startIndex = useMemo(
    () => (currentPage - 1) * ITEMS_PER_PAGE,
    [currentPage]
  );

  const endIndex = useMemo(() => startIndex + ITEMS_PER_PAGE, [startIndex]);

  const currentCandidates = useMemo(
    () => candidates.slice(startIndex, endIndex),
    [candidates, startIndex, endIndex]
  );

  const fetchCandidates = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/candidates");
      setCandidates(response.data);
    } catch (error) {
      console.error("Error fetching candidates:", error);
      toast({
        title: "Error",
        description: "Failed to fetch candidates. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchCandidates();
  }, [fetchCandidates]);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/candidates/${id}`);
      setCandidates((prev) => prev.filter((candidate) => candidate.id !== id));
      toast({
        title: "Success",
        description: "Candidate has been successfully deleted.",
      });
    } catch (error) {
      console.error("Error deleting candidate:", error);
      toast({
        title: "Error",
        description: "Failed to delete candidate. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleEdit = useCallback((candidate: Candidate) => {
    setEditingId(candidate.id);
    setEditForm({
      name: candidate.name,
      email: candidate.email,
      skills: [...candidate.skills],
    });
  }, []);

  const handleAddSkill = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && newSkill.trim()) {
      if (!editForm.skills.includes(newSkill.trim())) {
        setEditForm((prev) => ({
          ...prev,
          skills: [...prev.skills, newSkill.trim()],
        }));
      }
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setEditForm((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }));
  };

  const handleSave = async (id: string) => {
    try {
      const response = await axios.put(`/api/candidates/${id}`, editForm);
      setCandidates((prev) =>
        prev.map((c) => (c.id === id ? response.data : c))
      );
      setEditingId(null);
      setEditForm({ name: "", email: "", skills: [] });
      toast({
        title: "Success",
        description: "Candidate has been successfully updated.",
      });
    } catch (error) {
      console.error("Error updating candidate:", error);
      toast({
        title: "Error",
        description: "Failed to update candidate. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleCancel = useCallback(() => {
    setEditingId(null);
    setEditForm({ name: "", email: "", skills: [] });
  }, []);

  const handlePageChange = useCallback((newPage: number) => {
    setCurrentPage(newPage);
  }, []);

  const renderTableRow = useCallback(
    (candidate: Candidate) => {
      const isEditing = editingId === candidate.id;

      return (
        <tr
          key={candidate.id}
          className="border-b border-gray-200 dark:border-gray-800 last:border-b-0"
        >
          <td className="px-4 py-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8 bg-gray-100 dark:bg-gray-800">
                <AvatarImage src={candidate.avatarUrl} alt={candidate.name} />
                <AvatarFallback className="text-gray-900 dark:text-gray-100">
                  {candidate.name[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
              {isEditing ? (
                <Input
                  className="w-40"
                  value={editForm.name}
                  onChange={(e) =>
                    setEditForm((prev) => ({ ...prev, name: e.target.value }))
                  }
                  autoFocus
                />
              ) : (
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {candidate.name}
                </span>
              )}
            </div>
          </td>
          <td className="px-4 py-4">
            {isEditing ? (
              <Input
                value={editForm.email}
                onChange={(e) =>
                  setEditForm((prev) => ({ ...prev, email: e.target.value }))
                }
              />
            ) : (
              <span className="text-gray-600 dark:text-gray-300">
                {candidate.email}
              </span>
            )}
          </td>
          {renderSkillsCell(candidate, isEditing)}
          <td className="px-4 py-4">
            <div className="flex gap-2 justify-end">
              {isEditing ? (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSave(candidate.id)}
                  >
                    <Check className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={handleCancel}>
                    <X className="h-4 w-4" />
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(candidate)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(candidate.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </>
              )}
            </div>
          </td>
        </tr>
      );
    },
    [editingId, editForm, handleCancel, handleEdit, handleDelete, handleSave]
  );

  const renderSkillsCell = (candidate: Candidate, isEditing: boolean) => (
    <td className="px-4 py-4">
      <div className="flex flex-wrap gap-1 max-w-md">
        {isEditing ? (
          <>
            <div className="flex flex-wrap gap-1 mb-2">
              {editForm.skills.map((skill) => (
                <SkillBadge
                  key={skill}
                  skill={skill}
                  onRemove={() => handleRemoveSkill(skill)}
                  isEditing={true}
                />
              ))}
            </div>
            <div className="flex items-center gap-2 w-full">
              <Input
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyDown={handleAddSkill}
                placeholder="Add skill and press Enter"
                className="w-full"
              />
            </div>
          </>
        ) : (
          candidate.skills.map((skill) => (
            <SkillBadge key={skill} skill={skill} isEditing={false} />
          ))
        )}
      </div>
    </td>
  );

  if (loading) {
    return (
      <Card className="w-full border border-gray-200 dark:border-gray-800">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-gray-100">
            All Candidates
          </CardTitle>
        </CardHeader>
        <CardContent>
          <LoadingSpinner />
        </CardContent>
      </Card>
    );
  }

  if (!candidates.length) {
    return (
      <Card className="w-full border border-gray-200 dark:border-gray-800">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-gray-100">
            All Candidates
          </CardTitle>
        </CardHeader>
        <CardContent>
          <EmptyState />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full border border-gray-200 dark:border-gray-800">
      <CardHeader>
        <CardTitle className="text-gray-900 dark:text-gray-100">
          All Candidates
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <TableHeader />
            <tbody>{currentCandidates.map(renderTableRow)}</tbody>
          </table>
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          totalItems={candidates.length}
          startIndex={startIndex}
          endIndex={endIndex}
        />
      </CardContent>
    </Card>
  );
}
