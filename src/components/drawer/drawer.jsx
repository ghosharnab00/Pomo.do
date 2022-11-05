import React from 'react'
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
import { NavLink } from 'react-router-dom';
import { Button } from '@mui/material';

import WbSunnyIcon from '@mui/icons-material/WbSunny';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useTheme } from '@emotion/react';

export default function SidebarDrawer() {
    const theme = useTheme();
    let settingcontext = useContext(SettingContext);
    const toggle = settingcontext.toggle;

    const handleToggle=()=>{
        settingcontext.setToggle( toggle ? false :true)
    }
 
  const items = [
    {
        href: '/',
        icon: (<BsGearFill fontSize="large" />),
        title: 'Pomodo',
        prop:0
    },
    {
        href: '/state',
        icon: (<BsBarChartLine fontSize="large" />),
        title: 'State',
        prop:1
    },
    {
        href: '/settings',
        icon: (<BsClock fontSize="large" />),
        title: 'Settings',
        prop:2
    }
];


  return (
    <div>
            <Toolbar >

                <Typography
                    variant="h4"
                    component="h1"
                    sx={{ display: { xs: 'none', sm: 'flex' }, padding:"0 50px 0 0", color:'#0000FF'}}
                >
                    POMO.DO
                </Typography>
            </Toolbar>
            <List display={"flex"}>
                {items.map((item) => (
                    <ListItemButton key={Math.random()} component={NavLink} to={item.href} sx={settingcontext.stateswitch ?
                        {pointerEvents:"none"} : {pointerEvents:"click"}}>
                    
                    <ListItem
                        key={item.title}
                        disablePadding
                        sx={settingcontext.stateswitch ?
                             {color:"var(--offwhite)",padding:"20px 0"} : {color:"black", padding:"20px 0"}}>

                        
                            <ListItemIcon sx={settingcontext.stateswitch ?
                             {color:"var(--offwhite)",padding:"10px 0",justifyContent:"flex-end"} : {color:"black", padding:"10px 0", justifyContent:"flex-end"}}>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.title}  sx={{padding:"0px 0px 0px 12px"}}/>
                        

                    </ListItem>
                    </ListItemButton>
                ))}
                
            </List>
        </div>
  )
}
