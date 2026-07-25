"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type ShelfState = {
  shelfIds: string[];
  bookmarkIds: string[];
};

type ShelfContextValue = ShelfState & {
  isOnShelf: (id: string) => boolean;
  isBookmarked: (id: string) => boolean;
  toggleShelf: (id: string) => void;
  toggleBookmark: (id: string) => void;
};

const ShelfContext = createContext<ShelfContextValue | null>(null);

const STORAGE_KEY = "shelf:library-state";

export function ShelfProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<ShelfState>({ shelfIds: [], bookmarkIds: [] });
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time hydration-safe restore from localStorage
      if (raw) setState(JSON.parse(raw));
    } catch {
      // ignore malformed storage
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // storage unavailable — fail silently
    }
  }, [state, hydrated]);

  const toggleShelf = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      shelfIds: prev.shelfIds.includes(id)
        ? prev.shelfIds.filter((x) => x !== id)
        : [...prev.shelfIds, id],
    }));
  }, []);

  const toggleBookmark = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      bookmarkIds: prev.bookmarkIds.includes(id)
        ? prev.bookmarkIds.filter((x) => x !== id)
        : [...prev.bookmarkIds, id],
    }));
  }, []);

  const value = useMemo<ShelfContextValue>(
    () => ({
      ...state,
      isOnShelf: (id: string) => state.shelfIds.includes(id),
      isBookmarked: (id: string) => state.bookmarkIds.includes(id),
      toggleShelf,
      toggleBookmark,
    }),
    [state, toggleShelf, toggleBookmark]
  );

  return <ShelfContext.Provider value={value}>{children}</ShelfContext.Provider>;
}

export function useShelf() {
  const ctx = useContext(ShelfContext);
  if (!ctx) throw new Error("useShelf must be used within a ShelfProvider");
  return ctx;
}
