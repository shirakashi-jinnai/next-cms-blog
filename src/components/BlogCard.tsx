import React from 'react'
import { DateTime } from 'luxon'
import { Card, CardContent, Chip, Typography } from '@mui/material'
import Image from 'next/image'
import { Box, Theme } from '@mui/system'
import NextLink from 'next/link'
import LocalOfferIcon from '@mui/icons-material/LocalOffer'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import useStyles from '../styles/style'

export default function BlogCard({ content }: { content: BlogContent }) {
  const classes = useStyles()
  const { id, thumbnail, title, category, tags, publishedAt } = content
  const { year, month, day } = DateTime.fromISO(publishedAt)
  return (
    <NextLink href={`/blog/${id}`} passHref>
      <Card className={classes.blogCard} component="a">
        <Image
          src={thumbnail ? thumbnail.url : '/noImage.svg'}
          alt="サムネイル画像"
          objectFit="contain"
          width={300}
          height={169}
        />

        <CardContent>
          <Typography component="div" variant="h5">
            {title}
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
            {category && (
              <Chip
                className={classes.chipPointer}
                color="primary"
                label={content.category.name}
              />
            )}
            {tags &&
              tags.map((tag) => (
                <Chip
                  className={classes.chipPointer}
                  key={tag.id}
                  icon={<LocalOfferIcon />}
                  label={tag.tag}
                />
              ))}
          </Box>

          <p style={{ display: 'flex' }}>
            <AccessTimeIcon />
            {year}/{month}/{day}
          </p>
        </CardContent>
      </Card>
    </NextLink>
  )
}
