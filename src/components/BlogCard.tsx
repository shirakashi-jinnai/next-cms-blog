import React from 'react'
import { Card, CardContent, Chip, Typography } from '@mui/material'
import Image from 'next/image'
import { Box } from '@mui/system'
import { makeStyles } from '@mui/styles'
import NextLink from 'next/link'
import noImage from '../Img/noImage.jpg'
import LocalOfferIcon from '@mui/icons-material/LocalOffer'

const useStyles = makeStyles({
  blogCard: {
    marginBottom: '20px',
    display: 'flex',
    cursor: 'pointer',
  },

  chipPointer: {
    cursor: 'pointer',
  },
})

export default function BlogCard({ content }) {
  const classes = useStyles()
  return (
    <NextLink href={`/blog/${content.id}`}>
      <Card className={classes.blogCard} component="a">
        <Image
          src={content.thumbnail ? content.thumbnail.url : noImage}
          alt="サムネイル画像"
          width={250}
          height={250}
        />

        <CardContent style={{ width: '100%' }}>
          <Typography component="div" variant="h5">
            {content.title}
          </Typography>
          <Box sx={{ display: 'flex' }}>
            {content.category && (
              <Chip
                className={classes.chipPointer}
                color="primary"
                label={content.category.name}
              />
            )}
            {content.tags &&
              content.tags.map((tag) => (
                <Chip
                  className={classes.chipPointer}
                  key={tag.id}
                  icon={<LocalOfferIcon />}
                  label={tag.tag}
                />
              ))}
          </Box>
        </CardContent>
      </Card>
    </NextLink>
  )
}
