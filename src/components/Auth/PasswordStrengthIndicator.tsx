"use client";

import { useMemo } from "react";

interface PasswordStrengthIndicatorProps {
  password: string;
  hasError?: boolean;
}

export function PasswordStrengthIndicator({
  password,
  hasError = false,
}: PasswordStrengthIndicatorProps) {
  const strength = useMemo(() => {
    if (!password)
      return { score: 0, label: "", color: "", bgColor: "", progress: 0 };

    let score = 0;
    const checks = {
      length: password.length >= 8,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      number: /\d/.test(password),
      special: /[^a-zA-Z0-9]/.test(password),
    };

    score = Object.values(checks).filter(Boolean).length;

    const strengthLevels = {
      0: { label: "", color: "", bgColor: "", progress: 0 },
      1: {
        label: "Muito fraca",
        color: "text-red",
        bgColor: "bg-red",
        progress: 20,
      },
      2: {
        label: "Fraca",
        color: "text-orange",
        bgColor: "bg-orange",
        progress: 40,
      },
      3: {
        label: "Regular",
        color: "text-yellow",
        bgColor: "bg-yellow",
        progress: 60,
      },
      4: {
        label: "Forte",
        color: "text-blue",
        bgColor: "bg-blue",
        progress: 80,
      },
      5: {
        label: "Muito forte",
        color: "text-green",
        bgColor: "bg-green",
        progress: 100,
      },
    } as const;

    return strengthLevels[score as keyof typeof strengthLevels];
  }, [password]);

  if (!password) return null;

  const color = hasError ? "text-red-600" : strength.color;
  const barColor = hasError ? "bg-red" : strength.bgColor;

  return (
    <div className="space-y-2 mb-2">
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">Força da senha:</span>
        <span className={`text-xs font-medium ${color}`}>{strength.label}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
        <div
          className={`h-full transition-all duration-300 ease-out ${barColor}`}
          style={{ width: `${strength.progress}%` }}
          role="progressbar"
          aria-valuenow={strength.progress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Força da senha: ${strength.label}`}
        />
      </div>
    </div>
  );
}
