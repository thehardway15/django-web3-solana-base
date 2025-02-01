import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@solana/wallet-adapter-react';
import WalletAuth from './WalletAuth';

function App() {
  const { publicKey } = useWallet();

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-lg p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Solana Wallet Auth Demo</h1>
          <WalletMultiButton />
        </div>
      </nav>
      
      <main className="container mx-auto mt-8">
        <WalletAuth />
      </main>
    </div>
  );
}

export default App;
