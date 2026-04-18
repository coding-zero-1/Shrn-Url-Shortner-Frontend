"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import Button from "./Button";

interface ConfirmationModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  isLoading = false,
}) => {
  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm"
        >
          <motion.div
            initial={{ y: 16, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 10, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="section-shell w-full max-w-md p-6"
          >
            <h3 className="font-display mb-2 text-lg font-semibold text-slate-50">
              {title}
            </h3>
            <p className="mb-6 text-sm text-slate-300">{message}</p>
            <div className="flex justify-end gap-3">
              <Button variant="secondary" onClick={onCancel} disabled={isLoading}>
                Cancel
              </Button>
              <Button variant="danger" onClick={onConfirm} isLoading={isLoading}>
                Delete
              </Button>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default ConfirmationModal;
