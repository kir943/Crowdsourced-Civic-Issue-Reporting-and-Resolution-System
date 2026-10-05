import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: React.ReactNode;
  rightElement?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, icon, rightElement, id, required, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full space-y-1">
        {label && (
          <label htmlFor={inputId} className="block font-label-md text-label-md text-on-surface">
            {label} {required && <span className="text-error font-bold">*</span>}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-on-surface-variant">
              {icon}
            </div>
          )}
          <input
            id={inputId}
            ref={ref}
            required={required}
            className={twMerge(
              clsx(
                'w-full h-10 bg-surface-container-lowest border text-on-surface font-body-md text-body-md rounded-lg placeholder:text-outline focus:outline-none transition-colors duration-150',
                icon ? 'pl-10' : 'pl-3',
                rightElement ? 'pr-10' : 'pr-3',
                error
                  ? 'border-2 border-error focus:ring-2 focus:ring-error/20'
                  : 'border-outline-variant focus:border-secondary focus:ring-2 focus:ring-secondary/20',
                className
              )
            )}
            {...props}
          />
          {rightElement && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              {rightElement}
            </div>
          )}
        </div>
        {error ? (
          <p className="font-body-sm text-body-sm text-error flex items-center gap-1 mt-1">
            <span>{error}</span>
          </p>
        ) : helperText ? (
          <p className="font-body-sm text-body-sm text-outline mt-1">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'Input';
