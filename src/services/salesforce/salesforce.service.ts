import { env, isSalesforceConfigured } from "@/config/environment";
import type { LeadInput, LeadResult } from "@/features/leads/types/lead.types";

/**
 * Salesforce lead creation. Real REST call, gated behind config: this
 * prototype has no Salesforce org/credentials, so without
 * `SALESFORCE_INSTANCE_URL` + `SALESFORCE_ACCESS_TOKEN` set it falls back to
 * a logged "mock mode" that still returns a usable id — the API route
 * (`app/api/leads`) behaves identically either way, so wiring a real org
 * later is just setting those two env vars.
 */
export async function createSalesforceLead(input: LeadInput): Promise<LeadResult> {
  if (!isSalesforceConfigured()) {
    console.info("[salesforce:mock] would create lead", { name: input.name, email: input.email });
    return { id: `mock-${Date.now()}` };
  }

  const response = await fetch(`${env.salesforce.instanceUrl}/services/data/v60.0/sobjects/Lead`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.salesforce.accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      LastName: input.name,
      Email: input.email,
      Phone: input.phone || undefined,
      Company: "Web Enquiry",
      Description: [input.vehicleName && `Vehicle: ${input.vehicleName}`, input.message].filter(Boolean).join("\n"),
      LeadSource: "Website",
    }),
  });

  if (!response.ok) {
    throw new Error(`Salesforce lead creation failed with status ${response.status}`);
  }

  const body = (await response.json()) as { id: string };
  return { id: body.id };
}
