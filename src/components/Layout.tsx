import {
  Container,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Chip,
  alpha,
} from '@mui/material'
import Head from 'next/head'
import { client } from '../libs/client'
import NextLink from 'next/link'
import Header from './Header'
import LocalOfferIcon from '@mui/icons-material/LocalOffer'
import { Theme } from '@mui/system'
import useStyles from '../styles/style'

type Layout = {
  title?: string
  description?: string
  image?: string
  children: any
  categories: Category[]
  tags: Tag[]
}

export default function Layout({
  title = 'Memo-Blog',
  children,
  description,
  image = '/logo.png',
  categories,
  tags,
}: Layout) {
  const classes = useStyles()
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, user-scalable=no, minimum-scale=1, maximum-scale=1"
        />
        {description && <meta name="description" content={description} />}
        <meta property="og:image" content={image} />
      </Head>
      <Header />
      <Container maxWidth="lg" style={{ marginTop: 100 }}>
        <Grid container spacing={5}>
          <Grid item md={9} xs={12}>
            {children}
          </Grid>
          <Grid item md={3} xs={12}>
            <div>
              <Typography variant="h6" className={classes.sideMenuText}>
                カテゴリー
              </Typography>
              <List>
                {categories.map((category) => (
                  <div key={category.id}>
                    <NextLink href={`/category/${category.id}`} passHref>
                      <ListItem key={category.id} component="a">
                        <ListItemText>{category.name}</ListItemText>
                      </ListItem>
                    </NextLink>
                    <Divider />
                  </div>
                ))}
              </List>
            </div>

            <div>
              <Typography variant="h6" className={classes.sideMenuText}>
                タグ
              </Typography>
              <List style={{ display: 'flex', flexWrap: 'wrap' }}>
                {tags.map((tag) => (
                  <div key={tag.id}>
                    <NextLink href={`/tag/${tag.id}`} passHref>
                      <Chip
                        icon={<LocalOfferIcon />}
                        component="a"
                        label={tag.tag}
                      />
                    </NextLink>
                  </div>
                ))}
              </List>
            </div>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}
