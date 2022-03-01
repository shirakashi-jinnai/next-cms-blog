import {
  Divider,
  Grid,
  Link,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material'
import Head from 'next/head'
import Image from 'next/image'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import BlogCard from '../components/BlogCard'
import Layout from '../components/Layout'
import { client } from '../libs/client'

export default function Home({ blog, categories, tags }) {
  return (
    <Layout description="ホーム" categories={categories} tags={tags}>
      <Typography variant="h6" component="h1">
        記事一覧
      </Typography>
      {blog.map((content) => (
        <BlogCard key={content.id} content={content} />
      ))}
    </Layout>
  )
}

export const getStaticProps = async () => {
  const data = await client.get({ endpoint: 'blog' })
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
