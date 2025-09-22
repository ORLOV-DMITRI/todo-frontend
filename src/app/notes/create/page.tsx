"use client";

import { ProtectedRoute } from '@/components/auth';
import CreateNotePage from '@/pageComponents/CreateNote/CreateNote';

export default function CreateNotePageRoute() {
  return (
    <ProtectedRoute>
      <CreateNotePage />
    </ProtectedRoute>
  );
}