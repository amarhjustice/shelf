import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not defined");
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

const genres = [
  {
    name: "Classic Literature",
    description: "Enduring literary works from earlier periods and traditions.",
  },
  {
    name: "Fiction",
    description: "Imaginative stories, novels, and narrative works.",
  },
  {
    name: "Poetry",
    description: "Poems and other works of literary verse.",
  },
  {
    name: "Philosophy",
    description: "Works exploring ideas about knowledge, existence, ethics, and thought.",
  },
  {
    name: "History",
    description: "Works focused on people, events, societies, and the past.",
  },
  {
    name: "Children's Books",
    description: "Books written primarily for children and young readers.",
  },
  {
    name: "Science",
    description: "Works covering scientific ideas, discoveries, and disciplines.",
  },
  {
    name: "Education",
    description: "Educational resources, textbooks, study materials, and learning content.",
  },
];

const languages = [
  {
    name: "English",
    code: "en",
  },
];

const authors = [
  {
    name: "Henry David Thoreau",
    bio: "Henry David Thoreau (1817–1862) was an American essayist, poet, and philosopher, best known for Walden, his reflection on simple living in natural surroundings.",
  },
];

const topics = [
  "Nature Writing",
  "Transcendentalism",
  "Memoir",
  "American Literature",
];
const waldenChapters = [
  { chapterNumber: 1, title: "Economy", page: 1 },
  { chapterNumber: 2, title: "Where I Lived", page: 49 },
  { chapterNumber: 3, title: "Reading", page: 73 },
  { chapterNumber: 4, title: "Solitude", page: 91 },
  { chapterNumber: 5, title: "Visitors", page: 107 },
  { chapterNumber: 6, title: "The Ponds", page: 123 },
  { chapterNumber: 7, title: "Spring", page: 181 },
  { chapterNumber: 8, title: "Conclusion", page: 213 },
];

async function main() {
  console.log("Seeding Shelf database...");

  for (const genre of genres) {
    await prisma.genres.upsert({
      where: {
        name: genre.name,
      },
      update: {
        description: genre.description,
      },
      create: genre,
    });
  }

  for (const language of languages) {
    await prisma.languages.upsert({
      where: {
        code: language.code,
      },
      update: {
        name: language.name,
      },
      create: language,
    });
  }

  for (const author of authors) {
  await prisma.authors.upsert({
    where: {
      name: author.name,
    },
    update: {
      bio: author.bio,
    },
    create: author,
  });
}

for (const topic of topics) {
  await prisma.topics.upsert({
    where: {
      name: topic,
    },
    update: {},
    create: {
      name: topic,
    },
  });
}

  const philosophy = await prisma.genres.findUnique({
    where: {
      name: "Philosophy",
    },
  });

  if (!philosophy) {
    throw new Error('Genre "Philosophy" not found.');
  }

  const english = await prisma.languages.findUnique({
    where: {
      code: "en",
    },
  });

  if (!english) {
    throw new Error('Language "English" not found.');
  }

  const thoreau = await prisma.authors.findUnique({
    where: {
      name: "Henry David Thoreau",
    },
  });

  if (!thoreau) {
    throw new Error('Author "Henry David Thoreau" not found.');
  }

  const walden = await prisma.resources.upsert({
    where: {
      slug: "walden",
    },
    update: {
      title: "Walden",
      genre_id: philosophy.genre_id,
      language_id: english.language_id,
      synopsis:
        "\"I went to the woods because I wished to live deliberately.\" Thoreau's account of two years spent in a small cabin by Walden Pond is part memoir, part manifesto — a patient, exacting argument for a life built around attention rather than accumulation.",
      publication_year: 1854,
      reading_time_minutes: 360,
      license_type: "PUBLIC_DOMAIN",
      access_type: "FREE",
      price: 0,
      currency: "GHS",
      cover_palette: {
        from: "#20281c",
        to: "#37452b",
        ink: "#eef2e6",
      },
    },
    create: {
      slug: "walden",
      title: "Walden",
      genre_id: philosophy.genre_id,
      language_id: english.language_id,
      synopsis:
        "\"I went to the woods because I wished to live deliberately.\" Thoreau's account of two years spent in a small cabin by Walden Pond is part memoir, part manifesto — a patient, exacting argument for a life built around attention rather than accumulation.",
      publication_year: 1854,
      reading_time_minutes: 360,
      license_type: "PUBLIC_DOMAIN",
      access_type: "FREE",
      price: 0,
      currency: "GHS",
      cover_palette: {
        from: "#20281c",
        to: "#37452b",
        ink: "#eef2e6",
      },
    },
  });

  await prisma.books.upsert({
    where: {
      resource_id: walden.resource_id,
    },
    update: {
      number_of_pages: 224,
      featured_quote:
        "I went to the woods because I wished to live deliberately, to front only the essential facts of life.",
    },
    create: {
      resource_id: walden.resource_id,
      number_of_pages: 224,
      featured_quote:
        "I went to the woods because I wished to live deliberately, to front only the essential facts of life.",
    },
  });

  await prisma.resource_authors.upsert({
    where: {
      resource_id_author_id: {
        resource_id: walden.resource_id,
        author_id: thoreau.author_id,
      },
    },
    update: {
      role: "AUTHOR",
    },
    create: {
      resource_id: walden.resource_id,
      author_id: thoreau.author_id,
      role: "AUTHOR",
    },
  });

  for (const topicName of topics) {
    const topic = await prisma.topics.findUnique({
      where: {
        name: topicName,
      },
    });

    if (!topic) {
      throw new Error(`Topic "${topicName}" not found.`);
    }

    await prisma.resource_topics.upsert({
      where: {
        resource_id_topic_id: {
          resource_id: walden.resource_id,
          topic_id: topic.topic_id,
        },
      },
      update: {},
      create: {
        resource_id: walden.resource_id,
        topic_id: topic.topic_id,
      },
    });
  }

  for (const chapter of waldenChapters) {
    await prisma.book_chapters.upsert({
      where: {
        resource_id_chapter_number: {
          resource_id: walden.resource_id,
          chapter_number: chapter.chapterNumber,
        },
      },
      update: {
        title: chapter.title,
        page: chapter.page,
      },
      create: {
        resource_id: walden.resource_id,
        chapter_number: chapter.chapterNumber,
        title: chapter.title,
        page: chapter.page,
        content: "Chapter text has not yet been imported.",
      },
    });
  }

  console.log("Seeded Walden.");

console.log(`Seeded ${genres.length} genres.`);
console.log(`Seeded ${languages.length} languages.`);
console.log(`Seeded ${authors.length} author.`);
console.log(`Seeded ${topics.length} topics.`);
}

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });