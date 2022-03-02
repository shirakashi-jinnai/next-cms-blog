import _ from 'lodash'
import React from 'react'
import NextLink from 'next/link'
import Layout from '../../components/Layout'
import { Typography } from '@mui/material'
import { client } from '../../libs/client'
import BlogCard from '../../components/BlogCard'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'

interface CategoryPageProps extends PageProps<BlogContent[]> {
  searchedCategory: Category
}

export default function CategoryId({
  blog,
  categories,
  tagData,
  searchedCategory,
}: CategoryPageProps) {
  return (
    <Layout categories={categories} tags={tagData}>
      <div style={{ display: 'flex' }}>
        <NextLink href={'/'} passHref>
          <Typography component="a">記事一覧</Typography>
        </NextLink>
        <ArrowForwardIosIcon fontSize="small" />
        <NextLink href={`/category/${searchedCategory.id}`} passHref>
          <Typography component="a">{searchedCategory.name}</Typography>
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
  const data: Contents<Category> = await client.get({
    endpoint: 'categories',
  })
  const paths = data.contents.map((content) => `/category/${content.id}`)

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps = async (ctx) => {
  const { id } = ctx.params
  //categoryIDと同じ記事を抽出
  const data: Contents<BlogContent> = await client.get({
    endpoint: 'blog',
    queries: { filters: `category[equals]${id}` },
  })
  const searchedCategory: Category = await client.get({
    endpoint: 'categories',
    contentId: id,
  })
  const tagData: Contents<Tag> = await client.get({ endpoint: 'tags' })
  const categoryData: Contents<Category> = await client.get({
    endpoint: 'categories',
  })
  return {
    props: {
      blog: data.contents,
      categories: categoryData.contents,
      tagData: tagData.contents,
      searchedCategory,
    },
  }
}
