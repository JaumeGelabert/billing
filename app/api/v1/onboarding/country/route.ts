import { auth } from "@/auth";
import { updateUserCountryByUserId } from "@/data/user/updateUser";
import { countryFormSchema } from "@/schemas/countryFormSchema";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest, res: NextResponse) {
  try {
    const body = await req.json();
    const validatedFields = countryFormSchema.safeParse(body);
    if (!validatedFields.success) {
      return NextResponse.json({
        isError: true,
        error: validatedFields.error.errors
      });
    }
    const { country } = validatedFields.data;
    const session = await auth.api.getSession({
      headers: await headers()
    });
    if (!session) {
      return NextResponse.json(
        {
          isError: true,
          error: "User not found"
        },
        {
          status: 403
        }
      );
    }

    const data = await updateUserCountryByUserId({
      userId: session.user.id,
      country
    });
    if (!data) {
      return NextResponse.json({
        isError: true,
        error: "Error updating user"
      });
    }
    return NextResponse.json({
      isError: false,
      data
    });
  } catch (error) {
    return NextResponse.json({
      isError: true,
      error: "Error updating user"
    });
  }
}
