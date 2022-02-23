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
import Layout from '../components/Layout'
import { client } from '../libs/client'

export default function Home({ blog, categories }) {
  return (
    <Layout description="ホーム" categories={categories}>
      <Typography variant="h4" component={'h1'}>
        記事一覧
      </Typography>
      <List>
        {blog.map((content) => (
          <ListItem key={content.id}>
            <NextLink href={`/blog/${content.id}`}>
              <a>{content.title}</a>
            </NextLink>
          </ListItem>
        ))}
      </List>
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
