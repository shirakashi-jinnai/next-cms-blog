import { Typography } from '@mui/material'
import BlogCard from '../components/BlogCard'
import Layout from '../components/Layout'
import { client } from '../libs/client'

export default function Home({
  blog,
  categories,
  tagData,
}: PageProps<BlogContent[]>) {
  return (
    <Layout
      description="普段の学習メモとして様々な記事を投稿しております。主にフロントエンド寄りの投稿をしています。"
      categories={categories}
      tags={tagData}
    >
      <Typography component="h1">記事一覧</Typography>
      {blog.map((content) => (
        <BlogCard key={content.id} content={content} />
      ))}
    </Layout>
  )
}

export const getStaticProps = async () => {
  const data: Contents<BlogContent> = await client.get({ endpoint: 'blog' })
  const categoryData: Contents<Category> = await client.get({
    endpoint: 'categories',
  })
  const tagData: Contents<Tag> = await client.get({ endpoint: 'tags' })
  return {
    props: {
      blog: data.contents,
      categories: categoryData.contents,
      tagData: tagData.contents,
    },
  }
}
