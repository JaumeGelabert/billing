import { auth } from "@/auth";
import { getFiscalInformation } from "@/data/fiscal-information/getFiscalInformation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: req.headers
    });
    if (!session)
      return NextResponse.json(
        { isError: true, message: "Session not found" },
        { status: 403 }
      );

    const fiscalInformation = await getFiscalInformation(session.user.id);

    return NextResponse.json({ isError: false, data: fiscalInformation });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      isError: true,
      message: "Internal server error"
    });
  }
}
