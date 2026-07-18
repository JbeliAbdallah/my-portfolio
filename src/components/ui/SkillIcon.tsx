import * as icons from "simple-icons";

type SkillIconProps = {
  name: string | null;
  className?: string;
  size?: number;
};

function normalize(name: string) {
  return name
    .toLowerCase()
    .replace(/\./g, "")
    .replace(/\+/g, "plus")
    .replace(/#/g, "sharp")
    .replace(/[^a-z0-9]/g, "");
}

export default function SkillIcon({
  name,
  className = "",
  size = 22,
}: SkillIconProps) {
  if (!name) {
    return (
      <div
        className={className}
        style={{
          width: size,
          height: size,
        }}
      />
    );
  }

  const key = `si${normalize(name)}`;

  const icon = (icons as Record<string, { path: string; hex: string }>)[key];

  if (!icon) {
    return (
      <div
        className={className}
        style={{
          width: size,
          height: size,
        }}
      />
    );
  }

  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill={`#${icon.hex}`}
      className={className}
    >
      <path d={icon.path} />
    </svg>
  );
}
