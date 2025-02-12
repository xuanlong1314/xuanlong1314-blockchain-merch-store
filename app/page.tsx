"use client";

import { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import * as web3 from "@solana/web3.js";
import { products } from "../lib/products";
import { ProductCard } from "@/components/ProductCard";
import { PurchaseModal } from "@/components/PurchaseModal";
import { transferToken } from "@/lib/transfer-token";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import Link from "next/link";

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState<
    (typeof products)[0] | null
  >(null);
  const { toast } = useToast();
  const { publicKey, sendTransaction } = useWallet();

  const handlePurchase = async (product: (typeof products)[0]) => {
    if (!publicKey) {
      alert("Please connect your wallet to make a purchase.");
      return;
    }

    setSelectedProduct(product);
  };

  const handleConfirmPurchase = async () => {
    if (!publicKey || !selectedProduct) return;

    try {
      const explorerLink = await transferToken({
        publicKey,
        amount: selectedProduct.price,
        sendTransaction,
      });

      toast({
        title: "Purchase successful!",
        action: (
          <ToastAction asChild altText="link">
            <Link href={explorerLink} target="_blank">
              View transaction
            </Link>
          </ToastAction>
        ),
      });
      setSelectedProduct(null);
    } catch (error) {
      console.error("Error processing transaction:", error);
      alert(
        "There was an error processing your transaction. Please try again."
      );
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Featured Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onPurchase={handlePurchase}
          />
        ))}
      </div>
      {selectedProduct && (
        <PurchaseModal
          product={selectedProduct}
          onConfirm={handleConfirmPurchase}
          onCancel={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}
