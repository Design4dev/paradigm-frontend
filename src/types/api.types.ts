/** Generic result envelope returned by `services/api/client.ts`. */
export type ApiResult<T> = { ok: true; data: T } | { ok: false; error: string };

/** Shape every API route handler under `app/api/*` should respond with. */
export interface ApiSuccessResponse<T = Record<string, never>> {
  success: true;
  data?: T;
}

export interface ApiErrorResponse {
  success: false;
  error: string;
  fieldErrors?: Record<string, string>;
}
