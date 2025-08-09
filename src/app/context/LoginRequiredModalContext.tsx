"use client";
import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

type LoginRequiredReason = "cart" | "favorite" | undefined;

interface LoginRequiredModalContextType {
  isOpen: boolean;
  reason: LoginRequiredReason;
  open: (reason?: LoginRequiredReason) => void;
  close: () => void;
}

const LoginRequiredModalContext = createContext<
  LoginRequiredModalContextType | undefined
>(undefined);

export function LoginRequiredModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [reason, setReason] = useState<LoginRequiredReason>(undefined);

  const open = useCallback((r?: LoginRequiredReason) => {
    setReason(r);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setReason(undefined);
  }, []);

  const value = useMemo(
    () => ({ isOpen, reason, open, close }),
    [isOpen, reason, open, close]
  );

  return (
    <LoginRequiredModalContext.Provider value={value}>
      {children}
    </LoginRequiredModalContext.Provider>
  );
}

export function useLoginRequiredModal() {
  const ctx = useContext(LoginRequiredModalContext);
  if (!ctx)
    throw new Error(
      "useLoginRequiredModal must be used within LoginRequiredModalProvider"
    );
  return ctx;
}
