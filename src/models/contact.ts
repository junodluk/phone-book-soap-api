import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export interface ContactDTO {
    id?: number;
    name: string;
    lastName: string;
    lastNameLower?: string;
    phoneNumber: string;
}

export const create = async (data: ContactDTO) => {
    const contact = await prisma.contact.create({
        data: {
            ...data,
            lastNameLower: data.lastName.toLowerCase(),
        },
    });
    return contact;
};

export const readOne = async (id: number) => {
    const contact = await prisma.contact.findFirst({ where: { id } });
    return contact;
};

export const list = async (filterLastName?: string) => {
    const filter = filterLastName?.toLowerCase();
    const contact = await prisma.contact.findMany(
        filterLastName
            ? {
                  where: {
                      lastNameLower: {
                          contains: filter,
                      },
                  },
              }
            : undefined
    );
    return contact;
};

export const update = async (id: number, data: ContactDTO) => {
    const contact = await prisma.contact.update({
        where: { id },
        data: {
            name: data.name,
            lastName: data.lastName,
            lastNameLower: data.lastName.toLowerCase(),
            phoneNumber: data.phoneNumber,
        },
    });
    return contact;
};

export const deleteOne = async (id: number) => {
    return await prisma.contact.delete({ where: { id } });
};
