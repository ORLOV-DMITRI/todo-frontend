import api from "@/lib/settings/axios";

export interface Note {
  id: string;
  title: string;
  content: string;
  folderId: string | null;
  userId: string;
  createdAt: string;
  updatedAt: string;
  folder?: {
    id: string;
    name: string;
  };
}

export interface CreateNoteData {
  title?: string;
  content: string;
  folderId?: string | null;
}

export interface UpdateNoteData {
  title?: string;
  content?: string;
  folderId?: string | null;
}

export const notesService = {
  async getNotes(folderId?: string | null): Promise<Note[]> {
    const params = folderId ? { folderId } : {};
    const response = await api.get('/api/notes', { params });
    return response.data.notes;
  },

  async createNote(data: CreateNoteData): Promise<Note> {
    const response = await api.post('/api/notes', data);
    return response.data;
  },

  async updateNote(id: string, data: UpdateNoteData): Promise<Note> {
    const response = await api.put(`/api/notes/${id}`, data);
    return response.data;
  },

  async deleteNote(id: string): Promise<void> {
    await api.delete(`/api/notes/${id}`);
  },

  async getNote(id: string): Promise<Note> {
    const response = await api.get(`/api/notes/${id}`);
    return response.data.note;
  },
};