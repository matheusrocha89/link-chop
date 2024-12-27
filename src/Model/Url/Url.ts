import { Prisma } from "@prisma/client";
import { prisma } from "@/client/prisma";

async function createUrl(data: Prisma.UrlCreateInput) {
  const createdUrl = await prisma.url.create({ data });

  return createdUrl;
}

async function findUrlByAddress(
  address: string,
  options?: Prisma.UrlFindFirstArgs
) {
  const urlFound = await prisma.url.findFirst({
    ...options,
    where: {
      address,
    },
  });

  return urlFound;
}

async function incrementVisited(id: string) {
  const updatedUrl = await prisma.url.update({
    where: { id },
    data: {
      visits: {
        increment: 1,
      },
    },
  });

  return updatedUrl;
}

export { createUrl, findUrlByAddress, incrementVisited };
