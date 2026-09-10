import { apiClient } from "@/services/api/client";
import { endpoints } from "@/services/api/endpoints";
import type { RentalQuoteSchemaInput } from "@/features/rental/schemas/rental.schema";
import type { RentalQuoteResult } from "@/features/rental/types/rental.types";

export function submitRentalQuote(input: RentalQuoteSchemaInput) {
  return apiClient.post<RentalQuoteResult>(endpoints.rentalQuote, input);
}
