// import styles from './app.module.scss';
import React from 'react';
import { decrement, increment } from '@mycloudfly/redux';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import 'antd/dist/antd.css';
import './layout.scss';
import { Layout, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import { useState } from 'react';
import logo from '../../assets/img/cloudfly.png';
import en from '../../assets/img/english.svg';
import { Navigation } from '@mycloudfly/models';
import DashboardIcon from '@material-ui/icons/Dashboard';
import Avatar from '@material-ui/core/Avatar';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;
const navigations: Navigation[]=[
  {
    icon:DashboardIcon,

  }
]
const useStylesLa = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    small: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
    large: {
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
  }),
);

export function Layouts({children}:any) {

  const classesLa = useStylesLa();

  const [collapsed, setCollapsed]=useState(false);
  function toggle(){
    setCollapsed(!collapsed)
  }
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<any|null>(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: React.MouseEvent<EventTarget>) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }

    prevOpen.current = open;
  }, [open]);



  return (
    <>
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo" >
            {collapsed?
              '':  <img src={logo}/>}

          </div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} >
            <Menu.Item key="1" icon={<DashboardIcon />}>
              nav 1
            </Menu.Item>
            <Menu.Item key="2" icon={<VideoCameraOutlined />}>
              nav 2
            </Menu.Item>
            <Menu.Item key="3" icon={<UploadOutlined />}>
              nav 3
            </Menu.Item>

            <SubMenu key="sub1" icon={<UserOutlined />} title="subnav 1">
              <Menu.Item key="4">option1</Menu.Item>
              <Menu.Item key="5">option2</Menu.Item>
            </SubMenu>
          </Menu>


        </Sider>
        <Layout className="site-layout">

           <Header className="site-layout-background" style={{ padding: 0 }}>
             <div className="d-flex justify-content-between">
             {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
               className: 'trigger',
               onClick: toggle,
             })}
             <div  className="d-flex align-items-center " >
               <div  className={classesLa.root}>
                 <Avatar variant="rounded"  src={en} className={classesLa.large} style={{height:'24px',width:'24px'}}></Avatar>
               </div>
               <Button>Default</Button>
               <div className="d-flex align-items-center me-3 cp"   ref={anchorRef}
                    aria-controls={open ? 'menu-list-grow' : undefined}
                    aria-haspopup="true" onClick={handleToggle}>
                 <Avatar>H</Avatar>
                 <KeyboardArrowDownIcon/>
               </div>

               <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                 {({ TransitionProps, placement }) => (
                   <Grow
                     {...TransitionProps}
                     style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                   >
                     <Paper>
                       <ClickAwayListener onClickAway={handleClose}>
                         <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                           <MenuItem onClick={handleClose}>Profile</MenuItem>
                           <MenuItem onClick={handleClose}>My account</MenuItem>
                           <MenuItem onClick={handleClose}>Logout</MenuItem>
                         </MenuList>
                       </ClickAwayListener>
                     </Paper>
                   </Grow>
                 )}
               </Popper>
             </div>
             </div>

           </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 'fit-content',
            }}
          >
            Content
            {children}
          </Content>
        </Layout>
      </Layout>
    </>
  );
}

export default Layouts;
