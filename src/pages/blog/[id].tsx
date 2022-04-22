import React from 'react'
import NextLink from 'next/link'
import { client } from '../../libs/client'
import { GetStaticPaths, GetStaticProps } from 'next'
import Layout from '../../components/Layout'
import { DateTime } from 'luxon'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import Image from 'next/image'
import { Chip } from '@mui/material'
import LocalOfferIcon from '@mui/icons-material/LocalOffer'
import useStyles from '../../styles/style'

export default function BlogContent({
  blog,
  categories,
  tagData,
}: PageProps<BlogContent>) {
  const classes = useStyles()
  const { title, body, publishedAt, category, tags, thumbnail } = blog
  const imgUrl = thumbnail ? thumbnail.url : '/noImage.svg'
  const { year, month, day } = DateTime.fromISO(publishedAt)
  return (
    <Layout title={title} categories={categories} tags={tagData} image={imgUrl}>
      <Image
        src={imgUrl}
        alt="サムネイル画像"
        width={1000}
        height={562}
        className={classes.imgStyle}
      />
      <h1>{title}</h1>
      <div>
        {category && (
          <NextLink
            key={category.id}
            href={`/category/${category.id}`}
            passHref
          >
            <Chip label={category.name} color="primary" component="a" />
          </NextLink>
        )}

        {tags &&
          tags.map((tag) => (
            <NextLink key={tag.id} href={`/tag/${tag.id}`} passHref>
              <Chip icon={<LocalOfferIcon />} label={tag.tag} component="a" />
            </NextLink>
          ))}
      </div>
      <p style={{ display: 'flex' }}>
        <AccessTimeIcon />
        {year}/{month}/{day}
      </p>
      <div
        className={classes.codeStyle}
        dangerouslySetInnerHTML={{
          __html: `${body}`,
        }}
      />
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const data: Contents<BlogContent> = await client.get({ endpoint: 'blog' })
  const paths: string[] = data.contents.map(
    //params:{id:content.id}でも可能
    (content) => `/blog/${content.id}`,
  )
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { id }: any = ctx.params
  const blog: BlogContent = await client.get({
    endpoint: 'blog',
    contentId: id,
  })
  const categoryData: Contents<Category> = await client.get({
    endpoint: 'categories',
  })
  const tagData: Contents<Tag> = await client.get({ endpoint: 'tags' })

  return {
    props: {
      blog,
      categories: categoryData.contents,
      tagData: tagData.contents,
    },
  }
}
