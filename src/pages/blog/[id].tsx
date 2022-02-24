import React from 'react'
import { client } from '../../libs/client'
import Head from 'next/head'
import { GetStaticPaths } from 'next'
import Layout from '../../components/Layout'

export default function BlogContent({ data, categories, tags }) {
  const { title, body, publishedAt, category } = data
  console.log(data)
  return (
    <Layout title={title} categories={categories} tags={tags}>
      <h1>{title}</h1>
      <p>{publishedAt}</p>
      <div
        dangerouslySetInnerHTML={{
          __html: `${body}`,
        }}
      />
      {category && <p>{category.name}</p>}
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await client.get({ endpoint: 'blog' })
  const paths: string[] = data.contents.map(
    //params:{id:content.id}でも可能
    (content: any) => `/blog/${content.id}`,
  )
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps = async (ctx) => {
  const { id } = ctx.params
  const data = await client.get({ endpoint: 'blog', contentId: id })
  const categoryData = await client.get({ endpoint: 'categories' })
  const tagData = await client.get({ endpoint: 'tags' })

  return {
    props: { data, categories: categoryData.contents, tags: tagData.contents },
  }
}
