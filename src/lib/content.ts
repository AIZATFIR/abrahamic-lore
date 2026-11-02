import type { Tradition } from '@/types'

export const TRADITION_LABELS: Record<string, string> = {
  islam: 'Islam',
  christianity: 'Christianity',
  judaism: 'Judaism',
  other: 'Other Abrahamic Tradition',
  multiple: 'Exploring Multiple Traditions',
  educational: 'Educational Exploration',
  undisclosed: 'Prefer Not to Say',
}

export const HERO_CONTENT: Record<string, { headline: string; description: string }> = {
  islam: {
    headline: 'Discover the World of Islam',
    description:
      "Explore the Quran, Islamic history, theology, the prophets, and the traditions that have shaped one of the world's great civilizations.",
  },
  christianity: {
    headline: 'Discover the World of Christianity',
    description:
      'Explore biblical narratives, Christian traditions, influential figures, theology, and the historical connections that shaped Christianity.',
  },
  judaism: {
    headline: 'Discover the World of Judaism',
    description:
      'Explore Jewish scripture, traditions, history, theology, and the interpretations that have sustained a living tradition across millennia.',
  },
  multiple: {
    headline: 'Explore Across Traditions',
    description:
      'A shared space to discover how Judaism, Christianity, and Islam are connected through history, scripture, and the stories they tell.',
  },
  educational: {
    headline: 'Explore the Abrahamic World',
    description:
      'Study the religions, histories, texts, and traditions that trace their roots to the same ancient source.',
  },
  default: {
    headline: 'Explore the Abrahamic World',
    description:
      'One environment to discover Judaism, Christianity, Islam, and the traditions, histories, and wisdom they carry.',
  },
}

export function getHeroContent(tradition: Tradition | null) {
  if (!tradition) return HERO_CONTENT.default
  return HERO_CONTENT[tradition] ?? HERO_CONTENT.default
}

export const TOPIC_CARDS = [
  {
    id: 'sacred-texts',
    title: 'Sacred Texts',
    description: 'The scriptures at the heart of each tradition — their origins, structure, and significance.',
    category: 'Foundations',
    icon: '📖',
    slug: 'sacred-texts',
  },
  {
    id: 'prophets-figures',
    title: 'Prophets & Figures',
    description: 'The messengers, leaders, and individuals whose lives shaped religious history.',
    category: 'People',
    icon: '🕊️',
    slug: 'prophets-figures',
  },
  {
    id: 'creation-origins',
    title: 'Creation & Origins',
    description: 'How each tradition understands the beginning of the world and humanity.',
    category: 'Theology',
    icon: '🌅',
    slug: 'creation-origins',
  },
  {
    id: 'religious-history',
    title: 'Religious History',
    description: 'The historical development of Abrahamic faiths from ancient times to today.',
    category: 'History',
    icon: '🏛️',
    slug: 'religious-history',
  },
  {
    id: 'theology-beliefs',
    title: 'Theology & Beliefs',
    description: 'Core doctrines, concepts of God, and the theological ideas that define each tradition.',
    category: 'Theology',
    icon: '✡️',
    slug: 'theology-beliefs',
  },
  {
    id: 'traditions-practices',
    title: 'Traditions & Practices',
    description: 'The rituals, observances, and practices that give religious life its rhythm.',
    category: 'Practice',
    icon: '🕌',
    slug: 'traditions-practices',
  },
  {
    id: 'sacred-places',
    title: 'Sacred Places',
    description: 'The holy cities, temples, mosques, and sites that anchor religious geography.',
    category: 'Geography',
    icon: '🕍',
    slug: 'sacred-places',
  },
  {
    id: 'stories-narratives',
    title: 'Stories & Narratives',
    description: 'The foundational stories told across traditions — their meanings and their differences.',
    category: 'Narrative',
    icon: '📜',
    slug: 'stories-narratives',
  },
  {
    id: 'shared-themes',
    title: 'Differences & Shared Themes',
    description: 'What connects the traditions, what sets them apart, and why the distinctions matter.',
    category: 'Comparative',
    icon: '🔗',
    slug: 'shared-themes',
  },
]

export const FEATURED_COMPARISONS = [
  {
    id: 'abraham-traditions',
    title: 'Abraham in Different Traditions',
    description:
      'Ibrahim, Avraham, and Abraham — one figure, three traditions, distinct meanings.',
    traditions: ['islam', 'judaism', 'christianity'] as Tradition[],
    slug: 'abraham-traditions',
  },
  {
    id: 'moses-musa',
    title: 'Moses / Moshe / Musa',
    description:
      'Lawgiver of Israel, predecessor of Christ, and Kalimullah who spoke to God directly.',
    traditions: ['islam', 'judaism', 'christianity'] as Tradition[],
    slug: 'moses-musa',
  },
  {
    id: 'jesus-isa',
    title: 'Jesus / Yeshua / Isa',
    description:
      'Messiah, Son of God, and honored prophet: comparing Christology and Tawhid.',
    traditions: ['islam', 'christianity', 'judaism'] as Tradition[],
    slug: 'jesus-isa',
  },
  {
    id: 'sacred-texts-differ',
    title: 'How Sacred Texts Differ',
    description:
      'The Quran, Bible, and Torah — their origins, structure, authority, and use across traditions.',
    traditions: ['islam', 'christianity', 'judaism'] as Tradition[],
    slug: 'sacred-texts-differ',
  },
  {
    id: 'concept-covenant',
    title: 'The Concept of Covenant (Brit & Mithaq)',
    description:
      'Divine promises, mutual bonds, and universal redemption across three traditions.',
    traditions: ['islam', 'judaism', 'christianity'] as Tradition[],
    slug: 'concept-covenant',
  },
  {
    id: 'creation-and-fall',
    title: 'Creation, Adam & Human Origins',
    description:
      'Original Sin vs. Fitrah: how humanity’s beginnings and nature are understood.',
    traditions: ['islam', 'christianity', 'judaism'] as Tradition[],
    slug: 'creation-and-fall',
  },
  {
    id: 'shared-figures',
    title: 'Shared Figures, Distinct Interpretations',
    description:
      'Noah, Joseph, David, Solomon, and Mary across biblical and Quranic lenses.',
    traditions: ['islam', 'christianity', 'judaism'] as Tradition[],
    slug: 'shared-figures',
  },
  {
    id: 'historical-connections',
    title: 'Historical Connections & Encounters',
    description:
      'How the three religions emerged, interacted, diverged, and shaped world history together.',
    traditions: ['islam', 'christianity', 'judaism'] as Tradition[],
    slug: 'historical-connections',
  },
]
