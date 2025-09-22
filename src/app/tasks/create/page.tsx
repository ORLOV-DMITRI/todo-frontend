"use client";

import ProtectedRoute from "@/components/auth/ProtectedRoute/ProtectedRoute";
import CreateTask from "@/pageComponents/CreateTask/CreateTask";

export default function CreateTaskPage() {
  return (
    <ProtectedRoute>
      <CreateTask />
    </ProtectedRoute>
  );
}