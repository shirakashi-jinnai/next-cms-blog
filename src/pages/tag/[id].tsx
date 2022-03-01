import { Typography } from '@mui/material'
import _ from 'lodash'
import React from 'react'
import BlogCard from '../../components/BlogCard'
import Layout from '../../components/Layout'
import { client } from '../../libs/client'
import NextLink from 'next/link'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'

export default function tagContent({ blog, categories, tags, searchedTag }) {
  return (
    <Layout categories={categories} tags={tags}>
      <div style={{ display: 'flex' }}>
        <NextLink href={'/'} passHref>
          <Typography component="a">記事一覧</Typography>
        </NextLink>
        <ArrowForwardIosIcon fontSize="small" />
        <NextLink href={`/tag/${searchedTag.id}`} passHref>
          <Typography component="a">{searchedTag.tag}</Typography>
        </NextLink>
      </div>

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
  const searchedTag = await client.get({ endpoint: 'tags', contentId: id })
  const categoryData = await client.get({ endpoint: 'categories' })
  const tagData = await client.get({ endpoint: 'tags' })
  return {
    props: {
      blog: data.contents,
      categories: categoryData.contents,
      tags: tagData.contents,
      searchedTag,
    },
  }
}
