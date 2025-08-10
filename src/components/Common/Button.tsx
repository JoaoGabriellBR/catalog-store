"use client";

import React from "react";
import Loader from "./Loader";

type ButtonVariant =
  | "primary"
  | "dark"
  | "secondary"
  | "success"
  | "outline"
  | "gray"
  | "ghost";

type ButtonSize = "sm" | "md" | "lg" | "icon";

export interface ButtonProps {
  id?: string;
  type?: "button" | "submit" | "reset";
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  isLoading?: boolean;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string | undefined;
  ariaLabel?: string;
}

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const baseClasses =
  "inline-flex items-center justify-center rounded-md font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue/40 disabled:opacity-50 disabled:cursor-not-allowed";

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-3 py-2 text-sm",
  md: "px-6 py-3",
  lg: "px-7 py-3 text-base",
  icon: "p-0 w-10 h-10",
};

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-blue text-white hover:bg-blue-dark",
  dark: "bg-dark text-white hover:bg-blue",
  secondary: "bg-blue-light text-dark",
  success: "bg-green-light text-white hover:bg-opacity-95",
  outline: "border border-gray-3 text-dark hover:bg-gray-1 hover:border-gray-3",
  gray: "bg-gray-1 text-dark border border-gray-3 hover:bg-gray-2",
  ghost: "bg-transparent text-dark hover:bg-gray-1",
};

const Button: React.FC<ButtonProps> = ({
  type = "button",
  children,
  onClick,
  disabled,
  isLoading,
  variant = "primary",
  size = "md",
  className,
  ariaLabel,
}) => {
  const content = isLoading ? <Loader className="h-4 w-4" /> : children;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      aria-busy={isLoading || undefined}
      aria-label={ariaLabel}
      className={cn(
        baseClasses,
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
    >
      {content}
    </button>
  );
};

export default Button;
