import React from "react";
import { Loader2 } from "lucide-react";

interface LoaderProps {
  className?: string;
}

const Loader: React.FC<LoaderProps> = ({ className }) => {
  return <Loader2 className={`animate-spin ${className ?? ""}`} />;
};

export default Loader;
