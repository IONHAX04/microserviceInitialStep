import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const dbConnection = new Pool({
  user: process.env.DB_USER || "postgres",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "testingdb",
  password: process.env.DB_PASSWORD || "ionhax",
  port: Number(process.env.DB_PORT) || 5432,
});

dbConnection.connect((err: Error | undefined, client, release) => {
  if (err) {
    console.error("Error acquiring client", err.stack);
    return;
  }
  console.log("Database connected successfully!");
  release(); 
});

export default dbConnection;
