"use client";

import { createContext, useContext } from "react";
import { useActiveNav } from "@/hooks/useActiveNav";

type ActiveNavContextValue = ReturnType<typeof useActiveNav>;

const ActiveNavContext = createContext<ActiveNavContextValue | null>(null);

export function ActiveNavProvider({ children }: { children: React.ReactNode }) {
  const value = useActiveNav();
  return (
    <ActiveNavContext.Provider value={value}>{children}</ActiveNavContext.Provider>
  );
}

export function useActiveNavContext(): ActiveNavContextValue {
  const context = useContext(ActiveNavContext);
  if (!context) {
    throw new Error("useActiveNavContext must be used within ActiveNavProvider");
  }
  return context;
}
