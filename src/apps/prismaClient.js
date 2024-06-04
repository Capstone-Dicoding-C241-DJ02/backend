import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient({
  errorFormat: "pretty",
  log: ["error", "warn"],
});

// prismaClient.job
//   .findMany({
//     where: {
//       AND: [
//         { title: { contains: "" } },
//         { city: { contains: "Ja" } },
//         { business_sector: { contains: "" } },
//       ],
//     },
//   })
//   .then(console.log);

export default prismaClient;
