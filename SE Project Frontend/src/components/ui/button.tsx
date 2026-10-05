import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'subtle';
  size?: 'sm' | 'md' | 'lg' | 'icon';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    const baseStyles =
      'inline-flex items-center justify-center font-label-md rounded-lg font-medium transition-colors duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-1 disabled:opacity-50 disabled:pointer-events-none select-none';

    const variants = {
      primary: 'bg-primary text-on-primary hover:bg-secondary active:bg-primary-container shadow-sm',
      secondary: 'bg-surface-container-low text-on-surface hover:bg-surface-container-high border border-outline-variant/60',
      outline: 'border border-outline-variant bg-surface-container-lowest text-on-surface hover:bg-surface-container-low',
      ghost: 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high',
      destructive: 'bg-error text-on-error hover:bg-red-700 active:bg-red-800 shadow-sm',
      subtle: 'bg-primary-container text-on-primary hover:bg-secondary active:bg-primary shadow-sm',
    };

    const sizes = {
      sm: 'h-8 px-3 text-xs gap-1.5',
      md: 'h-10 px-4 text-sm gap-2',
      lg: 'h-11 px-6 text-base gap-2.5',
      icon: 'h-9 w-9 p-0 text-sm justify-center',
    };

    return (
      <button
        ref={ref}
        className={twMerge(clsx(baseStyles, variants[variant], sizes[size], className))}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
