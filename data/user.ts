import { prisma } from "@/lib/prisma";

export const revalidate = 0;

export default async function getUserByEmail(email: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  } catch {
    return null;
  }
}
export async function getUserById(id: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    return user;
  } catch (error) {
    console.error(`Error fetching user with ID ${id}:`, error);
    return null;
  }
}
export async function getRoleById(id: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    return user?.role;
  } catch (error) {
    console.error(`Error fetching user with ID ${id}:`, error);
    return null;
  }
}
