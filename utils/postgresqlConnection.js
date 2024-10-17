const prompt = require("prompt-sync")();
const { Pool } = require("pg");
const readline = require("readline");

function askQuestion(query) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) =>
    rl.question(query, (answer) => {
      rl.close();
      resolve(answer);
    })
  );
}
exports.createPostgresqlConnection = async () => {
  console.log("Enter crendials to create database connection");
  // Prompt for user input
  const username = await askQuestion("Enter PostgreSQL username: ");
  const host = await askQuestion("Enter PostgreSQL host (e.g., localhost): ");
  const port =
    (await askQuestion("Enter PostgreSQL port (default 5432): ")) || "5432";
  const dbname = await askQuestion("Enter PostgreSQL database name: ");
  const backupFile = await askQuestion(
    "Enter backup file path (e.g., C:/backups/my_backup.sql): "
  );
  const format = await askQuestion(
    "Enter backup format (c for custom, t for tar, p for plain): "
  );
  const password = await askQuestion("Enter database password : ");

  const pool = new Pool({
    user: username,
    host: host,
    database: dbname,
    password: password,
    port: port,
  });

  let client;
  let connectionFlag = false;
  try {
    client = await pool.connect();
    console.log("database is conencted successfully");
    connectionFlag = true;
  } catch (error) {
    console.log("unable to connect the connection try again later");
  } finally {
    if (client) client.release();
    await pool.end();
  }
  return {
    username,
    host,
    dbname,
    password,
    port,
    connectionFlag,
    backupFile,
    format,
  };
};
