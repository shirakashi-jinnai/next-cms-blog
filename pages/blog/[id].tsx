import React from 'react'
import { client } from '../../libs/client'
import Head from 'next/head'
import { GetStaticPaths } from 'next'

export default function BlogContent({ data }) {
  const { title, body, publishedAt, category } = data
  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      <h1>{title}</h1>
      <p>{publishedAt}</p>
      <div
        dangerouslySetInnerHTML={{
          __html: `${body}`,
        }}
      />
      <p>{category}</p>
    </div>
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

  return {
    props: { data },
  }
}
