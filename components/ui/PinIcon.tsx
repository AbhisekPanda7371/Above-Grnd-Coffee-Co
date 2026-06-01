/** SVG location pin — replaces 📍 emoji */
export default function PinIcon({ size = 14, color = "#fff" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size * 1.3} viewBox="0 0 14 18" fill="none" aria-hidden="true">
      <path d="M7 0C4.24 0 2 2.24 2 5c0 3.75 5 11 5 11s5-7.25 5-11c0-2.76-2.24-5-5-5z"
        fill={color} />
      <circle cx="7" cy="5" r="2" fill="rgba(0,0,0,0.25)" />
    </svg>
  );
}
