import prisma from "../prisma/prismaClient";

export const userRepository = {
    getAll: async () => {
        return await prisma.usuario.findMany();
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
}