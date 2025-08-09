"use client";
import { useCallback } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import type { User } from "@supabase/supabase-js";
import { useLoginRequiredModal } from "@/app/context/LoginRequiredModalContext";

export function useAuthGuard() {
  const { user } = useAuth();
  const pathname = usePathname();
  const { open } = useLoginRequiredModal();

  const ensureAuthenticated = useCallback(
    (message?: string, reason?: "cart" | "favorite"): boolean => {
      if (!user) {
        // Exibe modal amigável em vez de redirecionar automaticamente
        open(reason);
        return false;
      }
      return true;
    },
    [user, open, pathname]
  );

  const getAuthenticatedUserOrRedirect = useCallback(
    (message?: string, reason?: "cart" | "favorite"): User | null => {
      if (!ensureAuthenticated(message, reason)) return null;
      return user as User;
    },
    [ensureAuthenticated, user]
  );

  return { ensureAuthenticated, getAuthenticatedUserOrRedirect };
}
