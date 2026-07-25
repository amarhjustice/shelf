export type CoverPalette = {
  from: string;
  to: string;
  ink: string;
};

export type Chapter = {
  id: string;
  title: string;
  page: number;
};

export type Book = {
  id: string;
  slug: string;
  title: string;
  author: string;
  authorBio?: string;
  authorYears?: string;
  description: string;
  category: string;
  topics: string[];
  publicationYear: number;
  language: string;
  readingTimeMinutes: number;
  pages: number;
  isPublicDomain: boolean;
  rating: number;
  quote?: string;
  palette: CoverPalette;
  chapters: Chapter[];
  progress?: number; // 0-100, present if user has started the book
  lastRead?: string; // relative time label
};

export type Category = {
  id: string;
  name: string;
  icon: string;
  description: string;
  count: number;
};
