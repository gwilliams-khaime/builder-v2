"use client";

import React from "react";
import { createPortal } from "react-dom";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  componentType: string;
}

/**
 * Confirmation modal for deleting sections
 * Shows a simple modal asking the user to confirm deletion
 */
export const DeleteConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  componentType,
}: DeleteConfirmationModalProps) => {
  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[100000] flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div className="bg-popover text-popover-foreground rounded-2xl shadow-xl p-6 max-w-md w-full mx-4 animate-in fade-in zoom-in duration-200">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-destructive"
            >
              <path
                d="M12 9V13M12 17H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-foreground text-center mb-2">
          Delete {componentType}?
        </h3>

        {/* Message */}
        <p className="text-muted-foreground text-center mb-6">
          Are you sure you want to delete this {componentType.toLowerCase()}? This action cannot be
          undone.
        </p>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 border border-border rounded-lg text-foreground font-medium hover:bg-secondary transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="flex-1 px-4 py-2.5 bg-destructive rounded-lg text-white font-medium hover:opacity-90 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};
