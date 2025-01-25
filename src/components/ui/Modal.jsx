import React from "react";

const Modal = ({
  isOpen,
  title,
  content,
  onClose,
  onSubmit,
  submitButtonText = "Submit",
  cancelButtonText = "Cancel",
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-60 z-50">
      <div className="bg-gray-50 p-6 rounded-lg shadow-lg w-1/2">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">{title}</h2>
        {/* Content */}
        <div className="space-y-4">
          {content}
        </div>
        {/* Modal Buttons */}
        
      </div>
    </div>
  );
};

export default Modal;
