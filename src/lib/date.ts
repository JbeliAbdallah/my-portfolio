export function formatMonthYear(date: Date | string | null | undefined) {
  if (!date) return "";

  return new Intl.DateTimeFormat("en", {
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

export function formatDateRange(
  start: Date | string | null | undefined,
  end: Date | string | null | undefined,
  isCurrent = false,
) {
  const startText = formatMonthYear(start);

  const endText = isCurrent ? "Present" : end ? formatMonthYear(end) : "";

  if (!startText) return endText;
  if (!endText) return startText;

  return `${startText} — ${endText}`;
}
