"use client";

import { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import * as web3 from "@solana/web3.js";
import { products } from "../../../lib/products";
import { PurchaseModal } from "@/components/PurchaseModal";
import { transferToken } from "@/lib/transfer-token";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import Link from "next/link";

export default function ProductPage({ params }: { params: { id: string } }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toast } = useToast();
  const { publicKey, sendTransaction } = useWallet();
  const product = products.find((p) => p.id === params.id);

  if (!product) {
    return <div>Product not found</div>;
  }

  const handlePurchase = async () => {
    if (!publicKey) {
      alert("Please connect your wallet to make a purchase.");
      return;
    }

    setIsModalOpen(true);
  };

  const handleConfirmPurchase = async () => {
    if (!publicKey) return;

    try {
      const explorerLink = await transferToken({
        publicKey,
        amount: product.price,
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
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error processing transaction:", error);
      alert(
        "There was an error processing your transaction. Please try again."
      );
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <img
        src={product.image}
        alt={product.name}
        className="w-full md:w-1/2 object-cover rounded-lg shadow-md"
      />
      <div>
        <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
        <p className="text-gray-600 mb-4">{product.description}</p>
        <p className="text-xl font-semibold mb-4">{product.price} SOL</p>
        <button
          onClick={handlePurchase}
          className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
        >
          Purchase Now
        </button>
      </div>
      {isModalOpen && (
        <PurchaseModal
          product={product}
          onConfirm={handleConfirmPurchase}
          onCancel={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}
