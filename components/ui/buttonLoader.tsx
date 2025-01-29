// Dependencies: pnpm install lucide-react

"use client";

import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";

interface ButtonDemoProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  children: React.ReactNode;
}

export default function ButtonDemo({ 
  isLoading, 
  children, 
  className, 
  ...props 
}: ButtonDemoProps) {
  return (
    <Button
      disabled={isLoading}
      data-loading={isLoading}
      className={`group relative disabled:opacity-100 ${className}`}
      {...props}
    >
      <span className="group-data-[loading=true]:text-transparent">{children}</span>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <LoaderCircle className="animate-spin" size={16} strokeWidth={2} aria-hidden="true" />
        </div>
      )}
    </Button>
  );
}
