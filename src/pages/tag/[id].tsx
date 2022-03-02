import { Typography } from '@mui/material'
import _ from 'lodash'
import React from 'react'
import BlogCard from '../../components/BlogCard'
import Layout from '../../components/Layout'
import { client } from '../../libs/client'
import NextLink from 'next/link'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { GetStaticProps, GetStaticPaths } from 'next'

interface TagPageProps extends PageProps<BlogContent[]> {
  searchedTag: Tag
}

export default function tagContent({
  blog,
  categories,
  tagData,
  searchedTag,
}: TagPageProps) {
  return (
    <Layout categories={categories} tags={tagData}>
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

export const getStaticPaths: GetStaticPaths = async () => {
  const tagData: Contents<Tag> = await client.get({ endpoint: 'tags' })
  const paths: string[] = tagData.contents.map((tag) => `/tag/${tag.id}`)
  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { id }: any = ctx.params
  const data = await client.get({
    endpoint: 'blog',
    queries: { filters: `tags[contains]${id}` },
  })
  const searchedTag: Tag = await client.get({ endpoint: 'tags', contentId: id })
  const categoryData: Contents<Category> = await client.get({
    endpoint: 'categories',
  })
  const tagData: Contents<Tag> = await client.get({ endpoint: 'tags' })
  return {
    props: {
      blog: data.contents,
      categories: categoryData.contents,
      tagData: tagData.contents,
      searchedTag,
    },
  }
}
