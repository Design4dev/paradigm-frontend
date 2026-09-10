import { rentalQuoteSchema } from "@/features/rental/schemas/rental.schema";
import { createSalesforceLead } from "@/services/salesforce/salesforce.service";
import type { ApiErrorResponse, ApiSuccessResponse } from "@/types/api.types";
import type { RentalQuoteResult } from "@/features/rental/types/rental.types";
import { NextResponse } from "next/server";

/**
 * Folds the structured rental-finder answers into Salesforce's Lead
 * Description, same convention as `/api/trade-in` — the Lead object has no
 * rental-specific fields to invent, and no scoring/routing logic runs here
 * (design.md §7 — a real scoring/routing backend is Phase 2, this route only
 * captures clean structured metadata for it).
 */
function buildDescription(data: ReturnType<typeof rentalQuoteSchema.parse>): string {
  const lines: string[] = ["Rental / Find Your Fleet Request"];
  if (data.useCase) lines.push(`Use case: ${data.useCase}`);
  lines.push(`Vehicle type: ${data.vehicleType}`);
  if (data.durationInfo.duration) lines.push(`Duration: ${data.durationInfo.duration}`);
  if (data.durationInfo.startDate) lines.push(`Needed from: ${data.durationInfo.startDate}`);
  if (data.vehicleName) lines.push(`Vehicle of interest: ${data.vehicleName} (/vehicles/${data.vehicleSlug ?? ""})`);
  if (data.contact.companyName) lines.push(`Company: ${data.contact.companyName}`);
  if (data.message) lines.push(`Message: ${data.message}`);
  return lines.join("\n");
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const result = rentalQuoteSchema.safeParse(body);

  if (!result.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of result.error.issues) {
      const field = String(issue.path[issue.path.length - 1] ?? "form");
      if (!fieldErrors[field]) fieldErrors[field] = issue.message;
    }
    const response: ApiErrorResponse = { success: false, error: "Validation failed.", fieldErrors };
    return NextResponse.json(response, { status: 400 });
  }

  const { contact } = result.data;

  // Same prototype-testing convention as /api/leads and /api/trade-in.
  if (contact.email?.toLowerCase().includes("fail")) {
    const response: ApiErrorResponse = { success: false, error: "Simulated failure for prototype testing." };
    return NextResponse.json(response, { status: 502 });
  }

  try {
    const lead = await createSalesforceLead({
      name: `${contact.firstName} ${contact.lastName}`.trim(),
      email: contact.email || "",
      phone: contact.phone || "",
      vehicleInterest: result.data.vehicleType || "Rental Inquiry",
      message: buildDescription(result.data),
      vehicleSlug: result.data.vehicleSlug ?? undefined,
      vehicleName: result.data.vehicleName ?? undefined,
    });
    const response: ApiSuccessResponse<RentalQuoteResult> = { success: true, data: lead };
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("[api/rental-quote] Salesforce lead creation failed", error);
    const response: ApiErrorResponse = { success: false, error: "Could not submit your rental request. Please try again." };
    return NextResponse.json(response, { status: 502 });
  }
}
