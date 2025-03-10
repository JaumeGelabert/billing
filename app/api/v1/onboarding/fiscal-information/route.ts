import { auth } from "@/auth";
import { createFiscalInformationByUserId } from "@/data/fiscal-information/createFiscalInformation";
import { updateFiscalInformationByUserId } from "@/data/fiscal-information/updateFiscalInformation";
import { updateUserOnboardingByUserId } from "@/data/user/updateUser";
import { fiscalInformationSchema } from "@/schemas/fiscalInformationSchema";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const body = await req.json();
    const validatedFields = fiscalInformationSchema.safeParse(body);
    if (!validatedFields.success) {
      return NextResponse.json({
        isError: true,
        error: validatedFields.error.errors
      });
    }
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

    const data = await createFiscalInformationByUserId({
      userId: session.user.id,
      fiscalInformation: validatedFields.data
    });

    if (!data) {
      return NextResponse.json({
        isError: true,
        error: "Error creating fiscal information"
      });
    }

    const onboardingCompleted = await updateUserOnboardingByUserId({
      userId: session.user.id
    });
    if (!onboardingCompleted) {
      return NextResponse.json({
        isError: true,
        error: "Error updating user onboarding value"
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

export async function PUT(req: NextRequest, res: NextResponse) {
  try {
    const body = await req.json();
    const validatedFields = fiscalInformationSchema.safeParse(body);
    if (!validatedFields.success) {
      return NextResponse.json({
        isError: true,
        error: validatedFields.error.errors
      });
    }
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

    const data = await updateFiscalInformationByUserId({
      userId: session.user.id,
      fiscalInformation: validatedFields.data
    });

    if (!data) {
      return NextResponse.json({
        isError: true,
        error: "Error updating fiscal information"
      });
    }

    const onboardingCompleted = await updateUserOnboardingByUserId({
      userId: session.user.id
    });
    if (!onboardingCompleted) {
      return NextResponse.json({
        isError: true,
        error: "Error updating user onboarding value"
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
