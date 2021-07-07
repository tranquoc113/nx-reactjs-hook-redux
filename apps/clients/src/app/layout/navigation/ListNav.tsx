import React, { useEffect, useState } from 'react';
import { makeStyles, withStyles } from "@material-ui/core/styles";
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
import { Link, NavLink, useParams, useRouteMatch } from 'react-router-dom';
import { useHistory ,useLocation } from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
  },
  nested: {
    paddingLeft: theme.spacing(4)
  },
  nestedSecondLevel: {
    paddingLeft: theme.spacing(8)
  },
  icon: {
    color: 'red',
  }
}));


// const ListItem = withStyles({
//   root: {
//     color:'#a2a3b7',
//     "& .MuiListItemIcon-root": {
//       color: "#494b74"
//     },
//     "&$selected": {
//       backgroundColor: "#1b1b28",
//       color: "white",
//       "& .MuiListItemIcon-root": {
//         color: "#3699FF"
//       }
//     },
//     "&:hover": {
//       backgroundColor: "#1b1b28",
//       color: "white",
//       "& .MuiListItemIcon-root": {
//         color: "#3699FF"
//       }
//     }
//   },
//   selected: {}
// })(MuiListItem)

const items = [
  { key: '1', label: 'Invoices', path: '/admin/invoices' },
  { key: '2', label: 'Service Details', path: '/admin/service-details' },
  { key: '3', label: 'Service Contract Details', path: '/admin/service-contract-details' },
  { key: '4', label: 'Cost Centers', path: '/admin/cost-centers' },
  { key: '5', label: 'Clients', path: '/admin/clients' },
  { key: '6', label: 'Vendors', path: '/admin/vendors' }
]
export default function ListNav() {
  const classes = useStyles();
  const {t} = useTranslation('common');
  const [navigations] = useState([
    {
      key:'dashboard',
      title:t('NAVIGATION.DASHBOARD'),
      icon:'dashboard',
      url:'/'
    },
    {
      key:'server',
      title:t('NAVIGATION.SERVER.SERVER'),
      icon:'storage',
      url:'/server/instances',
      items:[
        {
          key:'server',
          title:t('NAVIGATION.SERVER.INSTANCES'),
          url:'/server/instances'
        },
        {
          key:'sshkeys',
          title:t('NAVIGATION.SERVER.SSH_KEYS'),
          url:'/server/sshkeys'
        },
        {
          key:'networks',
          title:t('NAVIGATION.SERVER.NETWORKS'),
          url:'/networks'
        },
        {
          key:'cloudfirewall',
          title:t('NAVIGATION.SERVER.CLOUD_FIREWALL'),
          url:'/cloud-firewall'
        },
        {
          key:'myimage',
          title:t('NAVIGATION.SERVER.MY_IMAGE'),
          url:'/my-image'
        }
      ]
    },
    {
      key:'domains',
      title:t('NAVIGATION.DOMAINS.DOMAINS'),
      icon:'language',
      url:'/domains',
      items:[
        {
          key:'domains',
          title:t('NAVIGATION.DOMAINS.MY_DOMAINS'),
          url:'/domains'
        },
        {
          key:'contacts',
          title:t('NAVIGATION.DOMAINS.DOMAIN_CONTACTS'),
          url:'/contacts'
        },
        {
          key:'registerdomain',
          title:t('NAVIGATION.DOMAINS.REGISTER_DOMAINS'),
          url:'/register-domain'
        }
      ]},
    {
      key:'billing',
      title:t('NAVIGATION.BILLING'),
      icon:'attach_money',
      url:'/billing'
    },
    {
      key:'affiliate',
      title:t('NAVIGATION.AFFILIATE'),
      icon:'text_format',
      url:'/affiliate'
    },
    {
      key:'tickets',
      title:t('NAVIGATION.TICKETS'),
      icon:'receipt',
      url:'/tickets'
    },
  ]);
  const [open, setOpen] = React.useState('');
  const [openChild, setOpenChild]=useState('');

  const location = useLocation()

  const history = useHistory()

  // const [selectedKey, setSelectedKey] = useState(items.find(_item => location.pathname.startsWith(_item.path)).key)

  const onClickMenu = (item:any) => {
    // const clicked = items.find(_item => _item.key === item.key)
    // history.push(clicked.path)
  }

  useEffect(() => {
    // setSelectedKey(items.find(_item => location.pathname.startsWith(_item.path)).key)

  }, [location])


  console.log(location)
  console.log(history)
  const handleClick = (val:string) => {
    if(open==val){
      setOpen('');
      return;
    }
    setOpen(val);
  };

  const handChild=(val:string)=>{
    setOpenChild(val);
  }

  return (
    <List
      component="nav"
      className={classes.root}
    >
      {
        navigations.map((t)=>(
          t?.items?
           <>
           <NavLink to={t.url} exact activeClassName="activeRoute" className="Nav_link" key={t.key}>
             <ListItem button onClick={()=>handleClick(t.key)} >
               <ListItemIcon>
                 <Icon>{t.icon}</Icon>
               </ListItemIcon>
               <ListItemText primary={t.title} />
               {location.pathname==t.url ? <ExpandLess /> : <ExpandMore />}
             </ListItem>
           </NavLink>
             <Collapse in={location.pathname==t.url} timeout="auto" unmountOnExit>
               {
                 t.items.map((child)=>(
                   <List component="div" disablePadding key={child.key}>
                     <NavLink to={child.url} exact activeClassName="activeRoute" className="Nav_link" >
                     <ListItem  selected={open==child.key}
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
            <NavLink to={t.url} exact activeClassName="activeRoute" className="Nav_link" key={t.key}>
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
