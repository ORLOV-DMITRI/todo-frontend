"use client";

import ProtectedRoute from "@/components/auth/ProtectedRoute/ProtectedRoute";
import EditTask from "@/pageComponents/EditTask/EditTask";
import { use } from "react";

type Props = {
  params: Promise<{ id: string }>;
};

export default function EditTaskPage({ params }: Props) {
  const { id } = use(params);

  return (
    <ProtectedRoute>
      <EditTask taskId={id} />
    </ProtectedRoute>
  );
}