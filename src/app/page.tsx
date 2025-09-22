"use client";

import { ProtectedRoute } from '@/components/auth';
import Home from '@/pageComponents/Home/Home';

export default function HomePage() {
  return (
    <ProtectedRoute>
      <Home />
    </ProtectedRoute>
  );
}
