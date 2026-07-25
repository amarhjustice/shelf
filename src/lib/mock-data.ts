import { Book, Category } from "./types";

function chapters(titles: string[], pagesTotal: number) {
  const step = Math.floor(pagesTotal / titles.length);
  return titles.map((title, i) => ({
    id: `ch-${i + 1}`,
    title,
    page: i === 0 ? 1 : i * step,
  }));
}

export const books: Book[] = [
  {
    id: "dorian-gray",
    slug: "the-picture-of-dorian-gray",
    title: "The Picture of Dorian Gray",
    author: "Oscar Wilde",
    authorBio:
      "Oscar Wilde (1854–1900) was an Irish poet and playwright who became one of the most popular playwrights in London in the early 1890s. He is remembered for his epigrams, his novel The Picture of Dorian Gray, and his plays, as well as the circumstances of his imprisonment and early death.",
    authorYears: "1854–1900",
    description:
      "In this celebrated novel, Oscar Wilde explores the nature of beauty, morality, and hedonism. The story revolves around a young man named Dorian Gray, whose portrait is painted by the artist Basil Hallward. Under the influence of the cynical Lord Henry Wotton, Dorian becomes obsessed with his own physical perfection. He makes a desperate wish: that the portrait would grow old and withered while he himself remains forever young. As Dorian descends into a life of cruelty and vice, the painting becomes a grotesque record of his sins, a visual manifestation of his decaying soul hidden away in a locked room. Wilde's only novel remains one of the most provocative and elegant critiques of the aesthetic movement, wrapped in a gothic atmosphere that continues to haunt readers over a century later.",
    category: "Fiction",
    topics: ["Gothic Fiction", "Aestheticism", "Victorian Literature", "Psychological Horror"],
    publicationYear: 1890,
    language: "English",
    readingTimeMinutes: 330,
    pages: 250,
    isPublicDomain: true,
    rating: 4.5,
    quote: "The only way to get rid of a temptation is to yield to it.",
    palette: { from: "#2b2118", to: "#4a3524", ink: "#f0e6d2" },
    chapters: chapters(
      [
        "The Studio",
        "Lord Henry's Influence",
        "The Portrait's Wish",
        "The Silent Archive",
        "A Cruel Season",
        "The Actress",
        "The Broken Engagement",
        "The First Change",
        "Years of Pleasure",
        "The Locked Room",
        "A Life Unravels",
        "The Final Reckoning",
      ],
      250
    ),
  },
  {
    id: "frankenstein",
    slug: "frankenstein",
    title: "Frankenstein",
    author: "Mary Shelley",
    authorBio:
      "Mary Shelley (1797–1851) was an English novelist best known for her Gothic novel Frankenstein; or, The Modern Prometheus, widely considered one of the earliest examples of science fiction.",
    authorYears: "1797–1851",
    description:
      "Victor Frankenstein, a brilliant but obsessive scientist, discovers the secret of imbuing life into non-living matter, and creates a being from assembled body parts. Horrified by his own creation, Victor abandons it, setting off a chain of tragedy that follows him across Europe. Equal parts horror story, philosophical inquiry, and tragic romance, Frankenstein asks what we owe the things we create — and what happens when we refuse the answer.",
    category: "Classic",
    topics: ["Gothic Fiction", "Science Fiction", "Romanticism", "Horror"],
    publicationYear: 1818,
    language: "English",
    readingTimeMinutes: 400,
    pages: 280,
    isPublicDomain: true,
    rating: 4.6,
    quote: "Nothing is so painful to the human mind as a great and sudden change.",
    palette: { from: "#14110f", to: "#2c2622", ink: "#e8e2d6" },
    chapters: chapters(
      [
        "Letters from the Arctic",
        "A Childhood in Geneva",
        "The Spark of Life",
        "The Creature Awakens",
        "Flight from the Laboratory",
        "Return to Geneva",
        "The Creature's Tale",
        "A Plea for a Companion",
        "The Broken Promise",
        "Pursuit to the Pole",
      ],
      280
    ),
  },
  {
    id: "dracula",
    slug: "dracula",
    title: "Dracula",
    author: "Bram Stoker",
    authorBio:
      "Bram Stoker (1847–1912) was an Irish author best known today for his 1897 Gothic novel Dracula, which established many of the conventions of vampire fantasy fiction.",
    authorYears: "1847–1912",
    description:
      "When Jonathan Harker travels to Transylvania to finalize a property sale with the mysterious Count Dracula, he stumbles into a nightmare that will follow him home to England. Told through letters, diaries, and newspaper clippings, Dracula is a masterwork of atmosphere and dread — the definitive vampire novel and a landmark of Gothic horror.",
    category: "Classic",
    topics: ["Gothic Fiction", "Horror", "Epistolary Novel", "Victorian Literature"],
    publicationYear: 1897,
    language: "English",
    readingTimeMinutes: 480,
    pages: 418,
    isPublicDomain: true,
    rating: 4.7,
    quote: "We learn from failure, not from success!",
    palette: { from: "#3a0f12", to: "#5c1418", ink: "#f3ded9" },
    chapters: chapters(
      [
        "Jonathan Harker's Journal",
        "The Castle",
        "A Guest Unwelcome",
        "Mina's Letters",
        "The Demeter's Log",
        "Arrival in Whitby",
        "Lucy's Affliction",
        "Van Helsing Arrives",
        "The Hunt Begins",
        "Pursuit to Transylvania",
      ],
      418
    ),
  },
  {
    id: "alice-in-wonderland",
    slug: "alices-adventures-in-wonderland",
    title: "Alice's Adventures in Wonderland",
    author: "Lewis Carroll",
    authorBio:
      "Lewis Carroll was the pen name of Charles Lutwidge Dodgson (1832–1898), an English author, mathematician, and photographer, best remembered for his Alice books.",
    authorYears: "1832–1898",
    description:
      "Bored on a riverbank, Alice follows a white rabbit down a hole and tumbles into a world where logic bends, tea parties never end, and a Queen is always ready to demand a beheading. Playful, strange, and endlessly quotable, Alice's Adventures in Wonderland remains one of the most inventive works of English literature.",
    category: "Fiction",
    topics: ["Fantasy", "Children's Literature", "Nonsense Literature", "Victorian Literature"],
    publicationYear: 1865,
    language: "English",
    readingTimeMinutes: 180,
    pages: 96,
    isPublicDomain: true,
    rating: 4.4,
    quote: "We're all mad here.",
    palette: { from: "#0e3b3a", to: "#1c5c56", ink: "#e9f3ee" },
    chapters: chapters(
      [
        "Down the Rabbit-Hole",
        "The Pool of Tears",
        "A Caucus-Race",
        "The Rabbit Sends in a Little Bill",
        "Advice from a Caterpillar",
        "Pig and Pepper",
        "A Mad Tea-Party",
        "The Queen's Croquet-Ground",
        "The Mock Turtle's Story",
        "The Lobster Quadrille",
        "Who Stole the Tarts?",
        "Alice's Evidence",
      ],
      96
    ),
  },
  {
    id: "sherlock-holmes",
    slug: "the-adventures-of-sherlock-holmes",
    title: "The Adventures of Sherlock Holmes",
    author: "Arthur Conan Doyle",
    authorBio:
      "Sir Arthur Conan Doyle (1859–1930) was a British writer and physician, best known for his stories about the detective Sherlock Holmes, widely considered a milestone in crime fiction.",
    authorYears: "1859–1930",
    description:
      "Twelve of the finest short stories starring the world's most famous detective and his faithful companion Dr. Watson. From a scandal in Bohemia to a curious case of a red-headed man, each mystery showcases Holmes's astonishing gift for deduction — and Doyle's gift for the perfectly turned puzzle.",
    category: "Fiction",
    topics: ["Detective Fiction", "Mystery", "Short Stories", "Victorian Literature"],
    publicationYear: 1892,
    language: "English",
    readingTimeMinutes: 420,
    pages: 307,
    isPublicDomain: true,
    rating: 4.8,
    quote: "When you have eliminated the impossible, whatever remains, however improbable, must be the truth.",
    palette: { from: "#1a2436", to: "#2e3f5c", ink: "#e7ecf5" },
    chapters: chapters(
      [
        "A Scandal in Bohemia",
        "The Red-Headed League",
        "A Case of Identity",
        "The Boscombe Valley Mystery",
        "The Five Orange Pips",
        "The Man with the Twisted Lip",
        "The Blue Carbuncle",
        "The Speckled Band",
        "The Engineer's Thumb",
        "The Noble Bachelor",
      ],
      307
    ),
  },
  {
    id: "pride-and-prejudice",
    slug: "pride-and-prejudice",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    authorBio:
      "Jane Austen (1775–1817) was an English novelist known for her wit, social commentary, and mastery of free indirect speech, romantic fiction, and irony.",
    authorYears: "1775–1817",
    description:
      "Elizabeth Bennet has a quick wit and firmer opinions than are fashionable for a young woman of her station. When the wealthy, aloof Mr. Darcy arrives in the neighbourhood, the two clash — and then, slowly, reconsider. A comedy of manners about pride, prejudice, and the slow work of changing your mind.",
    category: "Classic",
    topics: ["Romance", "Comedy of Manners", "Regency Era", "Social Satire"],
    publicationYear: 1813,
    language: "English",
    readingTimeMinutes: 390,
    pages: 279,
    isPublicDomain: true,
    rating: 4.7,
    quote: "It is a truth universally acknowledged, that a single man in possession of a good fortune must be in want of a wife.",
    palette: { from: "#3d3320", to: "#5e5030", ink: "#f4ecd8" },
    chapters: chapters(
      [
        "A Single Man of Fortune",
        "The Netherfield Ball",
        "First Impressions",
        "Jane and Bingley",
        "Mr. Collins Proposes",
        "Elizabeth Refuses",
        "Darcy's Letter",
        "Pemberley",
        "Lydia's Elopement",
        "A Second Proposal",
      ],
      279
    ),
  },
  {
    id: "moby-dick",
    slug: "moby-dick",
    title: "Moby Dick",
    author: "Herman Melville",
    authorBio:
      "Herman Melville (1819–1891) was an American novelist and poet best known for Moby-Dick, a sprawling, philosophical account of a whaling voyage now considered a cornerstone of American literature.",
    authorYears: "1819–1891",
    description:
      "\"Call me Ishmael.\" So begins one of literature's great obsessive quests, as the whaling ship Pequod and its captain, the vengeful Ahab, chase the white whale that took his leg across the world's oceans. Part adventure, part philosophy, part encyclopedia of whaling, Moby-Dick is a vast, strange, unforgettable American epic.",
    category: "Classic Literature",
    topics: ["Adventure", "Philosophy", "American Literature", "Sea Fiction"],
    publicationYear: 1851,
    language: "English",
    readingTimeMinutes: 540,
    pages: 635,
    isPublicDomain: true,
    rating: 4.3,
    quote: "It is not down on any map; true places never are.",
    palette: { from: "#132330", to: "#1f3b4d", ink: "#e4eef2" },
    chapters: chapters(
      ["Loomings", "The Carpet-Bag", "The Spouter-Inn", "The Pequod", "Ahab", "The Chase"],
      635
    ),
  },
  {
    id: "walden",
    slug: "walden",
    title: "Walden",
    author: "Henry David Thoreau",
    authorBio:
      "Henry David Thoreau (1817–1862) was an American essayist, poet, and philosopher, best known for Walden, his reflection on simple living in natural surroundings.",
    authorYears: "1817–1862",
    description:
      "\"I went to the woods because I wished to live deliberately.\" Thoreau's account of two years spent in a small cabin by Walden Pond is part memoir, part manifesto — a patient, exacting argument for a life built around attention rather than accumulation.",
    category: "Philosophy",
    topics: ["Nature Writing", "Transcendentalism", "Memoir", "American Literature"],
    publicationYear: 1854,
    language: "English",
    readingTimeMinutes: 360,
    pages: 224,
    isPublicDomain: true,
    rating: 4.2,
    quote: "I went to the woods because I wished to live deliberately, to front only the essential facts of life.",
    palette: { from: "#20281c", to: "#37452b", ink: "#eef2e6" },
    chapters: chapters(
      ["Economy", "Where I Lived", "Reading", "Solitude", "Visitors", "The Ponds", "Spring", "Conclusion"],
      224
    ),
  },
  {
    id: "metamorphosis",
    slug: "the-metamorphosis",
    title: "The Metamorphosis",
    author: "Franz Kafka",
    authorBio:
      "Franz Kafka (1883–1924) was a German-speaking Bohemian novelist known for blending realism and the fantastic, exploring themes of alienation and absurdity.",
    authorYears: "1883–1924",
    description:
      "Gregor Samsa wakes one morning to find himself transformed into a giant insect. What follows is not a horror story but something stranger and sadder — a quiet, exact account of a family, and a self, coming apart.",
    category: "Fiction",
    topics: ["Absurdist Fiction", "Existentialism", "Novella", "German Literature"],
    publicationYear: 1915,
    language: "English",
    readingTimeMinutes: 120,
    pages: 55,
    isPublicDomain: true,
    rating: 4.3,
    quote: "As Gregor Samsa awoke one morning from uneasy dreams he found himself transformed.",
    palette: { from: "#231f1a", to: "#3e372c", ink: "#efe9dd" },
    chapters: chapters(["Part One", "Part Two", "Part Three"], 55),
  },
  {
    id: "art-of-war",
    slug: "the-art-of-war",
    title: "The Art of War",
    author: "Sun Tzu",
    authorBio:
      "Sun Tzu was an ancient Chinese military strategist and philosopher, traditionally credited as the author of The Art of War, an influential work of military strategy.",
    authorYears: "c. 5th century BC",
    description:
      "A concise, ancient treatise on strategy, deception, and the calculation of advantage — as often read today by executives and athletes as by soldiers. Thirteen short chapters distill a philosophy of conflict that rewards re-reading.",
    category: "Philosophy",
    topics: ["Strategy", "Military History", "Classical Philosophy", "Chinese Literature"],
    publicationYear: -500,
    language: "English",
    readingTimeMinutes: 90,
    pages: 60,
    isPublicDomain: true,
    rating: 4.5,
    quote: "The supreme art of war is to subdue the enemy without fighting.",
    palette: { from: "#3a0f0d", to: "#5c1a15", ink: "#f2ded7" },
    chapters: chapters(
      ["Laying Plans", "Waging War", "Attack by Stratagem", "Tactical Dispositions", "Energy", "Weaknesses and Strengths"],
      60
    ),
  },
  {
    id: "meditations",
    slug: "meditations",
    title: "Meditations",
    author: "Marcus Aurelius",
    authorBio:
      "Marcus Aurelius (121–180 AD) was Roman emperor from 161 to 180 and a practitioner of Stoic philosophy. His private notebook of reflections became one of the great works of Stoic thought.",
    authorYears: "121–180",
    description:
      "Never intended for publication, Meditations is the private notebook of a Roman emperor working out, sentence by sentence, how to be a good and steady person in a difficult world. Nearly two thousand years later, it remains one of the clearest guides to a disciplined mind.",
    category: "Philosophy",
    topics: ["Stoicism", "Classical Philosophy", "Ethics", "Roman History"],
    publicationYear: 180,
    language: "English",
    readingTimeMinutes: 300,
    pages: 254,
    isPublicDomain: true,
    rating: 4.7,
    quote: "You have power over your mind — not outside events. Realize this, and you will find strength.",
    palette: { from: "#2a2420", to: "#463c30", ink: "#f1e9db" },
    chapters: chapters(
      ["Book One", "Book Two", "Book Three", "Book Four", "Book Five", "Book Six"],
      254
    ),
  },
  {
    id: "brief-history-of-time",
    slug: "a-brief-history-of-time",
    title: "A Brief History of Time",
    author: "Stephen Hawking",
    authorBio:
      "Stephen Hawking (1942–2018) was an English theoretical physicist and cosmologist whose work on black holes and relativity reshaped modern physics.",
    authorYears: "1942–2018",
    description:
      "From the Big Bang to black holes, Hawking's landmark work explains the biggest questions in physics in plain, patient language — a book that made cosmology a subject for everyone, not just physicists.",
    category: "Science",
    topics: ["Cosmology", "Physics", "Popular Science"],
    publicationYear: 1988,
    language: "English",
    readingTimeMinutes: 330,
    pages: 256,
    isPublicDomain: false,
    rating: 4.6,
    quote: "We are just an advanced breed of primates on a minor planet of a very average star.",
    palette: { from: "#0b1c33", to: "#173257", ink: "#e6edf7" },
    chapters: chapters(
      ["Our Picture of the Universe", "Space and Time", "The Expanding Universe", "The Uncertainty Principle", "Black Holes", "The Origin of the Universe"],
      256
    ),
  },
  {
    id: "the-odyssey",
    slug: "the-odyssey",
    title: "The Odyssey",
    author: "Homer",
    authorBio:
      "Homer is the name traditionally given to the ancient Greek poet credited with composing the Iliad and the Odyssey, foundational works of Western literature.",
    authorYears: "c. 8th century BC",
    description:
      "Ten years after the fall of Troy, Odysseus is still trying to get home. Homer's epic of monsters, gods, and one very patient wife is the template for nearly every journey story that followed it.",
    category: "Classic Literature",
    topics: ["Epic Poetry", "Greek Mythology", "Adventure"],
    publicationYear: -800,
    language: "English",
    readingTimeMinutes: 480,
    pages: 374,
    isPublicDomain: true,
    rating: 4.5,
    quote: "Sing to me of the man, Muse, the man of twists and turns.",
    palette: { from: "#1c2a1e", to: "#33472f", ink: "#eaf0e6" },
    chapters: chapters(
      ["Athena Inspires the Prince", "The Cyclops", "Circe's Island", "The Land of the Dead", "The Sirens", "Return to Ithaca"],
      374
    ),
  },
  {
    id: "beyond-good-and-evil",
    slug: "beyond-good-and-evil",
    title: "Beyond Good and Evil",
    author: "Friedrich Nietzsche",
    authorBio:
      "Friedrich Nietzsche (1844–1900) was a German philosopher whose work on morality, culture, and the nature of truth had a profound influence on modern thought.",
    authorYears: "1844–1900",
    description:
      "A sustained, aphoristic assault on the philosophical assumptions of his time, Beyond Good and Evil finds Nietzsche at his sharpest — questioning morality, truth, and the philosophers who came before him.",
    category: "Philosophy",
    topics: ["Continental Philosophy", "Ethics", "German Literature"],
    publicationYear: 1886,
    language: "English",
    readingTimeMinutes: 300,
    pages: 240,
    isPublicDomain: true,
    rating: 4.1,
    quote: "He who fights with monsters should look to it that he himself does not become a monster.",
    palette: { from: "#241820", to: "#3c2635", ink: "#f0e3ea" },
    chapters: chapters(["Prejudices of Philosophers", "The Free Spirit", "The Religious Mood", "Maxims", "Natural History of Morals"], 240),
  },
  {
    id: "little-women",
    slug: "little-women",
    title: "Little Women",
    author: "Louisa May Alcott",
    authorBio:
      "Louisa May Alcott (1832–1888) was an American novelist best known for Little Women, drawn from her own childhood with her three sisters in Massachusetts.",
    authorYears: "1832–1888",
    description:
      "The March sisters — Meg, Jo, Beth, and Amy — grow up during and after the Civil War, each finding her own way through ambition, love, and loss. A warm, clear-eyed classic of American domestic fiction.",
    category: "Classic",
    topics: ["Coming of Age", "Family", "American Literature"],
    publicationYear: 1868,
    language: "English",
    readingTimeMinutes: 420,
    pages: 449,
    isPublicDomain: true,
    rating: 4.6,
    quote: "I am not afraid of storms, for I am learning how to sail my ship.",
    palette: { from: "#3a1f2b", to: "#5c3347", ink: "#f4e4ee" },
    chapters: chapters(["Playing Pilgrims", "A Merry Christmas", "The Laurence Boy", "Burdens", "Being Neighborly", "Beth Finds the Palace Beautiful"], 449),
  },
  {
    id: "the-republic",
    slug: "the-republic",
    title: "The Republic",
    author: "Plato",
    authorBio:
      "Plato (c. 428–348 BC) was a Greek philosopher, student of Socrates, and founder of the Academy in Athens, foundational to Western philosophy.",
    authorYears: "c. 428–348 BC",
    description:
      "What is justice, and can a just person be happy? Plato's Republic works through the question by imagining an ideal city — and along the way builds one of philosophy's most enduring arguments about the soul, the state, and the good life.",
    category: "Philosophy",
    topics: ["Classical Philosophy", "Political Theory", "Ethics", "Greek Literature"],
    publicationYear: -375,
    language: "English",
    readingTimeMinutes: 450,
    pages: 380,
    isPublicDomain: true,
    rating: 4.4,
    quote: "The heaviest penalty for declining to rule is to be ruled by someone inferior to yourself.",
    palette: { from: "#1a1a22", to: "#2e2e3d", ink: "#e6e6ef" },
    chapters: chapters(["Book I: Justice", "Book II: The City", "Book IV: The Virtues", "Book VII: The Cave", "Book X: The Poets"], 380),
  },
];

