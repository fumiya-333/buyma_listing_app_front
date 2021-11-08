import React from 'react';
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
import { Link } from '@mui/material';

const drawerWidth = 240;

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
            <Link href='/listing' color='inherit' style={{ textDecoration: 'none' }}>
              <ListItem button key='出品リスト' divider>
                <ListItemIcon>
                  <CallToActionIcon />
                </ListItemIcon>
                <ListItemText primary='出品リスト' />
              </ListItem>
            </Link>
            <Link href='/contacts' color='inherit' style={{ textDecoration: 'none' }}>
              <ListItem button key='お問い合わせ一覧' divider>
                <ListItemIcon>
                  <ViewListIcon />
                </ListItemIcon>
                <ListItemText primary='お問い合わせ一覧' />
              </ListItem>
            </Link>
            <Link href='/income_management' color='inherit' style={{ textDecoration: 'none' }}>
              <ListItem button key='収支管理表' divider>
                <ListItemIcon>
                  <AttachMoneyIcon />
                </ListItemIcon>
                <ListItemText primary='収支管理表' />
              </ListItem>
            </Link>
            <Link href='/manual' color='inherit' style={{ textDecoration: 'none' }}>
              <ListItem button key='マニュアル' divider>
                <ListItemIcon>
                  <FiberManualRecordIcon />
                </ListItemIcon>
                <ListItemText primary='マニュアル' />
              </ListItem>
            </Link>
            <Link href='/setting' color='inherit' style={{ textDecoration: 'none' }}>
              <ListItem button key='設定' divider>
                <ListItemIcon>
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText primary='設定' />
              </ListItem>
            </Link>
          </List>
        </Box>
      </Drawer>
  );
}