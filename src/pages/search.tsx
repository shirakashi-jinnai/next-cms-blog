import _ from 'lodash'
import React from 'react'
import Layout from '../components/Layout'
import { client } from '../libs/client'
import BlogCard from '../components/BlogCard'
import { Typography } from '@mui/material'

export default function searchPage({ blog, categories, tags }) {
  return (
    <Layout categories={categories} tags={tags}>
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

export const getServerSideProps = async (ctx) => {
  const { q } = ctx.query
  const data = await client.get({
    endpoint: 'blog',
    queries: { filters: `title[contains]${q}` },
  })
  const categoryData = await client.get({ endpoint: 'categories' })
  const tagData = await client.get({ endpoint: 'tags' })
  return {
    props: {
      blog: data.contents,
      categories: categoryData.contents,
      tags: tagData.contents,
    },
  }
}
