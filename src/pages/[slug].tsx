import { GetStaticPaths } from 'next'
import { client } from '../libs/client'
import Layout from '../components/Layout'

export default function slugPage({ content, categories, tags }) {
  const { title, publishedAt, body, category } = content

  if (!content) {
    return <>下書きが見つかりませんでした。</>
  }

  return (
    <Layout categories={categories} tags={tags}>
      <h1>{title} 現在プレビュー中...</h1>
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
    (content: any) => `/${content.slug}`,
  )
  return {
    paths,
    fallback: true,
  }
}

export const getStaticProps = async (ctx) => {
  const slug = ctx.params?.slug
  const draftKey = ctx.previewData?.draftKey
  const categoryData = await client.get({ endpoint: 'categories' })
  const tagData = await client.get({ endpoint: 'tags' })
  const content = await fetch(
    `https://hobby-blog.microcms.io/api/v1/blog/${slug}${
      draftKey !== undefined ? `?draftKey=${draftKey}` : ''
    }`,
    { headers: { 'X-MICROCMS-API-KEY': process.env.API_KEY || '' } },
  ).then((res) => res.json())
  return {
    props: {
      content,
      tags: tagData.contents,
      categories: categoryData.contents,
    },
  }
}
