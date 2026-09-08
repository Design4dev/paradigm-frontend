import { leadSchema } from "@/features/leads/types/lead.types";
import { createSalesforceLead } from "@/services/salesforce/salesforce.service";
import type { ApiErrorResponse, ApiSuccessResponse } from "@/types/api.types";
import type { LeadResult } from "@/features/leads/types/lead.types";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const result = leadSchema.safeParse(body);

  if (!result.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of result.error.issues) {
      const field = String(issue.path[0] ?? "form");
      if (!fieldErrors[field]) fieldErrors[field] = issue.message;
    }
    const response: ApiErrorResponse = { success: false, error: "Validation failed.", fieldErrors };
    return NextResponse.json(response, { status: 400 });
  }

  // Prototype-only recovery-path trigger: request a quote with an email
  // containing "fail" to exercise the Quick Quote Failure state on purpose.
  if (result.data.email.toLowerCase().includes("fail")) {
    const response: ApiErrorResponse = { success: false, error: "Simulated failure for prototype testing." };
    return NextResponse.json(response, { status: 502 });
  }

  try {
    const lead = await createSalesforceLead(result.data);
    const response: ApiSuccessResponse<LeadResult> = { success: true, data: lead };
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("[api/leads] Salesforce lead creation failed", error);
    const response: ApiErrorResponse = { success: false, error: "Could not submit your request. Please try again." };
    return NextResponse.json(response, { status: 502 });
  }
}
