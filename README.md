# Django Web3 Solana Authentication

This project demonstrates a full-stack implementation of Solana wallet authentication using Django REST Framework and React. Users can connect their Solana wallet, sign messages for authentication, and access protected endpoints using JWT tokens.

## Features

- Solana wallet authentication using message signing
- JWT token-based authentication
- Protected API endpoints
- React frontend with Phantom wallet integration
- User management with wallet addresses

## Project Structure

```
django-web3-solana-base/
├── backend/                 # Django backend
│   ├── authentication/     # Authentication app
│   ├── core/              # Project settings
│   ├── manage.py
│   └── requirements.txt
└── frontend/               # React frontend
    ├── src/
    ├── package.json
    └── vite.config.js
```

## Prerequisites

- Python 3.8+
- Node.js 16+
- Phantom Wallet browser extension

## Backend Setup

1. Create and activate a virtual environment:
```bash
cd backend
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Apply migrations:
```bash
python manage.py migrate
```

4. Run the development server:
```bash
python manage.py runserver
```

The backend will be available at `http://localhost:8000`.

## Frontend Setup

1. Install dependencies:
```bash
cd frontend
npm install
```

2. Run the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`.

## Usage

1. Open the application in your browser
2. Click "Select Wallet" to connect your Phantom wallet
3. Click "Authenticate with Wallet" to sign in
4. Once authenticated, you can:
   - View your wallet information
   - Access protected endpoints
   - Sign out

## API Endpoints

- `POST /api/auth/` - Authenticate with wallet signature
  - Request body:
    ```json
    {
      "wallet_address": "string",
      "signature": "string",
      "message": "string"
    }
    ```
  - Response:
    ```json
    {
      "refresh": "string",
      "access": "string",
      "wallet_address": "string"
    }
    ```

- `GET /api/wallet-info/` - Get authenticated user's wallet information (Protected)
  - Response:
    ```json
    {
      "wallet_address": "string",
      "created_at": "datetime"
    }
    ```

## Security Considerations

- The project uses environment variables for sensitive data
- CORS is configured for development - adjust for production
- JWT tokens are stored in localStorage - consider more secure alternatives for production
- Always use HTTPS in production

## Development

- Backend uses Django REST Framework for API development
- Frontend uses React with Vite
- Solana Web3.js for blockchain interactions
- Authentication flow uses message signing for security

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request 