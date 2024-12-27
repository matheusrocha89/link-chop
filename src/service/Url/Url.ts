import { generateUniqueHash } from "@/util/url";
import { createUrl, findUrlByAddress, incrementVisited } from "@/model/Url";

const BASE_URL = process.env.BASE_URL as string;

async function saveUrl(originalUrl: string) {
  const hash = generateUniqueHash(originalUrl);
  const fullUrl = `${BASE_URL}/api/v/${hash}`;

  const urlSaved = await createUrl({
    originalUrl,
    address: fullUrl,
  });

  return urlSaved;
}

async function visitPage(address: string) {
  const urlFound = await findUrlByAddress(address, {
    select: { id: true, originalUrl: true },
  });

  if (!urlFound) {
    throw new Error("URL not found");
  }

  await incrementVisited(urlFound.id);

  return urlFound;
}

export { saveUrl, visitPage };
