import _ from 'lodash'
import React from 'react'
import BlogCard from '../../components/BlogCard'
import Layout from '../../components/Layout'
import { client } from '../../libs/client'

export default function tagContent({ blog, categories, tags }) {
  return (
    <Layout categories={categories} tags={tags}>
      {_.isEmpty(blog) ? (
        <p>ページが見つかりませんでした。</p>
      ) : (
        blog.map((content) => <BlogCard content={content} key={content.id} />)
      )}
    </Layout>
  )
}

export const getStaticPaths = async () => {
  const tagData = await client.get({ endpoint: 'tags' })
  const paths = tagData.contents.map((tag) => `/tag/${tag.id}`)
  return { paths, fallback: false }
}

export const getStaticProps = async (ctx) => {
  const { id } = ctx.params
  const data = await client.get({
    endpoint: 'blog',
    queries: { filters: `tags[contains]${id}` },
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
