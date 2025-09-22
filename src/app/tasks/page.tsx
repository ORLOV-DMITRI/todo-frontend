"use client";

import ProtectedRoute from "@/components/auth/ProtectedRoute/ProtectedRoute";
import Tasks from "@/pageComponents/Tasks/Tasks";

export default function TasksPage() {
  return (
    <ProtectedRoute>
      <Tasks />
    </ProtectedRoute>
  );
}