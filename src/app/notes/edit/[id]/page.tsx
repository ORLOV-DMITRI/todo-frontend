"use client";

import ProtectedRoute from "@/components/auth/ProtectedRoute/ProtectedRoute";
import EditNote from "@/pageComponents/EditNote/EditNote";
import { use } from "react";

type Props = {
  params: Promise<{ id: string }>;
};

export default function EditNotePage({ params }: Props) {
  const { id } = use(params);

  return (
    <ProtectedRoute>
      <EditNote noteId={id} />
    </ProtectedRoute>
  );
}