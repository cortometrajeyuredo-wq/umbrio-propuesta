export const ARTBOOK_PAGE_COUNT = 56;

export const artbookPageUrl = (page: number): string =>
  `/artbook/page-${String(page).padStart(2, "0")}.webp`;

export const moveArtbookPage = (current: number, direction: -1 | 1): number =>
  Math.min(ARTBOOK_PAGE_COUNT, Math.max(1, current + direction));

export type ArtbookTurn = { from: number; to: number; direction: -1 | 1 };

export const getArtbookTurn = (current: number, direction: -1 | 1): ArtbookTurn | null => {
  const to = moveArtbookPage(current, direction);
  return to === current ? null : { from: current, to, direction };
};
