import { Product } from "@/lib/products";
import Link from "next/link";

interface ProductCardProps {
  product: Product;
  onPurchase: (product: Product) => void;
}

export function ProductCard({ product, onPurchase }: ProductCardProps) {
  return (
    <div className="border p-4 rounded-lg shadow-md transition-transform hover:scale-105">
      <img
        src={product.image}
        alt={product.name}
        className="w-full object-cover mb-2 rounded"
      />
      <h3 className="text-lg font-semibold">{product.name}</h3>
      <p className="text-gray-600 mb-2">{product.description}</p>
      <p className="text-xl font-semibold mb-4">{product.price} SOL</p>
      <div className="flex gap-4 items-center">
        <Link
          href={`/product/${product.id}`}
          className="text-center w-full bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors"
        >
          View Detail
        </Link>
        <button
          onClick={() => onPurchase(product)}
          className="w-full bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors"
        >
          Purchase
        </button>
      </div>
    </div>
  );
}
