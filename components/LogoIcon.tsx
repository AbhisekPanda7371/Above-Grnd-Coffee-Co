/**
 * Above GRND Custom Logo Icon
 * Letter "O" ring with a latte cup inside — gold on transparent.
 * Premium, scalable, consistent across all OS/browsers (SVG).
 */
export default function LogoIcon({ size = 40, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Above GRND Coffee Co. logo"
    >
      {/* ── Outer "O" ring ── */}
      <circle cx="20" cy="20" r="18.5" fill="rgba(201,168,76,0.12)" stroke="#C9A84C" strokeWidth="1.8"/>

      {/* ── Inner subtle glow ── */}
      <circle cx="20" cy="20" r="15" fill="rgba(201,168,76,0.05)"/>

      {/* ── Cup body — tapered, wide-mouth latte cup ── */}
      <path
        d="M 11.5 27 L 13.2 16.5 H 26.8 L 28.5 27 Q 28.5 30 20 30 Q 11.5 30 11.5 27 Z"
        fill="#C9A84C"
      />

      {/* ── Cup rim highlight ── */}
      <ellipse cx="20" cy="16.5" rx="6.8" ry="1.6" fill="#D4AF37" />

      {/* ── Coffee surface — dark espresso ── */}
      <ellipse cx="20" cy="16.5" rx="6.2" ry="1.2" fill="#1E0A02" />

      {/* ── Latte art: small heart in cream ── */}
      <g transform="translate(20, 16.5)">
        <path
          d="M -1.2 -0.2 C -1.2 -1.2 0 -1.2 0 -0.2 C 0 -1.2 1.2 -1.2 1.2 -0.2 C 1.2 0.6 0 1.5 0 1.5 C 0 1.5 -1.2 0.6 -1.2 -0.2 Z"
          fill="#F0DDB8"
          opacity="0.88"
        />
      </g>

      {/* ── Handle ── */}
      <path
        d="M 28.5 20 Q 33.5 20 33.5 23.5 Q 33.5 27 28.5 27"
        stroke="#B8921E"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      {/* Handle inner cutout */}
      <path
        d="M 29.5 21.5 Q 31.8 21.5 31.8 23.5 Q 31.8 25.5 29.5 25.5"
        stroke="#C9A84C"
        strokeWidth="0.8"
        strokeLinecap="round"
        fill="none"
        opacity="0.5"
      />

      {/* ── Saucer ── */}
      <ellipse cx="20" cy="30.2" rx="8.8" ry="1.6" fill="#B8921E" opacity="0.7" />
      <ellipse cx="20" cy="30.2" rx="6.5" ry="1.0" fill="#C9A84C" opacity="0.4" />

      {/* ── Steam wisps ── */}
      <path
        d="M 15.5 14.5 C 15 13 16 11.5 15.5 10"
        stroke="#C9A84C" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.55"
      />
      <path
        d="M 20 13.8 C 19.5 12.2 20.5 10.8 20 9.2"
        stroke="#C9A84C" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.55"
      />
      <path
        d="M 24.5 14.5 C 24 13 25 11.5 24.5 10"
        stroke="#C9A84C" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.55"
      />

      {/* ── Tiny coffee drops on cup body ── */}
      <circle cx="16.5" cy="23" r="0.6" fill="#B8921E" opacity="0.5"/>
      <circle cx="23.5" cy="21" r="0.5" fill="#B8921E" opacity="0.4"/>
      <circle cx="18" cy="26" r="0.4" fill="#B8921E" opacity="0.35"/>
    </svg>
  );
}
