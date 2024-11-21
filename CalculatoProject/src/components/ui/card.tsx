import React from 'react';

// Card Component
export const Card = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return <div className={`rounded-lg shadow-md bg-white p-4 ${className}`}>{children}</div>;
};

// CardHeader Component
export const CardHeader = ({ children }: { children: React.ReactNode }) => {
  return <div className="border-b pb-2 mb-4">{children}</div>;
};

// CardTitle Component
export const CardTitle = ({ children }: { children: React.ReactNode }) => {
  return <h2 className="text-xl font-semibold">{children}</h2>;
};

// CardContent Component
export const CardContent = ({ children }: { children: React.ReactNode }) => {
  return <div className="mb-4">{children}</div>;
};

// CardFooter Component
export const CardFooter = ({ children }: { children: React.ReactNode }) => {
  return <div className="border-t pt-2 mt-4">{children}</div>;
};
