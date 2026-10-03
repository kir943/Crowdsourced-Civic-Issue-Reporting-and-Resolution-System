import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  side?: 'left' | 'right';
  className?: string;
}

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  title,
  children,
  side = 'left',
  className,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop scrim */}
      <div
        className="fixed inset-0 bg-primary/40 backdrop-blur-[2px] transition-opacity duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <div
        className={twMerge(
          clsx(
            'fixed inset-y-0 max-w-xs w-full bg-surface-container-lowest shadow-2xl border-outline-variant flex flex-col transition-transform duration-300 ease-in-out z-50',
            side === 'left' ? 'left-0 border-r animate-in slide-in-from-left' : 'right-0 border-l animate-in slide-in-from-right',
            className
          )
        )}
      >
        <div className="flex items-center justify-between px-4 h-16 border-b border-outline-variant bg-surface-container-lowest">
          {title ? (
            <h2 className="font-headline-sm text-headline-sm text-primary tracking-tight font-bold">{title}</h2>
          ) : (
            <div />
          )}
          <button
            onClick={onClose}
            aria-label="Close navigation"
            className="p-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4">{children}</div>
      </div>
    </div>
  );
};
