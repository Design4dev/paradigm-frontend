import { contactSchema } from "@/features/contact/schemas/contact.schema";
import type { ApiErrorResponse, ApiSuccessResponse } from "@/types/api.types";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const result = contactSchema.safeParse(body);

  if (!result.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of result.error.issues) {
      const field = String(issue.path[0] ?? "form");
      if (!fieldErrors[field]) fieldErrors[field] = issue.message;
    }
    const response: ApiErrorResponse = { success: false, error: "Validation failed.", fieldErrors };
    return NextResponse.json(response, { status: 400 });
  }

  // No email/CRM provider wired up for this prototype — log server-side so
  // the submission is at least observable, and return success. Swap this
  // for a real email send / CRM write without touching the client.
  console.info("[api/contact] new message", result.data);

  const response: ApiSuccessResponse = { success: true };
  return NextResponse.json(response, { status: 200 });
}
