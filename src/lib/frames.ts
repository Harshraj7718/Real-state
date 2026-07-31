export const TOTAL_FRAMES = 695;

export function frameSrc(index: number) {
  const clamped = Math.min(Math.max(index, 1), TOTAL_FRAMES);
  return `/frames/frame_${String(clamped).padStart(4, "0")}.jpg`;
}
