import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { foldersService, CreateFolderData, UpdateFolderData } from '@/lib/api/foldersService';

export const folderKeys = {
  all: ['folders'] as const,
  lists: () => [...folderKeys.all, 'list'] as const,
  list: (filters: string) => [...folderKeys.lists(), { filters }] as const,
  details: () => [...folderKeys.all, 'detail'] as const,
  detail: (id: string) => [...folderKeys.details(), id] as const,
};

export const useFolders = () => {
  return useQuery({
    queryKey: folderKeys.lists(),
    queryFn: foldersService.getFolders,
  });
};

export const useFolder = (id: string) => {
  return useQuery({
    queryKey: folderKeys.detail(id),
    queryFn: () => foldersService.getFolder(id),
    enabled: !!id,
  });
};

export const useCreateFolder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateFolderData) => {
      return foldersService.createFolder(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: folderKeys.lists() });
    },
  });
};

export const useUpdateFolder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateFolderData }) => {
      return foldersService.updateFolder(id, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: folderKeys.lists() });
    },
  });
};

export const useDeleteFolder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      return foldersService.deleteFolder(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: folderKeys.lists() });
    },
  });
};