export const featuredBookIds = ["dorian-gray", "frankenstein", "dracula", "alice-in-wonderland"];
export const popularBookIds = ["moby-dick", "walden", "metamorphosis", "art-of-war", "meditations"];
export const recentlyAddedIds = ["brief-history-of-time", "the-odyssey", "beyond-good-and-evil", "little-women", "the-republic"];

export const categories: Category[] = [
  { id: "classic-literature", name: "Classic Literature", icon: "book-open", description: "Enduring works that shaped the canon", count: 128 },
  { id: "fiction", name: "Fiction", icon: "book-marked", description: "Novels and short stories", count: 214 },
  { id: "poetry", name: "Poetry", icon: "feather", description: "Verse across centuries and cultures", count: 76 },
  { id: "philosophy", name: "Philosophy", icon: "brain", description: "Ideas that ask the bigger questions", count: 94 },
  { id: "history", name: "History", icon: "landmark", description: "Accounts of how we got here", count: 61 },
  { id: "children's-books", name: "Children's Books", icon: "smile", description: "Stories for younger readers", count: 48 },
  { id: "science", name: "Science", icon: "flask-conical", description: "Discovery, explained clearly", count: 57 },
  { id: "education", name: "Education", icon: "graduation-cap", description: "Foundational texts and references", count: 39 },
];

