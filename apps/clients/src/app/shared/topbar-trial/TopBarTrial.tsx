import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { useTranslation } from 'react-i18next';

export default function TopBarTrial() {

  const {t, i18n} = useTranslation('common');

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="d-flex align-items-center">
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} variant="contained" color="secondary">
        {t('TOPBAR.TRIAL')}
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>{t('TOPBAR.CLOUD_SERVER')}</MenuItem>
      </Menu>
    </div>
  );
}
