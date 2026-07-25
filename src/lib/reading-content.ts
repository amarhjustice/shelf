const paragraphSets: string[][] = [
  [
    "The room was quiet in the particular way old rooms are quiet, thick with the settled dust of other people's attention. Light came in low through the west window and lay across the floorboards like something poured rather than shone.",
    "It had taken longer than expected to find the right words for what had happened, and even now the right words felt provisional — placeholders for an understanding that hadn't fully arrived. There was a comfort in writing it down anyway, in trusting that the shape of the sentence might eventually catch up to the shape of the feeling.",
    "Outside, the ordinary business of the street continued: a cart, a voice calling someone home, the long hinge-creak of a door two houses down. None of it asked to be noticed, and so, of course, it was noticed completely.",
  ],
  [
    "There is a particular kind of silence that follows a decision — not the silence of absence, but of things rearranging themselves to make room for what comes next. It was into this silence that the letter arrived, unremarkable in its envelope, entirely remarkable in what it asked.",
    "\"You must understand,\" the voice said, with the patience of someone who has explained this before, \"that certainty is rarely the reward for careful thought. More often it is the reward for stopping to think.\" This did not, in the moment, feel like comfort.",
    "And yet there was something to be done with the discomfort — a use for it, the way a strong wind can still be made to turn a mill. The work, then, was not to wait for the feeling to pass, but to build something that could stand while it did.",
  ],
  [
    "Morning arrived the way it always did in that part of the country: reluctantly, and then all at once, the grey giving way to a startling clarity that made the previous night's worries look smaller than they had felt at two in the morning.",
    "The path down to the water had not changed in years, though the trees along it had grown enough to change the quality of the shade. Some things insist on remaining themselves regardless of what has happened around them, and there is a kind of instruction in that, if one is willing to receive it.",
    "By the time the kettle had boiled, most of the difficult questions had softened into something more like curiosity than dread — not resolved, exactly, but no longer standing quite so squarely in the doorway.",
  ],
];

export function chapterParagraphs(seed: number): string[] {
  const base = paragraphSets[seed % paragraphSets.length];
  const extra = paragraphSets[(seed + 1) % paragraphSets.length];
  return [...base, ...extra.slice(0, 2)];
}
