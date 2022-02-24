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
import BlogCard from '../components/BlogCard'
import Layout from '../components/Layout'
import { client } from '../libs/client'

export default function Home({ blog, categories }) {
  return (
    <Layout description="ホーム" categories={categories}>
      <Typography variant="h4" component={'h1'}>
        記事一覧
      </Typography>
      {blog.map((content) => (
        <BlogCard content={content} />
      ))}
    </Layout>
  )
}

export const getStaticProps = async () => {
  const data = await client.get({ endpoint: 'blog' })
  const categoryData = await client.get({ endpoint: 'categories' })
  return {
    props: { blog: data.contents, categories: categoryData.contents },
  }
}
