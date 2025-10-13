import "@testing-library/jest-dom";

// Load environment variables for tests
import dotenv from "dotenv";
import path from "path";

// Load .env.local for local testing
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });
