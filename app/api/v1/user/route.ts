import { auth } from "@/auth";
import { getUserByUserId } from "@/data/user/getUser";
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

    const user = await getUserByUserId(session.user.id);
    if (!user)
      return NextResponse.json(
        { isError: true, message: "User not found" },
        { status: 404 }
      );

    return NextResponse.json({ isError: false, data: user });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      isError: true,
      message: "Internal server error"
    });
  }
}
