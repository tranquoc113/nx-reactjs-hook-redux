import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Menu, { MenuProps } from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Lang } from '@mycloudfly/models';
import { ReactComponent as ViIcon } from '../../../assets/img/vietnam.svg';
import { ReactComponent as EnIcon } from '../../../assets/img/english.svg';
import { IconButton, SvgIcon } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props: MenuProps) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));


export default function Language() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const {t, i18n} = useTranslation('common');
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const [langDefault, setDefault]=useState('vi');

  const handleClose = () => {
    setAnchorEl(null);
  };
  const [languages] = useState<Lang[]>([
    {
      key:'vi',
      name:t('TOPBAR.VI'),
      default:true,
      logo:ViIcon
    },
    {
      key:'en',
      name:t('TOPBAR.EN'),
      default:true,
      logo:EnIcon
    }
  ]);
  return (
    <div className="d-flex align-items-center">
      <IconButton  aria-controls="customized-menu"
                   onClick={handleClick}>
        <SvgIcon component={langDefault=='vi'?ViIcon:EnIcon} viewBox="0 0 600 476.6"  />
      </IconButton>

          <StyledMenu
            id="customized-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {
              languages.map((t,key)=>(
            <MenuItem onClick={handleClose} key={key}>
              <ListItemIcon>
                <SvgIcon component={t.logo} viewBox="0 0 600 476.6" />
              </ListItemIcon>
              <ListItemText primary={t.name} />
            </MenuItem>
              ))
            }
          </StyledMenu>
    </div>
  );
}
