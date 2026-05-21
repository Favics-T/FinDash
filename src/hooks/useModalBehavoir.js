import { useEffect } from 'react';

/**
 * Handles standard modal side-effects:
 * - Closes on Escape key
 * - Locks body scroll while open
 */
export const useModalBehavior = (isOpen, onClose) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);
};