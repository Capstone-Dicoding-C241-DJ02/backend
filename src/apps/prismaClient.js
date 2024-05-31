import { PrismaClient } from "@prisma/client";
import fs from "fs";

const prismaClient = new PrismaClient({
  errorFormat: "pretty",
  log: ["error", "warn"],
});

fs.readFile("../../jobs-dataset.json", (err, data) => {
  if (err) console.log(err);

  const json = JSON.parse(data.toString());

  prismaClient.job
    .createMany({
      data: json.map((d) => ({
        title: d.title,
        desc: d.description,
        city: d.city,
        logo: d.Logo,
        business_sector: d.business_sector,
      })),
    })
    .then(() => console.log("ok"));
});

export default prismaClient;
