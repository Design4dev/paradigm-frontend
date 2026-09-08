import { env } from "@/config/environment";
import { WEBHOOK_SECRET_HEADER } from "@/lib/constants";
import type { ApiErrorResponse, ApiSuccessResponse } from "@/types/api.types";
import { NextResponse } from "next/server";

/**
 * Generic inbound webhook receiver — the shape a CRM/CMS/payment provider
 * would call back into. Secure by default: with no `WEBHOOK_SECRET`
 * configured, every request is rejected rather than silently accepted.
 */
export async function POST(request: Request) {
  const providedSecret = request.headers.get(WEBHOOK_SECRET_HEADER);

  if (!env.webhookSecret || providedSecret !== env.webhookSecret) {
    const response: ApiErrorResponse = { success: false, error: "Unauthorized." };
    return NextResponse.json(response, { status: 401 });
  }

  const payload = await request.json().catch(() => null);
  console.info("[api/webhooks] received payload", payload);

  const response: ApiSuccessResponse = { success: true };
  return NextResponse.json(response, { status: 200 });
}
