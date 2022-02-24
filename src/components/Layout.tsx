import {
  Container,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material'
import Head from 'next/head'
import { client } from '../libs/client'
import NextLink from 'next/link'
import Header from './Header'

type Layout = {
  title?: string
  description?: string
  children: any
  categories: any
}
export default function Layout({
  title = 'Memo-Blog',
  children,
  description,
  categories,
}: Layout) {
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
            <Typography>カテゴリー</Typography>

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

            <Typography>タグ</Typography>
            <Typography>人気の記事</Typography>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}
