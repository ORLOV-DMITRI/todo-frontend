import api from "@/lib/settings/axios";

export interface Folder {
  id: string;
  name: string;
  isSystem: boolean;
  userId: string;
  createdAt: string;
  updatedAt: string;
  _count: {
    notes: number;
  };
}

export interface CreateFolderData {
  name: string;
}

export interface UpdateFolderData {
  name: string;
}

export const foldersService = {
  async getFolders(): Promise<Folder[]> {
    const response = await api.get('/api/folders');
    return response.data.folders;
  },

  async createFolder(data: CreateFolderData): Promise<Folder> {
    const response = await api.post('/api/folders', data);
    return response.data.folder;
  },

  async updateFolder(id: string, data: UpdateFolderData): Promise<Folder> {
    const response = await api.put(`/api/folders/${id}`, data);
    return response.data.folder;
  },

  async deleteFolder(id: string): Promise<void> {
    await api.delete(`/api/folders/${id}`);
  },

  async getFolder(id: string): Promise<Folder> {
    const response = await api.get(`/api/folders/${id}`);
    return response.data.folder;
  },
};