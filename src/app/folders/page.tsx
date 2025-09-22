"use client";

import Folders from "@/pageComponents/Folders/Folders";
import ProtectedRoute from "@/components/auth/ProtectedRoute/ProtectedRoute";

export default function FoldersPageRoute() {
  return (
    <ProtectedRoute>
      <Folders />
    </ProtectedRoute>
  );
}