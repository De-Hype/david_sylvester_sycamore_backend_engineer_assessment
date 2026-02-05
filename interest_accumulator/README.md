# Interest Accumulator Service

This is a backend service that calculates and applies daily compound interest to user accounts.

## Prerequisites

- Node.js (v18 or higher recommended)
- PostgreSQL
- pnpm (or npm/yarn)

## Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/De-Hype/david_sylvester_sycamore_backend_engineer_assessment.git
    cd interest_accumulator
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
    DATABASE_URL=postgres://username:password@localhost:5432/interest_accumulator
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

**Note:** Tests are configured to run sequentially (`--runInBand`) and will wipe the configured database. Ensure you use a separate test database or a local development instance.

## Project Structure

- `src/app.ts`: Express application setup
- `src/server.ts`: Server entry point
- `src/config/`: Configuration files (Database connection)
- `src/models/`: Sequelize models (Account)
- `src/routes/`: API routes
- `src/services/`: Business logic (Interest calculation)
- `tests/`: Unit and integration tests
- `migrations/`: Database migrations

## API Endpoints

### POST /api/v1/interest/:accountId/apply-interest

Calculates and applies accrued interest to a specific account based on the last application date.

**Parameters:**
- `accountId` (URL Parameter): The UUID of the account.

**Response:**
```json
{
  "status": "ok",
  "account": {
    "id": "uuid",
    "balance": "100.0753424658",
    "lastInterestApplied": "2023-10-27"
  }
}
```
