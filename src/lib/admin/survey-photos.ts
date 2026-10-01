// Survey photo storage. Originals are uploaded exactly as taken; alongside each
// one the browser makes a 1600px JPEG display copy (orientation applied) for
// the checklist, the report and the Word export. HEIC files a browser cannot
// decode keep the original only.

export const PHOTO_BUCKET = "fm-survey-photos";
export const DISPLAY_MAX = 1600;

export async function makeDisplayCopy(file: File): Promise<{ blob: Blob; width: number; height: number } | null> {
  try {
    const bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });
    const scale = Math.min(1, DISPLAY_MAX / Math.max(bitmap.width, bitmap.height));
    const width = Math.round(bitmap.width * scale);
    const height = Math.round(bitmap.height * scale);
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    ctx.drawImage(bitmap, 0, 0, width, height);
    bitmap.close();
    const blob = await new Promise<Blob | null>((r) => canvas.toBlob(r, "image/jpeg", 0.85));
    return blob ? { blob, width, height } : null;
  } catch {
    return null;
  }
}
