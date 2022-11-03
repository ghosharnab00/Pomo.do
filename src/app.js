import * as React from 'react';
import { useState } from 'react';
import "./global.css"
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Button } from "@mui/material"
import SettingContext from './components/settings/settingcontext';
import Pomodoro from "./components/home/pomodo/pomodo";
import Stopwatch from "./components/home/stopwatch/stopwatch";
import { Tabtiles } from "./components/GeneralFunctions"
import { Grid , Container, Card} from "@mui/material";
import { request } from './data/axiosConfig';
import { Routes,
    Route,
    NavLink
} from "react-router-dom";
import { MemoryRouter } from 'react-router-dom';
import { BsGearFill, BsBarChartLine, BsClock } from 'react-icons/bs'
import Home from './components/home/home';
import States from "./components/state/state";
import Setting from "./components/settings/setting.jsx";
import SidebarDrawer from './components/drawer/drawer';
import GetUser from "./components/userdetails/userdetails"
import Login from './components/login/login';
import {Footer} from './components/footer/footer';
import { createTheme, ThemeProvider } from "@mui/material/styles";
const dark = {
  palette: {
    mode: "dark",
  },
};

const light = {
  palette: {
    mode: "light",
  },
};




const drawerWidth = 220;

function App(props) {
    if (!localStorage.hasOwnProperty('settings')){
        localStorage.setItem('settings', JSON.stringify({worktime:25, longbrktime:15, shortbrktime:5, rounds:3 }));
    }
    const workState=JSON.parse(localStorage.getItem('settings'));
    const { window } = props;
    const [mobileOpen, setMobileOpen] = useState(false);
    const [toggle, setToggle] = useState(false);
    const [worktime, setWorktime] = useState(workState.worktime);
    let [shortbrktime, setShortbrktime] = useState(workState.shortbrktime);
    let [longbrktime, setLongbrktime] = useState(workState.longbrktime);
    let [rounds, setRounds] = useState(workState.rounds);
    let [stateswitch, setStateswitch] = useState(false)
    let [tabseconds, setTabseconds] = useState(0)
    let [issignedin, setIssignedin] = useState(false)
    let [starttime, setStarttime] = useState(undefined)



    
    Tabtiles(`0${parseInt(tabseconds / 60)}`.slice(-2) + `:` + `0${tabseconds % 60}`.slice(-2) + " ⏳ | Pomo.do")

  
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    React.useEffect(()=>{
        setInterval(()=>{request({url:'/success'}).then(res=>{console.log(res)})}, 60000);
    },[])
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
   

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
      <SettingContext.Provider value={{
        worktime,
        shortbrktime,
        longbrktime,
        rounds,
        stateswitch,
        tabseconds,
        issignedin,
        starttime,
        toggle,
        setWorktime,
        setShortbrktime,
        setLongbrktime,
        setRounds,
        setStateswitch,
        setTabseconds,
        setIssignedin,
        setStarttime,
        setToggle
    }}>
        
        <MemoryRouter>
        <Box sx={{ display: 'flex' }}>
          <GetUser/>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                    backgroundColor: "transparent", boxShadow: "none",
                    display: { xs: 'block', sm: 'none' },

                }}
            >
                <Toolbar sx={{ justifyContent: "space-between" }} >

                    <Typography variant="h6" noWrap component="div" sx={{ color: "black" }}>
                        POMO.DO
                    </Typography>
                    <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
                        {items.map((item) => (
                            
                            <NavLink to={item.href} key={Math.random()} style={stateswitch?{textDecoration: "none",pointerEvents:"none"}: {textDecoration: "none"}}>
                                <Button key={Math.random()} sx={stateswitch ?
                             {color:"var(--offwhite)"} : {color:"black"}}>{item.title}</Button>
                            </NavLink>
                        ))}
                    </Box>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    <SidebarDrawer/>
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                       
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, justifyContent:"center", },
                    }}
                    open
                >
                    <SidebarDrawer/>
                    
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 0, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                
                   
                        <Grid container >
                        <Login/>
                            <Routes>


                                <Route exact path="/" element={<Home />}></Route>
                                <Route exact path="/pomodoro" element={<Pomodoro />}></Route>
                                <Route exact path="/stopwatch" element={<Stopwatch />}></Route>
                                <Route exact path="/state" element={<States />}></Route>
                                <Route exact path="/settings" element={<Setting />}></Route>


                            </Routes>
                            
                        </Grid>
                        <Grid item flex={true} justifyContent="center">
                        <Footer/>
                        </Grid>
                        <Box display="flex" flexDirection="column" minHeight={"100vh"} justifyContent="center" bgcolor={""} sx={{paddingTop:'50px'}} >
                                <Card sx={{ margin:"auto", display:"flex", minHeight:"80vh", width: "800px", borderRadius:"10px" }}>
                                <Grid width={"750px"} margin="auto" container>
                <Grid item sx={{ mb: 3 }}>
<Typography> lorem40q3rn3qr3rq3q3q3t3qtq3tq3
</Typography>
                    </Grid>
                    </Grid>
                            
                            
                            
                            
                            
                            
                            
                            </Card>
        
      </Box>
                        
                   
                

            </Box>
            
        </Box>
        </MemoryRouter>
        
        </SettingContext.Provider>
    );
}


export default App;
