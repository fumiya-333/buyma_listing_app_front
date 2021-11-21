import { Box, Drawer, Toolbar, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import CallToActionIcon from '@mui/icons-material/CallToAction';
import ViewListIcon from '@mui/icons-material/ViewList';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import SettingsIcon from '@mui/icons-material/Settings';
import { NavLink } from 'react-router-dom';
import * as AppConstants from '../commons/AppConstants';

/** 横幅 */
const drawerWidth = 240;

/**
 * サイドバー用コンポーネント
 * 
 * @returns サイドバー
 */
export function Sidebar() {
  return (
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            <NavLink to={ AppConstants.END_POINT_LISTING } className={({ isActive }) => "nav-link" + (isActive ? "-activated" : "") }>
              <ListItem button key={ AppConstants.SIDEBAR_PAGE_NAME_TXT_LISTING } divider>
                <ListItemIcon>
                  <CallToActionIcon />
                </ListItemIcon>
                <ListItemText primary={ AppConstants.SIDEBAR_PAGE_NAME_TXT_LISTING } />
              </ListItem>
            </NavLink>
            <NavLink to={ AppConstants.END_POINT_CONTACTS } className={({ isActive }) => "nav-link" + (isActive ? "-activated" : "") }>
              <ListItem button key={ AppConstants.SIDEBAR_PAGE_NAME_TXT_CONTACTS } divider>
                <ListItemIcon>
                  <ViewListIcon />
                </ListItemIcon>
                <ListItemText primary={ AppConstants.SIDEBAR_PAGE_NAME_TXT_CONTACTS } />
              </ListItem>
            </NavLink>
            <NavLink to={ AppConstants.END_POINT_INCOME_MANGEGEMENT } className={({ isActive }) => "nav-link" + (isActive ? "-activated" : "") }>
              <ListItem button key={ AppConstants.SIDEBAR_PAGE_NAME_TXT_INCOME_MANGEGEMENT } divider>
                <ListItemIcon>
                  <AttachMoneyIcon />
                </ListItemIcon>
                <ListItemText primary={ AppConstants.SIDEBAR_PAGE_NAME_TXT_INCOME_MANGEGEMENT } />
              </ListItem>
            </NavLink>
            <NavLink to={ AppConstants.END_POINT_MANUAL } className={({ isActive }) => "nav-link" + (isActive ? "-activated" : "") }>
              <ListItem button key={ AppConstants.SIDEBAR_PAGE_NAME_TXT_MANUAL } divider>
                <ListItemIcon>
                  <FiberManualRecordIcon />
                </ListItemIcon>
                <ListItemText primary={ AppConstants.SIDEBAR_PAGE_NAME_TXT_MANUAL } />
              </ListItem>
            </NavLink>
            <NavLink to={ AppConstants.END_POINT_SETTING } className={({ isActive }) => "nav-link" + (isActive ? "-activated" : "") }>
              <ListItem button key={ AppConstants.SIDEBAR_PAGE_NAME_TXT_SETTING } divider>
                <ListItemIcon>
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText primary={ AppConstants.SIDEBAR_PAGE_NAME_TXT_SETTING } />
              </ListItem>
            </NavLink>
          </List>
        </Box>
      </Drawer>
  );
}