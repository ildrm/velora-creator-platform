import type { Creator } from "@/lib/data";

export function Avatar({ creator, size = "md" }: { creator: Creator; size?: "sm" | "md" | "lg" | "xl" }) {
  return (
    <span className={`avatar avatar-${size}`} style={{ background: creator.avatar }} aria-label={`${creator.name} avatar`}>
      <span>{creator.initials}</span>
    </span>
  );
}
