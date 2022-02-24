import React from 'react'
import Image from 'next/image'
import {
  AppBar,
  Toolbar,
  Typography,
  Theme,
  alpha,
  InputBase,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import { Box } from '@mui/system'
import SearchIcon from '@mui/icons-material/Search'
import logo from '../Img/logo.png'
import NextLink from 'next/link'

const useStyles = makeStyles((theme: Theme) => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.black, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.black, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIconWrapper: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  styledInputBase: {
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  },
}))

export default function Header() {
  const classes = useStyles()
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" color="inherit">
        <Toolbar>
          {/* <Image src={logo} width={150} height={150} /> */}
          <NextLink href={'/'}>
            <Typography component="a" variant="h6" sx={{ cursor: 'pointer' }}>
              MEMO BLOG
            </Typography>
          </NextLink>
          <div style={{ flexGrow: 1 }} />
          <div className={classes.search}>
            <div className={classes.searchIconWrapper}>
              <SearchIcon />
            </div>
            <InputBase
              className={classes.styledInputBase}
              placeholder="Search..."
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  )
}