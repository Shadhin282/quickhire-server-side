import app from './app';
import config from './config';
import { prisma } from './lib/prisma';

async function main() {
  try {
    prisma.$connect().then(() => {
      console.log("Database connected successfully");
    });
    app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });

  } catch (err) {
    console.log(err);
  }
}

main();
