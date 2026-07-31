import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

type State = {
  liked: string[];
  saved: string[];
  connected: string[];
  readNotifications: string[];
  roles: string[];
  interests: string[];
};

type Ctx = State & {
  toggleLike: (id: string) => void;
  toggleSave: (id: string) => void;
  connect: (id: string) => void;
  markRead: (id: string) => void;
  markAllRead: (ids: string[]) => void;
  setRoles: (roles: string[]) => void;
  setInterests: (interests: string[]) => void;
};

const AppStateContext = createContext<Ctx | null>(null);

const toggle = (list: string[], id: string) =>
  list.includes(id) ? list.filter((x) => x !== id) : [...list, id];

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<State>({
    liked: ["post-1"],
    saved: [],
    connected: [],
    readNotifications: [],
    roles: ["Property Owner"],
    interests: ["Renovations", "Sustainable design"],
  });

  const toggleLike = useCallback(
    (id: string) => setState((s) => ({ ...s, liked: toggle(s.liked, id) })),
    [],
  );
  const toggleSave = useCallback(
    (id: string) => setState((s) => ({ ...s, saved: toggle(s.saved, id) })),
    [],
  );
  const connect = useCallback(
    (id: string) =>
      setState((s) => (s.connected.includes(id) ? s : { ...s, connected: [...s.connected, id] })),
    [],
  );
  const markRead = useCallback(
    (id: string) =>
      setState((s) =>
        s.readNotifications.includes(id)
          ? s
          : { ...s, readNotifications: [...s.readNotifications, id] },
      ),
    [],
  );
  const markAllRead = useCallback(
    (ids: string[]) =>
      setState((s) => ({
        ...s,
        readNotifications: Array.from(new Set([...s.readNotifications, ...ids])),
      })),
    [],
  );
  const setRoles = useCallback((roles: string[]) => setState((s) => ({ ...s, roles })), []);
  const setInterests = useCallback(
    (interests: string[]) => setState((s) => ({ ...s, interests })),
    [],
  );

  const value = useMemo(
    () => ({
      ...state,
      toggleLike,
      toggleSave,
      connect,
      markRead,
      markAllRead,
      setRoles,
      setInterests,
    }),
    [state, toggleLike, toggleSave, connect, markRead, markAllRead, setRoles, setInterests],
  );

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState() {
  const ctx = useContext(AppStateContext);
  if (!ctx) throw new Error("useAppState must be used inside AppStateProvider");
  return ctx;
}