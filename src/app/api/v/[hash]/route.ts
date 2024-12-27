import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { visitPage } from "@/service/Url";

export async function GET(req: NextRequest) {
  try {
    const address = req.nextUrl.href;
    const url = await visitPage(address);
    return NextResponse.redirect(url.originalUrl);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