export function getBookBySlug(slug: string) {
  return books.find((b) => b.slug === slug);
}

export function getBookById(id: string) {
  return books.find((b) => b.id === id);
}

export function findByIds(ids: string[]) {
  return ids.map((id) => getBookById(id)).filter((b): b is (typeof books)[number] => Boolean(b));
}

export function relatedBooks(book: Book, count = 4) {
  return books
    .filter((b) => b.id !== book.id && (b.category === book.category || b.topics.some((t) => book.topics.includes(t))))
    .slice(0, count);
}

export const currentUser = {
  name: "Amara Owusu",
  email: "amara.owusu@example.com",
  joined: "March 2024",
  booksRead: 24,
  currentlyReading: 3,
  readingStreak: 12,
  totalReadingHours: 86,
};

export const myShelfBooks = [
  { ...getBookById("dorian-gray")!, progress: 68, lastRead: "2h ago" },
  { ...getBookById("walden")!, progress: 45, lastRead: "Yesterday" },
  { ...getBookById("meditations")!, progress: 12, lastRead: "3 days ago" },
];

export const savedForLater = [
  getBookById("the-odyssey")!,
  getBookById("beyond-good-and-evil")!,
  getBookById("little-women")!,
];

export const recentlyFinished = [
  { ...getBookById("the-republic")!, finishedOn: "Mar 12" },
  { ...getBookById("metamorphosis")!, finishedOn: "Feb 28" },
  { ...getBookById("art-of-war")!, finishedOn: "Feb 15" },
];
