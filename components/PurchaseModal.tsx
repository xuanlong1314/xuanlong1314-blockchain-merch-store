import { Product } from "@/lib/products";

interface PurchaseModalProps {
  product: Product;
  onConfirm: () => void;
  onCancel: () => void;
}

export function PurchaseModal({
  product,
  onConfirm,
  onCancel,
}: PurchaseModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Confirm Purchase</h2>
        <p className="mb-4">
          Are you sure you want to purchase {product.name} for {product.price}{" "}
          SOL?
        </p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex items-center px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
          >
            Confirm Purchase
          </button>
        </div>
      </div>
    </div>
  );
}
