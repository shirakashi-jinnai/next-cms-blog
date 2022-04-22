import { alpha, Theme } from '@mui/material'
import { makeStyles } from '@mui/styles'

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
    // pointerEvents: 'none',
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

  imgStyle: {
    objectFit: 'contain',
  },
  codeStyle: {
    '& $pre': {
      background: '#1d1f21',
      borderRadius: 5,
      padding: 10,
    },
    '& $code': {
      color: '#c5c8c6',
      fontFamily: 'Source Code Pro',
      background: '#1d1f21',
      padding: 5,
      borderRadius: 5,
    },
  },

  sideMenu: {
    margin: '10px 0',
  },
  sideMenuText: {
    background: alpha(theme.palette.common.black, 0.05),
    borderRadius: 5,
  },

  blogCard: {
    marginBottom: '20px',
    display: 'flex',
    textDecoration: 'none',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },

  chipPointer: {
    cursor: 'pointer',
  },
}))

export default useStyles
