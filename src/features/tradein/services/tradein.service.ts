import { apiClient } from "@/services/api/client";
import { endpoints } from "@/services/api/endpoints";
import type { TradeInSubmission } from "@/features/tradein/schemas/tradein.schema";
import type { TradeInResult } from "@/features/tradein/types/tradein.types";

export function submitTradeIn(input: TradeInSubmission) {
  return apiClient.post<TradeInResult>(endpoints.tradeIn, input);
}
