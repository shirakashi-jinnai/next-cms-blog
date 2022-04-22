import { GetStaticPaths, GetStaticProps } from 'next'
import { client } from '../libs/client'
import Layout from '../components/Layout'
import useStyles from '../styles/style'

export default function previewPage({
  blog,
  categories,
  tagData,
}: PageProps<BlogContent>) {
  if (!blog) {
    return <>下書きが見つかりませんでした。</>
  }
  const classes = useStyles()
  const { title, publishedAt, body, category } = blog

  return (
    <Layout categories={categories} tags={tagData}>
      <h1>{title} 現在プレビュー中...</h1>
      <p>{publishedAt}</p>
      <div
        className={classes.codeStyle}
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
  const slug: string | undefined = ctx.params?.slug
  const draftKey: string | undefined = ctx.previewData?.draftKey
  const categoryData: Contents<Category> = await client.get({
    endpoint: 'categories',
  })
  const tagData: Contents<Tag> = await client.get({ endpoint: 'tags' })

  const blog =
    slug !== 'undefined'
      ? await fetch(
          `https://hobby-blog.microcms.io/api/v1/blog/${slug}${
            draftKey !== undefined ? `?draftKey=${draftKey}` : ''
          }`,
          { headers: { 'X-MICROCMS-API-KEY': process.env.API_KEY || '' } },
        ).then((res) => res.json())
      : null
  return {
    props: {
      blog,
      tagData: tagData.contents,
      categories: categoryData.contents,
    },
  }
}
