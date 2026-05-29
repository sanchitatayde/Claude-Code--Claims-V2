"use client";

import { create } from "zustand";
import type { Notification } from "./types";
import { INITIAL_NOTIFICATIONS } from "./mock-data";

interface UIState {
  menuOpen: boolean;
  notificationsOpen: boolean;
  openMenu: () => void;
  closeMenu: () => void;
  openNotifications: () => void;
  closeNotifications: () => void;
  closeAll: () => void;
}

export const useUI = create<UIState>((set) => ({
  menuOpen: false,
  notificationsOpen: false,
  openMenu: () => set({ menuOpen: true, notificationsOpen: false }),
  closeMenu: () => set({ menuOpen: false }),
  openNotifications: () => set({ notificationsOpen: true, menuOpen: false }),
  closeNotifications: () => set({ notificationsOpen: false }),
  closeAll: () => set({ menuOpen: false, notificationsOpen: false }),
}));

interface NotificationsState {
  items: Notification[];
  markRead: (id: string) => void;
  unreadCount: () => number;
}

export const useNotifications = create<NotificationsState>((set, get) => ({
  items: INITIAL_NOTIFICATIONS,
  markRead: (id) =>
    set((state) => ({
      items: state.items.map((n) => (n.id === id ? { ...n, read: true } : n)),
    })),
  unreadCount: () => get().items.filter((n) => !n.read).length,
}));
