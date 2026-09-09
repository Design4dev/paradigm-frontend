/**
 * Client-side upload simulation (§14/§30). There's no real file-storage
 * backend in this prototype, so this stands in for one exactly the way
 * `salesforce.service.ts`'s mock mode stands in for a real CRM — the UI
 * (states, retry, "don't block the form") is real; only the storage call is
 * mocked. Swapping in real upload storage later means replacing this one
 * function's body with an actual request.
 *
 * A filename containing "fail" simulates an upload error, matching the same
 * prototype-testing convention `api/leads` uses for the Quick Quote form.
 */
export function simulateUpload(file: File): Promise<{ ok: boolean }> {
  return new Promise((resolve) => {
    const delay = 600 + Math.random() * 900;
    setTimeout(() => {
      resolve({ ok: !file.name.toLowerCase().includes("fail") });
    }, delay);
  });
}

export function isSupportedPhotoFile(file: File): boolean {
  return file.type === "image/jpeg" || file.type === "image/png";
}
