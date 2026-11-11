/**
 * LogiCycle logo — inline SVG.
 * Steel blue grate (water infrastructure), forest green leaf (climate),
 * burnt amber dot (hazard).
 */
export default function Logo({ size = 40, className = "" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      width={size}
      height={size}
      className={className}
      aria-label="LogiCycle"
    >
      {/* Circular background — base dark */}
      <circle cx="256" cy="256" r="256" fill="#0a1219" />

      {/* Grate frame — steel blue */}
      <rect
        x="106"
        y="106"
        width="300"
        height="300"
        rx="24"
        fill="none"
        stroke="#1e5f8f"
        strokeWidth="14"
      />

      {/* Grate slots — muted cream */}
      <line x1="152" y1="140" x2="152" y2="372" stroke="#55606d" strokeWidth="10" strokeLinecap="round" />
      <line x1="204" y1="140" x2="204" y2="372" stroke="#55606d" strokeWidth="10" strokeLinecap="round" />
      <line x1="308" y1="140" x2="308" y2="372" stroke="#55606d" strokeWidth="10" strokeLinecap="round" />
      <line x1="360" y1="140" x2="360" y2="372" stroke="#55606d" strokeWidth="10" strokeLinecap="round" />

      {/* Leaf — forest green */}
      <path
        d="M 256 380 C 240 340, 226 300, 232 260 C 236 232, 244 210, 256 188 C 268 210, 276 232, 280 260 C 286 300, 272 340, 256 380 Z"
        fill="#2ab077"
      />

      {/* Leaf stem and vein */}
      <line x1="256" y1="380" x2="256" y2="300" stroke="#166b4b" strokeWidth="5" strokeLinecap="round" />
      <line x1="256" y1="300" x2="256" y2="210" stroke="#166b4b" strokeWidth="4" strokeLinecap="round" />

      {/* Burnt amber hazard dot */}
      <circle cx="396" cy="128" r="16" fill="#e07a1f" />
      <circle cx="396" cy="128" r="16" fill="none" stroke="#0a1219" strokeWidth="3" />
    </svg>
  );
}