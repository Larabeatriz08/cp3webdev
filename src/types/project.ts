export interface Project {
  id: number
  name: string
  slug: string
  description: string | null
  language: string | null
  updatedAt: string
  htmlUrl: string
  homepage: string | null
  topics: string[]
  stars: number
}
