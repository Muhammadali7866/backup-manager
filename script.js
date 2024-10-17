const readline = require("readline");
const { createPostgresqlConnection } = require("./utils/postgresqlConnection");
const { databaseBackup } = require("./utils/databaseBackup");
const prompt = require("prompt-sync")();

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

async function runScript() {
  const whichDatabase = await askQuestion(
    "Press 1: MySQL  Press 2: PostgreSQL  Press 3: MongoDB\n"
  );

  if (whichDatabase == 2) {
    let {
      username,
      host,
      dbname,
      password,
      port,
      connectionFlag,
      backupFile,
      format,
    } = await createPostgresqlConnection();
    let backupDatabase = await databaseBackup(
      username,
      host,
      dbname,
      password,
      port,
      connectionFlag,
      backupFile,
      format
    );
  }
}

runScript();
