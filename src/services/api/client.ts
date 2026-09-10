import type { ApiErrorResponse, ApiResult, ApiSuccessResponse } from "@/types/api.types";

/**
 * Small typed fetch wrapper for calling this app's own `/api/*` route
 * handlers from client components (features/contact, features/leads).
 * Never throws — callers get back a discriminated `ApiResult` instead.
 *
 * Unwraps the `{ success, data }` / `{ success, error }` envelope every
 * route handler under `app/api/*` actually responds with (`ApiSuccessResponse`/
 * `ApiErrorResponse`, both declared right here in `api.types.ts`) — found
 * and fixed during the native rental booking flow's QA pass: this
 * previously treated the raw response body AS `data` directly (an unsafe
 * `as T` cast), so `response.data` was really the whole envelope object,
 * and anything reading a field off it (e.g. `response.data.id`) silently
 * got `undefined` — invisible wherever a caller only checked truthiness
 * before rendering a reference id, which is why this went unnoticed.
 * Affects every existing `apiClient.post`/`.get` caller, not just rental.
 */
async function request<T>(path: string, init?: RequestInit): Promise<ApiResult<T>> {
  try {
    const response = await fetch(path, {
      headers: { "Content-Type": "application/json", ...init?.headers },
      ...init,
    });

    const body = (await response.json().catch(() => null)) as (ApiSuccessResponse<T> | ApiErrorResponse) | null;

    if (!response.ok || !body || body.success === false) {
      const error = body && body.success === false ? body.error : undefined;
      return { ok: false, error: error ?? `Request failed with status ${response.status}.` };
    }

    return { ok: true, data: (body.data ?? {}) as T };
  } catch {
    return { ok: false, error: "Network error — please check your connection and try again." };
  }
}

export const apiClient = {
  post: <T>(path: string, payload: unknown) => request<T>(path, { method: "POST", body: JSON.stringify(payload) }),
  get: <T>(path: string) => request<T>(path, { method: "GET" }),
};
