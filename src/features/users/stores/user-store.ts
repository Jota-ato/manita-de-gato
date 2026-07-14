import { User } from '@/db/schema';
import { create } from 'zustand';

export interface UserStore {
    activeUser: User | null;
    setActiveUser: (id: User | null) => void;
    editDialogOpen: boolean;
    setEditDialogOpen: (open: boolean) => void;
    deleteDialogOpen: boolean;
    setDeleteDialogOpen: (open: boolean) => void;
}

export const useUserStore = create<UserStore>((set) => ({
    activeUser: null,
    setActiveUser: (id) => set({ activeUser: id }),
    editDialogOpen: false,
    setEditDialogOpen: (open) => set({ editDialogOpen: open }),
    deleteDialogOpen: false,
    setDeleteDialogOpen: (open) => set({ deleteDialogOpen: open }),
}));