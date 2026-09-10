/**
 * Document-upload adapter boundary. No secure upload/storage backend is
 * connected in this project — `DocumentUploadField` (and
 * `useRentalBookingStore.setDocument`) keep a selected file entirely local
 * (an in-memory `File` + a local `URL.createObjectURL` preview for images),
 * never transmitted anywhere. This function is the one real call site a
 * real upload provider (a signed-URL flow, a direct-to-storage upload,
 * etc.) would replace — it deliberately never claims a successful upload.
 */
export type DocumentUploadResult = { status: "not_configured" } | { status: "success"; url: string } | { status: "error"; message: string };

export async function uploadDocument(): Promise<DocumentUploadResult> {
  return { status: "not_configured" };
}

/** Accepted file types/size for license and insurance-card photos — a reasonable, standard default until the real backend specifies its own limits. */
export const DOCUMENT_UPLOAD_ACCEPT = "image/png,image/jpeg,image/webp,application/pdf";
export const DOCUMENT_UPLOAD_MAX_BYTES = 10 * 1024 * 1024; // 10MB
