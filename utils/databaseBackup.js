const { exec } = require("child_process");
const readline = require("readline");

exports.databaseBackup = (
  username,
  host,
  dbname,
  password,
  port,
  connectionFlag,
  backupFile,
  format
) => {
  // create dump comand
  const dumpCompand = `pg_dump -U ${username} -h ${host} -p ${port} -d ${dbname} -F ${format} -f "${backupFile}"`;

  console.log("running backup-----");
  exec(dumpCompand, (error, stdout, stderr) => {
    if (error) {
      console.log(`backup failed :${stderr}`);
    } else {
      console.log("Backupo is created succesfully");
    }
  });
};
