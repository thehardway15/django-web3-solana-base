import { useWallet } from '@solana/wallet-adapter-react';
import { useState, useCallback } from 'react';
import bs58 from 'bs58';

const WalletAuth = () => {
  const { publicKey, signMessage } = useWallet();
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));
  const [walletInfo, setWalletInfo] = useState(null);
  const [error, setError] = useState(null);

  const handleAuth = useCallback(async () => {
    if (!publicKey || !signMessage) {
      setError('Please connect your wallet first');
      return;
    }

    try {
      const message = 'Login to the application';
      const encodedMessage = new TextEncoder().encode(message);
      const signedMessage = await signMessage(encodedMessage);
      const signature = bs58.encode(signedMessage);

      const response = await fetch('http://localhost:8000/api/auth/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          wallet_address: publicKey.toBase58(),
          signature: signature,
          message: message,
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        localStorage.setItem('authToken', data.access);
        setAuthToken(data.access);
        setError(null);
      } else {
        setError(data.error || 'Authentication failed');
      }
    } catch (err) {
      setError(err.message);
    }
  }, [publicKey, signMessage]);

  const fetchWalletInfo = useCallback(async () => {
    if (!authToken) {
      setError('Please authenticate first');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/wallet-info/', {
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setWalletInfo(data);
        setError(null);
      } else {
        setError('Failed to fetch wallet info');
        if (response.status === 401) {
          localStorage.removeItem('authToken');
          setAuthToken(null);
        }
      }
    } catch (err) {
      setError(err.message);
    }
  }, [authToken]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setAuthToken(null);
    setWalletInfo(null);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Wallet Authentication Demo</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="space-y-4">
        {!authToken ? (
          <button
            onClick={handleAuth}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Authenticate with Wallet
          </button>
        ) : (
          <>
            <div className="flex space-x-4">
              <button
                onClick={fetchWalletInfo}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              >
                Fetch Wallet Info
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Logout
              </button>
            </div>

            {walletInfo && (
              <div className="bg-gray-100 p-4 rounded">
                <h3 className="font-bold mb-2">Wallet Info:</h3>
                <p>Address: {walletInfo.wallet_address}</p>
                <p>Created: {new Date(walletInfo.created_at).toLocaleString()}</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default WalletAuth; 