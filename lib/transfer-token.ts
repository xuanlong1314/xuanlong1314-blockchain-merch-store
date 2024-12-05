import { getExplorerLink } from "@solana-developers/helpers";
import { SendTransactionOptions } from "@solana/wallet-adapter-base";
import * as web3 from "@solana/web3.js";

const ownerPublicKey = "GrhBPNvgcGHeto1qfdqzQNARoYX89uvbN4w3JhPqU3qT";

export async function transferToken({
  publicKey,
  amount,
  sendTransaction,
}: {
  publicKey: web3.PublicKey;
  amount: number;
  sendTransaction: (
    transaction: web3.Transaction | web3.VersionedTransaction,
    connection: web3.Connection,
    options?: SendTransactionOptions
  ) => Promise<web3.TransactionSignature>;
}) {
  const connection = new web3.Connection(
    web3.clusterApiUrl("devnet"),
    "confirmed"
  );
  const transaction = new web3.Transaction();

  // Add transaction instruction here (e.g., token transfer)
  // This is a placeholder and should be replaced with actual token transfer logic
  transaction.add(
    web3.SystemProgram.transfer({
      fromPubkey: publicKey,
      toPubkey: new web3.PublicKey(ownerPublicKey), // Replace with actual recipient
      lamports: web3.LAMPORTS_PER_SOL * amount,
    })
  );

  const signature = await sendTransaction(transaction, connection);
  await connection.confirmTransaction(signature, "confirmed");

  const explorerLink = getExplorerLink("transaction", signature, "devnet");

  return explorerLink;
}
