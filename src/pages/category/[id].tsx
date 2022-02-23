import { Card, CardContent } from '@mui/material'
import _ from 'lodash'
import React from 'react'
import Layout from '../../components/Layout'
import { client } from '../../libs/client'

export default function CategoryId({ blog, categories }) {
  console.log(blog)
  return (
    <Layout categories={categories}>
      {_.isEmpty(blog) ? (
        <p>ページが見つかりませんでした。</p>
      ) : (
        blog.map((content) => (
          <Card key={content.id}>
            <CardContent></CardContent>
          </Card>
        ))
      )}
    </Layout>
  )
}

export const getStaticPaths = async () => {
  const data = await client.get({ endpoint: 'categories' })
  const paths = data.contents.map((content) => `/category/${content.id}`)

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps = async (ctx) => {
  const { id } = ctx.params
  //categoryIDと同じ記事を抽出
  const data = await client.get({
    endpoint: 'blog',
    queries: { filters: `category[equals]${id}` },
  })

  const categoryData = await client.get({ endpoint: 'categories' })
  return {
    props: { blog: data.contents, categories: categoryData.contents },
  }
}
