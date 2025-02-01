import { useWallet } from "@solana/wallet-adapter-react";
import {
  WalletDisconnectButton,
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import "@solana/wallet-adapter-react-ui/styles.css";

export const SolanaConnect = () => {
  return (
    <WalletModalProvider>
      <WalletMultiButton />
      <WalletDisconnectButton />
    </WalletModalProvider>
  );
}