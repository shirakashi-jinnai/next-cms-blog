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
import { makeStyles } from '@mui/styles'
import { Theme } from '@mui/system'

const useStyles = makeStyles((theme: Theme) => ({
  sideMenu: {
    margin: '10px 0',
  },
  sideMenuText: {
    background: alpha(theme.palette.common.black, 0.05),
    borderRadius: 5,
  },
}))

type Layout = {
  title?: string
  description?: string
  children: any
  categories: any[]
  tags: any[]
}

export default function Layout({
  title = 'Memo-Blog',
  children,
  description,
  categories,
  tags,
}: Layout) {
  const classes = useStyles()
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        {description && <meta name="description" content={description} />}
      </Head>
      <Header />
      <Container maxWidth="lg" style={{ marginTop: 100 }}>
        <Grid container spacing={5}>
          <Grid item md={9}>
            {children}
          </Grid>
          <Grid item md={3}>
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

            <Typography>人気の記事</Typography>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}
