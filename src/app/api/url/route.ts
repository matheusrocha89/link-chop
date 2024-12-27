import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { z } from "zod";

import { saveUrl } from "@/service/Url";

const BodySchema = z.object({
  url: z.string().url(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { url } = BodySchema.parse(body);
    const urlSaved = await saveUrl(url);

    return NextResponse.json({ success: true, data: urlSaved });
  } catch (error) {
    console.error(error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: "Invalid URL" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
