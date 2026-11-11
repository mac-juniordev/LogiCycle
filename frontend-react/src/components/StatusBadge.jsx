/**
 * Reusable badge for risk tiers and verification status.
 * Used in Admin panel report cards.
 */
export default function StatusBadge({ tier, verified }) {
  const tierStyles = {
    CRITICAL: "bg-hazard text-white",
    HIGH: "bg-warn text-forest-950",
    LOW: "bg-forest-600 text-white",
    UNKNOWN: "bg-slate-600 text-white",
  };

  const tierLabels = {
    CRITICAL: "Critical",
    HIGH: "High",
    LOW: "Low",
    UNKNOWN: "Unknown",
  };

  return (
    <div className="flex items-center gap-1.5 flex-wrap">
      {tier && (
        <span
          className={`px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase ${
            tierStyles[tier] || tierStyles.UNKNOWN
          }`}
        >
          {tierLabels[tier] || tier}
        </span>
      )}
      {typeof verified === "boolean" && (
        <span
          className={`px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase ${
            verified
              ? "bg-forest-600 text-white"
              : "bg-warn text-forest-950"
          }`}
        >
          {verified ? "Exif ✓" : "Unverified"}
        </span>
      )}
    </div>
  );
}