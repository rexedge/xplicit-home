import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seed() {
  const users = await prisma.user.createMany({
    data: [
      {
        id: "paul-ayobami",
        name: "Paul Ayobami",
        email: "ap.oyenran@gmail.com",
        emailVerified: new Date(),
        image: "",
        password: "",
        phone: "",
        role: "SUPERADMIN",
        isVerified: true,
      },
    ],
  });

  console.log(`${users.count} Users Created`);
}
seed()
  .catch((error) => {
    console.log({ error });
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
