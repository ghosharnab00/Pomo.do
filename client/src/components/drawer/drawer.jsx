import React, { useEffect } from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { BsGearFill, BsBarChartLine, BsClock } from 'react-icons/bs'
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import SettingContext from '../settings/settingcontext';
import { useContext } from 'react';

export default function SidebarDrawer() {
    let settingcontext = useContext(SettingContext);
  const items = [
    {
        href: '/',
        icon: (<BsGearFill fontSize="large" />),
        title: 'Pomodo'
    },
    {
        href: '/state',
        icon: (<BsBarChartLine fontSize="large" />),
        title: 'State'
    },
    {
        href: '/settings',
        icon: (<BsClock fontSize="large" />),
        title: 'Settings'
    }
];

function onLinkClick(e) {
    e.preventDefault();
    // further processing happens here
 }

  return (
    <div>
       
            <Toolbar sx={{}} >

                <Typography
                    variant="h4"
                    component="h1"
                    sx={{ display: { xs: 'none', sm: 'flex' }, padding:"0 50px 0 0"}}
                >
                    POMO.DO
                </Typography>
            </Toolbar>
            <List display={"flex"}>
                {items.map((item) => (
                    <ListItem
                        key={item.title}
                        href={item.href}
                        disablePadding
                        sx={settingcontext.stateswitch ?
                             {color:"var(--offwhite)",padding:"20px 0"} : {color:"black", padding:"20px 0"}}>

                        <ListItemButton href={item.href} sx={settingcontext.stateswitch ?
                             {pointerEvents:"none"} : {pointerEvents:"auto"}}>
                            <ListItemIcon sx={settingcontext.stateswitch ?
                             {color:"var(--offwhite)",padding:"10px 0",justifyContent:"center"} : {color:"black", padding:"10px 0", justifyContent:"center"}}>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.title} />
                        </ListItemButton>

                    </ListItem>
                ))}
            </List>
        </div>
  )
}
