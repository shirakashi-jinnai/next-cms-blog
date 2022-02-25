import _ from 'lodash'
import React, { Component } from 'react'
import NextLink from 'next/link'
import Image from 'next/image'
import Layout from '../../components/Layout'
import { Card, CardContent, Typography } from '@mui/material'
import { client } from '../../libs/client'
import noImage from '../../Img/noImage.jpg'
import { Box } from '@mui/system'
import StyleIcon from '@mui/icons-material/Style'
import { makeStyles } from '@mui/styles'
import BlogCard from '../../components/BlogCard'

export default function CategoryId({ blog, categories, tags }) {
  return (
    <Layout categories={categories} tags={tags}>
      {_.isEmpty(blog) ? (
        <p>ページが見つかりませんでした。</p>
      ) : (
        blog.map((content) => <BlogCard content={content} key={content.id} />)
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

  const tagData = await client.get({ endpoint: 'tags' })
  const categoryData = await client.get({ endpoint: 'categories' })
  return {
    props: {
      blog: data.contents,
      categories: categoryData.contents,
      tags: tagData.contents,
    },
  }
}
