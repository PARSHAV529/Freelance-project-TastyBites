import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export default function Modal({ isOpen, onClose, title, children }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription className="text-gray-500">
            {children ? "Order details" : "No orders available"}
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">{children}</div>
        
      </DialogContent>
    </Dialog>
  );
}
