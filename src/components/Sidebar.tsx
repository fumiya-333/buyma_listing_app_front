import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
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
            <NavLink to={ AppConstants.END_POINT_LISTING } className={({ isActive }) => "nav-link" + (isActive ? "-activated" : "")}>
              {/* <CallToActionIcon/>
              出品リスト */}
              <ListItem button key='出品リスト' divider>
                <ListItemIcon>
                  <CallToActionIcon />
                </ListItemIcon>
                <ListItemText primary='出品リスト' />
              </ListItem>
            </NavLink>
            <NavLink to={ AppConstants.END_POINT_CONTACTS } className={({ isActive }) => "nav-link" + (isActive ? "-activated" : "")}>
              {/* <ViewListIcon/>
              お問い合わせ一覧 */}
              <ListItem button key='お問い合わせ一覧' divider>
                <ListItemIcon>
                  <ViewListIcon />
                </ListItemIcon>
                <ListItemText primary='お問い合わせ一覧' />
              </ListItem>
            </NavLink>
            <NavLink to={ AppConstants.END_POINT_INCOME_MANGEGEMENT } className={({ isActive }) => "nav-link" + (isActive ? "-activated" : "")}>
              {/* <AttachMoneyIcon/>
              収支管理表 */}
              <ListItem button key='収支管理表' divider>
                <ListItemIcon>
                  <AttachMoneyIcon />
                </ListItemIcon>
                <ListItemText primary='収支管理表' />
              </ListItem>
            </NavLink>
            <NavLink to={ AppConstants.END_POINT_MANUAL } className={({ isActive }) => "nav-link" + (isActive ? "-activated" : "")}>
              {/* <FiberManualRecordIcon/>
              マニュアル */}
              <ListItem button key='マニュアル' divider>
                <ListItemIcon>
                  <FiberManualRecordIcon />
                </ListItemIcon>
                <ListItemText primary='マニュアル' />
              </ListItem>
            </NavLink>
            <NavLink to={ AppConstants.END_POINT_SETTING } className={({ isActive }) => "nav-link" + (isActive ? "-activated" : "")}>
              {/* <SettingsIcon/>
              設定 */}
              <ListItem button key='設定' divider>
                <ListItemIcon>
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText primary='設定' />
              </ListItem>
            </NavLink>
          </List>
        </Box>
      </Drawer>
  );
}