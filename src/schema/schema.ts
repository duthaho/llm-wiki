export type WikiPageType = 'person' | 'event' | 'era' | 'place' | 'concept' | 'dynasty';

export type Era =
  | 'prehistoric'
  | 'chinese-domination'
  | 'ngo-dinh'
  | 'ly-dynasty'
  | 'tran-dynasty'
  | 'ho-dynasty'
  | 'le-dynasty'
  | 'mac-dynasty'
  | 'nguyen-dynasty'
  | 'french-colonization'
  | 'independence-wars'
  | 'reunification-doi-moi';

export interface WikiFrontmatter {
  title: string;
  type: WikiPageType;
  era: Era;
  tags: string[];
  sources: string[];
}

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

const VALID_TYPES: WikiPageType[] = ['person', 'event', 'era', 'place', 'concept', 'dynasty'];
export const VALID_ERAS: Era[] = [
  'prehistoric', 'chinese-domination', 'ngo-dinh', 'ly-dynasty',
  'tran-dynasty', 'ho-dynasty', 'le-dynasty', 'mac-dynasty', 'nguyen-dynasty',
  'french-colonization', 'independence-wars', 'reunification-doi-moi',
];

export function validateFrontmatter(fm: WikiFrontmatter): ValidationResult {
  const errors: string[] = [];

  if (!fm.title) errors.push('title is required');
  if (!VALID_TYPES.includes(fm.type)) errors.push(`type must be one of: ${VALID_TYPES.join(', ')}`);
  if (!VALID_ERAS.includes(fm.era)) errors.push(`era must be one of: ${VALID_ERAS.join(', ')}`);
  if (!Array.isArray(fm.tags)) errors.push('tags must be an array');
  if (!Array.isArray(fm.sources)) errors.push('sources must be an array');

  return { valid: errors.length === 0, errors };
}
