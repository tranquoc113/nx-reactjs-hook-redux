import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import clsx from 'clsx';
import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import DrawerMobile from './drawer/DrawerMobile';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import DrawerDefalut from './drawer/DrawerDefault';
import AppBarLayout from './appBar/AppBarLayout';
const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
      color:'white'
    },
    hide: {
      display: 'none',
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  }),
);

export default function Layout({children}:any) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [holdDrawer, setHoldDrawer]=useState(false);

  const childRef = useRef<any>();

  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  const openDrawer=()=>{
    if(matches){
      setOpen(!open);
      setHoldDrawer(false);
    }else{
      setOpen(false);
      childRef.current.sayHi();
    }
  }
  const holdDrawerChange=()=>{
    setHoldDrawer(true);
  }
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        color="transparent"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={openDrawer}
            className={clsx(classes.menuButton, {
            })}
          >
            {
              open? <MenuIcon color="action"/>: <MenuIcon/>
            }

          </IconButton>
          <AppBarLayout />
        </Toolbar>
      </AppBar>

      {
        matches?
          <DrawerDefalut open={open}  triggerParentUpdate = {openDrawer} holdDrawer={holdDrawer} triggerHoldDrawer={holdDrawerChange}/>:
          <DrawerMobile ref={childRef} />
      }


      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Rhoncus dolor purus non enim praesent elementum
          facilisis leo vel. Risus at ultrices mi tempus imperdiet. Semper risus in hendrerit
          gravida rutrum quisque non tellus. Convallis convallis tellus id interdum velit laoreet id
          donec ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
          adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra nibh cras.
          Metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo quis
          imperdiet massa tincidunt. Cras tincidunt lobortis feugiat vivamus at augue. At augue eget
          arcu dictum varius duis at consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem
          donec massa sapien faucibus et molestie ac.
        </Typography>
        {children}
        <span>{`theme.breakpoints.up('sm') matches: ${matches}`}</span>


      </main>
    </div>
  );
}

