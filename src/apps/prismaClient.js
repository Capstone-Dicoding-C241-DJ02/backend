import { PrismaClient } from "@prisma/client";


const prismaClient = new PrismaClient({
  errorFormat: "pretty",
  log: ["error", "warn"],
});


export default prismaClient;
