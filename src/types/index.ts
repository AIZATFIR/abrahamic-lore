export type Tradition = 'islam' | 'christianity' | 'judaism' | 'other' | 'multiple' | 'educational' | 'undisclosed'

export interface UserPreferences {
  tradition: Tradition | null
  onboardingCompleted: boolean
  learningInterests: string[]
}

export interface UserProfile {
  id: string
  displayName: string | null
  religionPreference: Tradition | null
  learningPreferences: string[]
  onboardingCompleted: boolean
  createdAt: string
  updatedAt: string
}

export interface TopicCard {
  id: string
  title: string
  description: string
  category: string
  tradition?: Tradition
  icon: string
  slug: string
}

export interface FeaturedComparison {
  id: string
  title: string
  description: string
  traditions: Tradition[]
  slug: string
}

export interface WorkspaceTab {
  id: string
  title: string
  type: 'search' | 'read' | 'compare' | 'timeline'
  url: string
  scrollPosition?: number
  pinned?: boolean
}
