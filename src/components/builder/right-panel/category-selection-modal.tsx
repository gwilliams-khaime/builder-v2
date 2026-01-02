'use client';

// UI-only Category Selection Modal - removed all editor integrations
export function CategorySelectionModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h2 className="text-lg font-semibold mb-4">Select Category</h2>
        <div className="space-y-2">
          <div className="text-sm text-gray-500">Category selection UI placeholder</div>
        </div>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-gray-100 rounded text-sm"
        >
          Close
        </button>
      </div>
    </div>
  );
}
