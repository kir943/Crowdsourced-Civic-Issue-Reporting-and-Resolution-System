import React, { useState, useRef, useEffect } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface DropdownProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  align?: 'left' | 'right';
  className?: string;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const Dropdown: React.FC<DropdownProps> = ({
  trigger,
  children,
  align = 'right',
  className,
  isOpen: externalIsOpen,
  onOpenChange,
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;

  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggle = () => {
    const next = !isOpen;
    if (onOpenChange) {
      onOpenChange(next);
    } else {
      setInternalIsOpen(next);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        if (onOpenChange) {
          onOpenChange(false);
        } else {
          setInternalIsOpen(false);
        }
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onOpenChange]);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div onClick={toggle} className="cursor-pointer">
        {trigger}
      </div>

      {isOpen && (
        <div
          className={twMerge(
            clsx(
              'absolute z-50 mt-2 w-72 rounded-xl bg-surface-container-lowest border border-outline-variant shadow-xl ring-1 ring-black/5 focus:outline-none overflow-hidden animate-in fade-in-50 zoom-in-95 duration-100',
              align === 'right' ? 'right-0 origin-top-right' : 'left-0 origin-top-left',
              className
            )
          )}
        >
          {children}
        </div>
      )}
    </div>
  );
};
