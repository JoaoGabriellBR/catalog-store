import React from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

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
}) => (
  <div className="mb-5">
    <label htmlFor={id} className="block mb-2.5">
      {label} <span className="text-red">*</span>
    </label>
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      autoComplete={type === "password" ? "on" : "off"}
      className={`rounded-lg w-full py-3 px-5 outline-none duration-200 bg-gray-1 placeholder:text-dark-5 border ${
        error
          ? "border-red focus:border-red focus:ring-2 focus:ring-red/20"
          : "border-gray-3 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
      }`}
      {...registration}
    />
    {error && <p className="mt-1 text-sm text-red">{error.message}</p>}
  </div>
);

export default InputField;
