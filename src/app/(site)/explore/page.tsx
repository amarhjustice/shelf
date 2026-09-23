import { prisma } from "@/lib/prisma";
import ExploreClient from "./ExploreClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Explore — Shelf",
};

export default async function ExplorePage() {
  const resources = await prisma.resources.findMany({
    orderBy: {
      title: "asc",
    },
    include: {
      genres: true,
      languages: true,
      books: {
        include: {
          book_chapters: true,
        },
      },
      resource_authors: {
        include: {
          authors: true,
        },
        orderBy: {
          role: "asc",
        },
      },
      resource_topics: {
        include: {
          topics: true,
        },
      },
    },
  });

  const books = resources.map((resource) => {
    const primaryAuthor =
      resource.resource_authors.find(
        (resourceAuthor) => resourceAuthor.role === "AUTHOR"
      )?.authors ?? resource.resource_authors[0]?.authors;

    const palette =
      resource.cover_palette &&
      typeof resource.cover_palette === "object" &&
      !Array.isArray(resource.cover_palette)
        ? (resource.cover_palette as {
            from: string;
            to: string;
            ink: string;
          })
        : {
            from: "#20281c",
            to: "#37452b",
            ink: "#eef2e6",
          };

    return {
      id: resource.resource_id.toString(),
      slug: resource.slug,
      title: resource.title,
      author: primaryAuthor?.name ?? "Unknown author",
      description: resource.synopsis ?? "",
      category: resource.genres.name,
      topics: resource.resource_topics.map(
        (resourceTopic) => resourceTopic.topics.name
      ),
      publicationYear: resource.publication_year ?? 0,
      language: resource.languages.name,
      readingTimeMinutes: resource.reading_time_minutes ?? 0,
      pages: resource.books?.number_of_pages ?? 0,
      isPublicDomain: resource.license_type === "PUBLIC_DOMAIN",
      palette,
      quote: resource.books?.featured_quote ?? undefined,
      chapters:
        resource.books?.book_chapters.map((chapter) => ({
          id: chapter.chapter_id.toString(),
          title: chapter.title,
          page: chapter.page ?? 0,
        })) ?? [],
    };
  });

  const genres = await prisma.genres.findMany({
    orderBy: {
      name: "asc",
    },
    select: {
      name: true,
    },
  });

  const authors = await prisma.authors.findMany({
    orderBy: {
      name: "asc",
    },
    select: {
      name: true,
    },
  });

  const languages = await prisma.languages.findMany({
    orderBy: {
      name: "asc",
    },
    select: {
      name: true,
    },
  });

  return (
    <ExploreClient
      books={books}
      categories={genres.map((genre) => genre.name)}
      authors={authors.map((author) => author.name)}
      languages={languages.map((language) => language.name)}
    />
  );
}