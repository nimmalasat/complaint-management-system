import { create } from 'zustand';
import { useAuthStore } from './authStore';
import { apiUrl } from '../lib/api';

export interface Complaint {
  id: number;
  category: string;
  description: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'RESOLVED' | 'REJECTED';
  createdAt: string;
  submittedBy: string;
}

export interface ComplaintState {
  complaints: Complaint[];
  loading: boolean;
  error: string | null;
  fetchComplaints: () => Promise<void>;
  submitComplaint: (category: string, description: string) => Promise<void>;
  updateStatus: (id: number, status: Complaint['status']) => Promise<void>;
  deleteComplaint: (id: number) => Promise<void>;
}

export const useComplaintStore = create<ComplaintState>((set) => ({
  complaints: [],
  loading: false,
  error: null,

  fetchComplaints: async () => {
    set({ loading: true, error: null });
    try {
      const token = useAuthStore.getState().token;
      const user = useAuthStore.getState().user;

      const endpoint = user?.role === 'ADMIN'
        ? apiUrl('/admin/complaints')
        : apiUrl('/complaints/my');

      const response = await fetch(endpoint, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error('Failed to fetch complaints');

      const data = await response.json();
      set({ complaints: data, loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  submitComplaint: async (category: string, description: string) => {
    set({ loading: true, error: null });
    try {
      const token = useAuthStore.getState().token;

      const response = await fetch(apiUrl('/complaints'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ category, description }),
      });

      if (!response.ok) throw new Error('Failed to submit complaint');

      await useComplaintStore.getState().fetchComplaints();
      set({ loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  updateStatus: async (id: number, status: Complaint['status']) => {
    set({ loading: true, error: null });
    try {
      const token = useAuthStore.getState().token;

      const response = await fetch(apiUrl(`/admin/complaints/${id}/status`), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) throw new Error('Failed to update complaint');

      await useComplaintStore.getState().fetchComplaints();
      set({ loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  deleteComplaint: async (id: number) => {
    set({ loading: true, error: null });
    try {
      const token = useAuthStore.getState().token;

      const response = await fetch(apiUrl(`/admin/complaints/${id}`), {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error('Failed to delete complaint');

      await useComplaintStore.getState().fetchComplaints();
      set({ loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },
}));
