# Idempotent Wallet Service

This is a backend service for a wallet application that supports idempotent transfers, preventing double-spending and ensuring transaction reliability.

## Prerequisites

- Node.js (v18 or higher recommended)
- PostgreSQL
- pnpm (or npm/yarn)

## Installation

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    cd idempotent_wallet
    ```

2.  Install dependencies:
    ```bash
    pnpm install
    # or
    npm install
    ```

## Environment Setup

1.  Create a `.env` file in the root directory based on `.env.example`:
    ```bash
    cp .env.example .env
    ```

2.  Update the `.env` file with your database credentials and configuration:
    ```env
    DATABASE_URL=postgres://username:password@localhost:5432/idempotent_wallet
    PORT=3000
    ```

## Database Migration

Run the Sequelize migrations to set up the database schema:

```bash
npx sequelize-cli db:migrate
```

## Running the Application

### Development Mode
To run the application in development mode with hot-reloading:

```bash
pnpm dev
# or
npm run dev
```

### Production Build
To build and start the application for production:

```bash
pnpm build
pnpm start
# or
npm run build
npm start
```

## Testing

The project uses Jest for testing.

### Run Unit Tests
To run the test suite:

```bash
pnpm test
# or
npm test
```

### Run Tests with Coverage
To run tests and generate a code coverage report:

```bash
pnpm test:coverage
# or
npm run test:coverage
```

## Project Structure

- `src/app.ts`: Express application setup
- `src/server.ts`: Server entry point
- `src/config/`: Configuration files (Database connection)
- `src/models/`: Sequelize models (Wallet, TransactionLog)
- `src/routes/`: API routes
- `src/services/`: Business logic services
- `tests/`: Unit and integration tests
- `migrations/`: Database migrations

## API Endpoints

### POST /api/v1/transfer
Deducts funds from a wallet.

**Body:**
```json
{
  "idempotencyKey": "unique-uuid",
  "amount": "100.00",
  "walletId": "uuid"
}
```

## Important Note on Testing

**Warning:** Running tests (`pnpm test`) will use the database configured in your `.env` file (via `DATABASE_URL`) and will **WIPE** all data in it (`sync({ force: true })`). Ensure you are using a separate test database or a local development database that can be safely reset.
