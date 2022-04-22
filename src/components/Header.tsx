import React from 'react'
import Image from 'next/image'
import {
  AppBar,
  Toolbar,
  Typography,
  Theme,
  alpha,
  InputBase,
  TextField,
} from '@mui/material'
import { Box } from '@mui/system'
import SearchIcon from '@mui/icons-material/Search'
import logo from '../Img/logo.png'
import NextLink from 'next/link'
import { useContext, useState } from 'react'
import { useRouter } from 'next/router'
import useStyles from '../styles/style'

export default function Header() {
  const classes = useStyles()
  const [queries, setQueries] = useState<string>('')
  const router = useRouter()
  const submitHandler = (e) => {
    e.preventDefault()
    if (queries === '') {
      return
    }
    router.push(`/search?q=${queries}`)
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" color="inherit">
        <Toolbar>
          <NextLink href={'/'}>
            <Typography component="a" variant="h6" sx={{ cursor: 'pointer' }}>
              MEMO BLOG
            </Typography>
          </NextLink>
          <div style={{ flexGrow: 1 }} />
          <form className={classes.search} onSubmit={submitHandler}>
            <div className={classes.searchIconWrapper}>
              <SearchIcon />
            </div>
            <InputBase
              className={classes.styledInputBase}
              placeholder="Search Title"
              inputProps={{ 'aria-label': 'search' }}
              onChange={(e) => setQueries(e.target.value)}
            />
          </form>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
