// Dependencies: pnpm install lucide-react

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { ButtonHTMLAttributes } from "react";

interface ButtonArrowProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  children: React.ReactNode;
  className?: string;
}

export default function ButtonArrow({ isLoading, children, className, ...props }: ButtonArrowProps) {
  return (
    <Button className={`group ${className}`} disabled={isLoading} {...props}>
      {isLoading ? "Loading..." : children}
      <ArrowRight
        className="-me-1 ms-2 opacity-60 transition-transform group-hover:translate-x-0.5"
        size={16}
        strokeWidth={2}
        aria-hidden="true"
      />
    </Button>
  );
}
