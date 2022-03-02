import React from 'react'
import NextLink from 'next/link'
import { client } from '../../libs/client'
import { GetStaticPaths } from 'next'
import Layout from '../../components/Layout'
import { DateTime } from 'luxon'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import Image from 'next/image'
import { makeStyles } from '@mui/styles'
import { Chip } from '@mui/material'
import LocalOfferIcon from '@mui/icons-material/LocalOffer'

const useStyles = makeStyles((theme) => ({
  imgStyle: {
    objectFit: 'contain',
  },
}))

export default function BlogContent({ data, categories, tagData }) {
  const classes = useStyles()
  const { title, body, publishedAt, category, tags, thumbnail } = data
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
        <div>
          <AccessTimeIcon />
        </div>
        {year}/{month}/{day}
      </p>
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
    props: {
      data,
      categories: categoryData.contents,
      tagData: tagData.contents,
    },
  }
}
