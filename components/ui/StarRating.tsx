/** Reusable SVG star rating — replaces ★★★★★ text chars */
export default function StarRating({
  count = 5, size = 11, color = "#c9a84c", gap = 3,
}: { count?: number; size?: number; color?: string; gap?: number }) {
  const R = size / 2;
  const r = R * 0.4;
  const pts = (cx: number, cy: number) =>
    Array.from({ length: 5 }, (_, i) => {
      const oa = ((i * 72) - 90) * (Math.PI / 180);
      const ia = ((i * 72 + 36) - 90) * (Math.PI / 180);
      return `${cx + R * Math.cos(oa)},${cy + R * Math.sin(oa)} ${cx + r * Math.cos(ia)},${cy + r * Math.sin(ia)}`;
    }).join(" ");

  const w = count * size + (count - 1) * gap;
  return (
    <svg width={w} height={size} viewBox={`0 0 ${w} ${size}`} aria-label={`${count} stars`}>
      {Array.from({ length: count }, (_, i) => (
        <polygon key={i} fill={color}
          points={pts(R + i * (size + gap), R)} />
      ))}
    </svg>
  );
}
