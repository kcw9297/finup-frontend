import { List, ListItem, ListItemText, Badge } from '@mui/material';

export function Sidebar({ menuItems }) {
  return (
    <List>
      {menuItems.map(item => (
        <ListItem key={item.id} button selected={item.active}>

          {/* 메뉴 텍스트 영역 */}
          <ListItemText primary={item.label} />

          {/* 메뉴 텍스트 우측 Badge 영역 */}
          {item.badge && (<Badge badgeContent={item.badge} color="error" /> )}

        </ListItem>
      ))}
    </List>
  );
}