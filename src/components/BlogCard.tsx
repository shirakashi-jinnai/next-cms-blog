import React from 'react'
import { DateTime } from 'luxon'
import { Card, CardContent, Chip, Typography } from '@mui/material'
import Image from 'next/image'
import { Box } from '@mui/system'
import { makeStyles } from '@mui/styles'
import NextLink from 'next/link'
import noImage from '../Img/noImage.svg'
import LocalOfferIcon from '@mui/icons-material/LocalOffer'
import AccessTimeIcon from '@mui/icons-material/AccessTime'

const useStyles = makeStyles({
  blogCard: {
    marginBottom: '20px',
    display: 'flex',
    textDecoration: 'none',
  },

  chipPointer: {
    cursor: 'pointer',
  },
  imgStyle: {
    objectFit: 'cover',
  },
})

export default function BlogCard({ content }) {
  const classes = useStyles()
  const { id, thumbnail, title, category, tags, publishedAt } = content
  const { year, month, day } = DateTime.fromISO(publishedAt)
  return (
    <NextLink href={`/blog/${id}`} passHref>
      <Card className={classes.blogCard} component="a">
        <Image
          className={classes.imgStyle}
          src={thumbnail ? thumbnail.url : noImage}
          alt="サムネイル画像"
          width={300}
          height={250}
        />

        <CardContent style={{ width: '100%' }}>
          <Typography component="div" variant="h5">
            {title}
          </Typography>
          <Box sx={{ display: 'flex' }}>
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
