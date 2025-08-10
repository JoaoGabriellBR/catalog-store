"use client";

import React, { useState } from "react";
import type { ChangeEventHandler, FocusEventHandler } from "react";
import type { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import Button from "@/components/Common/Button";

export interface InputFieldProps {
  type?: string;
  name?: string;
  id?: string;
  label?: string;
  value?: string | number;
  defaultValue?: string | number;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  placeholder?: string;
  autoComplete?: string;
  disabled?: boolean;
  required?: boolean;
  error?: string | FieldError | undefined;
  className?: string; // extra classes for the input element
  registration?: UseFormRegisterReturn;
  // Optional: customize the outer container (useful to remove default margin)
  containerClassName?: string;
  // Visual variant: default applies base styles; unstyled leaves appearance to className
  variant?: "default" | "unstyled";
}

const InputField: React.FC<InputFieldProps> = ({
  type = "text",
  name,
  id,
  label,
  value,
  defaultValue,
  onChange,
  onBlur,
  placeholder,
  autoComplete,
  disabled,
  required,
  error,
  className,
  registration,
  containerClassName,
  variant = "default",
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const hasError = Boolean(
    typeof error === "string"
      ? error
      : (error as FieldError | undefined)?.message
  );
  const errorMessage =
    typeof error === "string"
      ? error
      : (error as FieldError | undefined)?.message;

  const inputId = id || name || undefined;
  const describedById = hasError && inputId ? `${inputId}-error` : undefined;

  // Build value/defaultValue only when explicitly provided to avoid switching controlled/uncontrolled
  const valueProps: Partial<React.InputHTMLAttributes<HTMLInputElement>> = {};
  if (value !== undefined) {
    valueProps.value = value;
  } else if (defaultValue !== undefined) {
    valueProps.defaultValue = defaultValue;
  }

  const baseInputClasses =
    variant === "unstyled"
      ? ""
      : `rounded-lg w-full py-3 px-5 outline-none duration-200 bg-gray-1 placeholder:text-dark-5 border ${
          hasError
            ? "border-red focus:border-red focus:ring-2 focus:ring-red/20"
            : "border-gray-3 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
        } ${isPassword ? "pr-12" : ""}`;

  return (
    <div className={containerClassName ?? "mb-5"}>
      {label && (
        <label htmlFor={inputId} className="block mb-2.5">
          {label} {required && <span className="text-red">*</span>}
        </label>
      )}
      <div className="relative">
        <input
          id={inputId}
          name={name}
          type={isPassword && showPassword ? "text" : type}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          onChange={onChange}
          onBlur={onBlur}
          autoComplete={autoComplete ?? (isPassword ? "on" : "off")}
          aria-invalid={hasError}
          aria-describedby={describedById}
          className={`${baseInputClasses} ${className ?? ""}`}
          {...valueProps}
          {...registration}
        />
        {isPassword && (
          <Button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            ariaLabel={showPassword ? "Ocultar senha" : "Mostrar senha"}
            variant="ghost"
            size="icon"
            className="absolute inset-y-0 right-0 my-auto mr-1 text-dark-5"
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </Button>
        )}
      </div>
      {hasError && (
        <p id={describedById} className="mt-1 text-sm text-red">
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default InputField;
