import _ from 'lodash'
import React from 'react'
import Layout from '../components/Layout'
import { client } from '../libs/client'
import BlogCard from '../components/BlogCard'
import { Typography } from '@mui/material'
import { GetServerSideProps } from 'next'

export default function searchPage({
  blog,
  categories,
  tagData,
}: PageProps<BlogContent[]>) {
  return (
    <Layout categories={categories} tags={tagData}>
      <Typography variant="h6" component="h1">
        検索結果
      </Typography>
      {_.isEmpty(blog) ? (
        <p>記事がありません</p>
      ) : (
        blog.map((content) => <BlogCard key={content.id} content={content} />)
      )}
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { q }: any = ctx.query
  const data: Contents<BlogContent> = await client.get({
    endpoint: 'blog',
    queries: { filters: `title[contains]${q}` },
  })
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
