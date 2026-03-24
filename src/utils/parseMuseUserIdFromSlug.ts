export function parseMuseUserIdFromSlug(slug?: string | null): number | null {
  if (!slug) return null;
  const match = /^u\/(\d+)$/.exec(slug);
  return match ? Number(match[1]) : null;
}
