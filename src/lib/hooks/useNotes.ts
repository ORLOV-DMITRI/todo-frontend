import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { notesService, CreateNoteData, UpdateNoteData } from '@/lib/api/notesService';

export const noteKeys = {
  all: ['notes'] as const,
  lists: () => [...noteKeys.all, 'list'] as const,
  list: (folderId?: string | null) => [...noteKeys.lists(), { folderId }] as const,
  details: () => [...noteKeys.all, 'detail'] as const,
  detail: (id: string) => [...noteKeys.details(), id] as const,
};

export const useNotes = (folderId?: string | null) => {
  return useQuery({
    queryKey: noteKeys.list(folderId),
    queryFn: () => notesService.getNotes(folderId),
  });
};

export const useNote = (id: string) => {
  return useQuery({
    queryKey: noteKeys.detail(id),
    queryFn: () => notesService.getNote(id),
    enabled: !!id,
  });
};

export const useCreateNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateNoteData) => {
      return notesService.createNote(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: noteKeys.lists() });
    },
  });
};

export const useUpdateNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateNoteData }) => {
      return notesService.updateNote(id, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: noteKeys.lists() });
    },
  });
};

export const useDeleteNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      return notesService.deleteNote(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: noteKeys.lists() });
    },
  });
};