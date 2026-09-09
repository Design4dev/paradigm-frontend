import { tradeInSchema } from "@/features/tradein/schemas/tradein.schema";
import { createSalesforceLead } from "@/services/salesforce/salesforce.service";
import type { ApiErrorResponse, ApiSuccessResponse } from "@/types/api.types";
import type { TradeInResult } from "@/features/tradein/types/tradein.types";
import { NextResponse } from "next/server";

/**
 * Builds the rich free-text summary Salesforce's Lead.Description receives —
 * the Lead object has no trade-in-specific fields to invent, so the
 * structured vehicle/condition/photo data submitted by the form is folded
 * into one readable block instead (§29 "Do not create a new CRM").
 */
function buildDescription(data: ReturnType<typeof tradeInSchema.parse>): string {
  const { vehicle, condition, photos, replacementVehicle, contact } = data;
  const lines: string[] = ["Trade-In Appraisal Request"];

  const vehicleLine = [vehicle.year, vehicle.make, vehicle.model].filter(Boolean).join(" ");
  if (vehicleLine) lines.push(`Vehicle: ${vehicleLine}`);
  if (vehicle.vin) lines.push(`VIN: ${vehicle.vin}`);
  if (vehicle.type) lines.push(`Type: ${vehicle.type}`);
  if (vehicle.condition) lines.push(`Overall Condition: ${vehicle.condition}`);
  if (vehicle.horsepower) lines.push(`Horsepower: ${vehicle.horsepower}`);
  if (vehicle.hours) lines.push(`Hours: ${vehicle.hours}`);
  if (vehicle.price) lines.push(`Customer's Asking Price: $${vehicle.price}`);

  const conditionParts = [
    condition.exterior && `Exterior: ${condition.exterior}`,
    condition.interior && `Interior: ${condition.interior}`,
    condition.mechanical && `Mechanical: ${condition.mechanical}`,
    condition.tires && `Tires: ${condition.tires}`,
    condition.mileage && `Mileage/Hours: ${condition.mileage}`,
  ].filter(Boolean);
  if (conditionParts.length > 0) lines.push(`Condition — ${conditionParts.join(", ")}`);
  if (condition.notes) lines.push(`Notes: ${condition.notes}`);

  if (photos && photos.length > 0) {
    lines.push(`Photos attached: ${photos.map((photo) => `${photo.category} (${photo.fileName})`).join(", ")}`);
  }

  if (replacementVehicle) {
    lines.push(`Trading toward: ${replacementVehicle.name} (${replacementVehicle.priceLabel}) — /vehicles/${replacementVehicle.slug}`);
  }

  lines.push(`Preferred contact method: ${contact.contactMethod}`);
  if (contact.message) lines.push(`Message: ${contact.message}`);

  return lines.join("\n");
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const result = tradeInSchema.safeParse(body);

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

  // Prototype-only recovery-path trigger, same convention as api/leads: an
  // email containing "fail" exercises the Submission Error state on purpose.
  if (contact.email?.toLowerCase().includes("fail")) {
    const response: ApiErrorResponse = { success: false, error: "Simulated failure for prototype testing." };
    return NextResponse.json(response, { status: 502 });
  }

  try {
    const lead = await createSalesforceLead({
      name: `${contact.firstName} ${contact.lastName}`.trim(),
      email: contact.email || "",
      phone: contact.phone || "",
      vehicleInterest: result.data.vehicle.type || "Trade-In Appraisal",
      message: buildDescription(result.data),
      vehicleSlug: result.data.replacementVehicle?.slug,
      vehicleName: result.data.replacementVehicle?.name,
    });
    const response: ApiSuccessResponse<TradeInResult> = { success: true, data: lead };
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("[api/trade-in] Salesforce lead creation failed", error);
    const response: ApiErrorResponse = { success: false, error: "Could not submit your appraisal request. Please try again." };
    return NextResponse.json(response, { status: 502 });
  }
}
