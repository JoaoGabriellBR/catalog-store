import React, { useState } from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";

interface InputFieldProps {
  label: string;
  id: string;
  type: string;
  placeholder: string;
  registration: UseFormRegisterReturn;
  error?: FieldError;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  id,
  type,
  placeholder,
  registration,
  error,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  return (
    <div className="mb-5">
      <label htmlFor={id} className="block mb-2.5">
        {label} <span className="text-red">*</span>
      </label>
      <div className="relative">
        <input
          id={id}
          type={isPassword && showPassword ? "text" : type}
          placeholder={placeholder}
          autoComplete={isPassword ? "on" : "off"}
          className={`rounded-lg w-full py-3 px-5 outline-none duration-200 bg-gray-1 placeholder:text-dark-5 border ${
            error
              ? "border-red focus:border-red focus:ring-2 focus:ring-red/20"
              : "border-gray-3 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
          } ${isPassword ? "pr-12" : ""}`}
          {...registration}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute inset-y-0 right-0 flex items-center pr-4 text-dark-5"
            aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        )}
      </div>
      {error && <p className="mt-1 text-sm text-red">{error.message}</p>}
    </div>
  );
};

export default InputField;
