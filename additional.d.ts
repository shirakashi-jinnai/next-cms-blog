type BlogContent = {
  id: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  revisedAt: string
  title?: string
  thumbnail?: Thumbnail
  body?: HTMLBodyElement
  category?: Category
  tags?: Tag[]
}

type Contents<T> = {
  contents: T[]
}

interface PageProps<T> {
  blog: T
  categories: Category[]
  tagData: Tag[]
}

type Thumbnail = {
  url: string
  height: number
  width: number
}

type Category = {
  id: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  revisedAt: string
  name: string
}

type Tag = {
  id: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  revisedAt: string
  tag: string
}
