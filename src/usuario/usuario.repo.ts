import prisma from "../prisma/prismaClient";

export const userRepository = {
  getAll: async () => {
    return await prisma.usuario.findMany();
  },

  findById: async (id: number) => {
    return await prisma.usuario.findUnique({
      where: { id }
    });
  },

  findByEmail: async (email: string) => {
    return await prisma.usuario.findUnique({
      where: { email }
    });
  },

  findCreatedToday: async () => {
    const inicioDoDia = new Date();
    inicioDoDia.setHours(0, 0, 0, 0);

    const fimDoDia = new Date();
    fimDoDia.setHours(23, 59, 59, 999);

    return await prisma.usuario.findMany({
      where: {
        createdAt: {
          gte: inicioDoDia,
          lte: fimDoDia
        }
      }
    });
  },

  create: async (data: any) => {
    return await prisma.usuario.create({
      data
    });
  },

  update: async (id: number, data: any) => {
    return await prisma.usuario.update({
      where: { id },
      data
    });
  },

  delete: async (id: number) => {
    return await prisma.usuario.delete({
      where: { id }
    });
  }
};