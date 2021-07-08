import React, { useEffect, useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import StarBorder from "@material-ui/icons/StarBorder";
import ListItem from "@material-ui/core/ListItem";
import './style.scss';
import { useTranslation } from 'react-i18next';
import Icon from '@material-ui/core/Icon';
import { useLocation, NavLink } from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
  },
  nested: {
    paddingLeft: theme.spacing(4)
  }
}));



export default function ListNav() {
  const classes = useStyles();
  const {t} = useTranslation('common');
  const navigations = [
    {
      id:'1',
      key:'dashboard',
      title:t('NAVIGATION.DASHBOARD'),
      icon:'dashboard',
      url:'/',
      items:[]
    },
    {
      id:'2',
      key:'server',
      title:t('NAVIGATION.SERVER.SERVER'),
      icon:'storage',
      url:'/server/instances',
      items:[
        {
          id:'2.1',
          key:'server',
          title:t('NAVIGATION.SERVER.INSTANCES'),
          url:'/server/instances'
        },
        {
          id:'2.2',
          key:'server',
          title:t('NAVIGATION.SERVER.SSH_KEYS'),
          url:'/server/sshkeys'
        },
        {
          id:'2.3',
          key:'server',
          title:t('NAVIGATION.SERVER.NETWORKS'),
          url:'/server/networks'
        },
        {
          id:'2.4',
          key:'server',
          title:t('NAVIGATION.SERVER.CLOUD_FIREWALL'),
          url:'/server/cloud-firewall'
        },
        {
          id:'2.5',
          key:'server',
          title:t('NAVIGATION.SERVER.MY_IMAGE'),
          url:'/server/my-image'
        }
      ]
    },
    {
      id:'3',
      key:'domains',
      title:t('NAVIGATION.DOMAINS.DOMAINS'),
      icon:'language',
      url:'/domains',
      items:[
        {
          id:'3.1',
          key:'domains',
          title:t('NAVIGATION.DOMAINS.MY_DOMAINS'),
          url:'/domains'
        },
        {
          id:'3.2',
          key:'domains',
          title:t('NAVIGATION.DOMAINS.DOMAIN_CONTACTS'),
          url:'/domains/contacts'
        },
        {
          id:'3.3',
          key:'domains',
          title:t('NAVIGATION.DOMAINS.REGISTER_DOMAINS'),
          url:'/domains/register-domain'
        }
      ]},
    {
      id:'4',
      key:'billing',
      title:t('NAVIGATION.BILLING'),
      icon:'attach_money',
      url:'/billing',
      items:[]
    },
    {
      id:'5',
      key:'affiliate',
      title:t('NAVIGATION.AFFILIATE'),
      icon:'text_format',
      url:'/affiliate',
      items:[]
    },
    {
      id:'6',
      key:'tickets',
      title:t('NAVIGATION.TICKETS'),
      icon:'receipt',
      url:'/tickets',
      items:[]

    },
  ];
  const [open, setOpen] = React.useState(false);

  const location = useLocation()

  // @ts-ignore
  const [selectedKey, setSelectedKey] = useState(navigations.reduce((prev, product) => prev || product?.items.find(item => item.url === location.pathname), undefined)?.key)

  const onClickMenu = () => {
    setOpen(!open)
  }

  useEffect(() => {
    // @ts-ignore
    setSelectedKey(navigations.reduce((prev, product) => prev || product?.items.find(item => item.url === location.pathname), undefined)?.key)
  }, [location])

  useEffect(()=>{
    if(selectedKey){
      setOpen(true);
    }
  },[selectedKey])
  const ss=[{
    url:'a'
  },
    {url:'b'}]
  const numbers = [1, 2, 3, 4, 5];
  const listItems = numbers.map((number) =>
    <li key={number.toString()}>
      {number}
    </li>
  );
  const listDta=navigations.map((item)=>
    <a key={item.id}>
      {item.url}
      {console.log(item)}
      {
        item.items.map((s)=>
          (
            <li key={s.id}>
              {s.title}
            </li>
          ))
      }
    </a>
  )
  return (
    <List
      component="nav"
      className={classes.root}
    >
      {
        navigations.map((t)=>(
          t?.items?.length>0?
            <>
          <NavLink to={t.url} exact activeClassName="activeRoute" className={selectedKey==t.key&&open?"Nav_link activeRoute":"Nav_link"} onClick={onClickMenu} key={t.id}>
            <ListItem >
              <ListItemIcon>
                <Icon>{t.icon}</Icon>
              </ListItemIcon>
              <ListItemText primary={t.title} />
              {selectedKey==t.key&&open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
          </NavLink>
              <Collapse in={selectedKey==t.key&& open} timeout="auto" unmountOnExit>
                {
                  t.items.map((child,i)=>(
                    <List component="div" disablePadding key={child.id}>
                      <NavLink to={child.url} exact activeClassName="activeRoute" className="Nav_link">
                        <ListItem
                          className={classes.nested}
                          button
                        >
                          <ListItemIcon>
                            <StarBorder />
                          </ListItemIcon>
                          <ListItemText primary={child.title} />
                        </ListItem>
                      </NavLink>
                    </List>
                  ))
                }
              </Collapse>
              </>
              :
                <NavLink to={t.url} exact activeClassName="activeRoute" className="Nav_link"  key={t.id}>
                  <ListItem button  className="MenuItem" >
                    <ListItemIcon>
                      <Icon>{t.icon}</Icon>
                    </ListItemIcon>
                    <ListItemText primary={t.title} />
                  </ListItem>
                </NavLink>
        ))
      }
    </List>
  );
}
