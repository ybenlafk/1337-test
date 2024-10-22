"use client";
import React from "react";
import { Users, UserPlus, Layers } from "lucide-react";
import { useRouter } from "next/navigation";

const SidebarItem = ({
  icon,
  label,
  onClick,
  isActive,
}: {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  isActive?: boolean;
}) => (
  <div
    onClick={onClick}
    className={`flex items-center space-x-4 px-4 py-2 text-sm rounded-lg cursor-pointer transition-all duration-200 ${
      isActive 
        ? "bg-gray-100 text-gray-900 font-medium dark:bg-gray-800 dark:text-gray-100" 
        : "text-gray-500 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800/50 dark:hover:text-gray-100"
    }`}
  >
    <div className={`${
      isActive 
        ? "text-gray-900 dark:text-gray-100" 
        : "text-gray-500 dark:text-gray-400"
    }`}>
      {icon}
    </div>
    <span className="hidden md:inline">{label}</span>
  </div>
);

const SideBar = () => {
  const router = useRouter();
  const [activeRoute, setActiveRoute] = React.useState<string>("");

  return (
    <div className="w-full md:w-64 p-4 space-y-4 h-full fixed top-0 left-0 md:flex-col justify-between bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800">
      <div className="space-y-4">
        <div
          className="flex items-center space-x-2 mb-6 cursor-pointer"
          onClick={() => {
            router.push("/dashboard");
            setActiveRoute("");
          }}
        >
          <div className="flex justify-center items-center w-8 h-8 bg-black dark:bg-white rounded-full">
            <Layers className="h-5 w-5 text-white dark:text-black" />
          </div>
          <span className="text-xl font-bold text-gray-900 dark:text-white">
            CandidateTrack
          </span>
        </div>
        <SidebarItem
          icon={<Users className="h-5 w-5" />}
          label="Candidates"
          onClick={() => {
            router.push("/dashboard/candidates");
            setActiveRoute("candidates");
          }}
          isActive={activeRoute === "candidates"}
        />
        <SidebarItem
          icon={<UserPlus className="h-5 w-5" />}
          label="Add Candidate"
          onClick={() => {
            router.push("/dashboard/add");
            setActiveRoute("add");
          }}
          isActive={activeRoute === "add"}
        />
      </div>
    </div>
  );
};

export default SideBar;