import { apiClient } from "@/services/api/client";
import { endpoints } from "@/services/api/endpoints";
import type { LeadInput, LeadResult } from "@/features/leads/types/lead.types";

export function submitLead(input: LeadInput) {
  return apiClient.post<LeadResult>(endpoints.leads, input);
}
