import { apiClient } from "@/services/api/client";
import { endpoints } from "@/services/api/endpoints";
import type { ContactInput } from "@/features/contact/schemas/contact.schema";

export function submitContact(input: ContactInput) {
  return apiClient.post<{ success: true }>(endpoints.contact, input);
}
