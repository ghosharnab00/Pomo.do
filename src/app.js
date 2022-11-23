import * as React from 'react';
import { useState } from 'react';
import "./global.css"
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Button, Divider } from "@mui/material"
import SettingContext from './components/settings/settingcontext';
import Pomodoro from "./components/home/pomodo/pomodo";
import Stopwatch from "./components/home/stopwatch/stopwatch";
import { Tabtiles } from "./components/GeneralFunctions"
import { Grid, Container, Card } from "@mui/material";
import { request } from './data/axiosConfig';
import {
    Routes,
    Route,
    NavLink,
    BrowserRouter
} from "react-router-dom";
import { MemoryRouter } from 'react-router-dom';
import { BsGearFill, BsBarChartLine, BsClock } from 'react-icons/bs'
import Home from './components/home/home';
import States from "./components/state/state";
import Setting from "./components/settings/setting.jsx";
import SidebarDrawer from './components/drawer/drawer';
import GetUser from "./components/userdetails/userdetails"
import Login from './components/login/login';
import { Footer } from './components/footer/footer';
import { TwitterTweetEmbed } from 'react-twitter-embed';

import { createTheme, ThemeProvider } from "@mui/material/styles";
const dark = {
    palette: {
        mode: "dark",
    },
};

const light = {
    palette: {
        mode: "light",
    
    primary:{
        main:'#0000FF',
        light200:"#b39ddb",
        light800:"#4527a0",
        dark:'#5e35b1',
        darker: "#008b00",
        darkest:"#007300",
        contrastText:'#fff',
        heading:'#f46524',
        subheader:"#4a5e72",
        darksub:'#334960',
        litesub:"#aeb7bf",
        lightback:'#ebedef'
      }
    }
};




const drawerWidth = 220;

function App(props) {
    if (!localStorage.hasOwnProperty('settings')) {
        localStorage.setItem('settings', JSON.stringify({ worktime: 25, longbrktime: 15, shortbrktime: 5, rounds: 3 }));
    }
    const workState = JSON.parse(localStorage.getItem('settings'));
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

    React.useEffect(() => {
        setInterval(() => { request({ url: '/success' }).then(res => { console.log(res) }) }, 300000);
    }, [])
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
        <ThemeProvider theme={toggle ? createTheme(dark) : createTheme(light)}>
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

            <BrowserRouter>
                <Box sx={{ display: 'flex' }}>
                    <GetUser />
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

                                    <NavLink to={item.href} key={Math.random()} style={stateswitch ? { textDecoration: "none", pointerEvents: "none" } : { textDecoration: "none" }}>
                                        <Button key={Math.random()} sx={stateswitch ?
                                            { color: "var(--offwhite)" } : { color: "black" }}>{item.title}</Button>
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
                            <SidebarDrawer />
                        </Drawer>
                        <Drawer
                            variant="permanent"
                            sx={{
                                display: { xs: 'none', sm: 'block' },

                                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, justifyContent: "center", },
                            }}
                            open
                        >
                            <SidebarDrawer />

                        </Drawer>
                    </Box>
                    <Box
                        component="main"
                        sx={{ flexGrow: 1, p: 0, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
                    >


                        <Grid container >
                            <Login />
                            <Routes>


                                <Route exact path="/" element={<Home />}></Route>
                                <Route exact path="/pomodoro" element={<Pomodoro />}></Route>
                                <Route exact path="/stopwatch" element={<Stopwatch />}></Route>
                                <Route exact path="/state" element={<States />}></Route>
                                <Route exact path="/settings" element={<Setting />}></Route>


                            </Routes>

                        </Grid>
                        <Grid item flex={true} justifyContent="center">
                            <Footer />
                        </Grid>
<Divider sx={{borderColor:'black', opacity:0.4}}/>
                        <Grid maxWidth={"750px"} margin="auto" container flexDirection={'column'} paddingBottom={'20px'}>
                                    <br />
                                    <Typography component={'h1'} variant="h3"  > Best Pomodoro Timer for ADHD Students to Boost Study Retention
                                    </Typography>
                                    <br />
                                    <Typography component={'h2'} variant="h4"> What is Pomo.do Pomodoro Tracker?
                                    </Typography>
                                    <br />
                                    <Typography > Pomo.do is a unique Pomodoro timer app that helps students with ADHD to focus on their tasks. It works both on desktop and mobile browsers.
                                    </Typography>
                                    <br />
                                    <Typography component={'h2'} variant="h4"> Use Cases
                                    </Typography>
                                    <br />
                                    <Typography > There are a few ways users use the Pomodoro app.
                                    </Typography>

                                    <ul>
                                        <li>
                                            <Typography > Some use the pomo.do apps to get themselves to focus on their studies. And once they are in the zone, they keep working until their focus breaks.
                                            </Typography>
                                        </li>
                                        <li>
                                            <Typography > Some users use Pomo.do to get themselves to take breaks from playing video games or scrolling on social media.
                                            </Typography>
                                        </li>
                                        <li>
                                            <Typography > Some people use mini Pomodoro to use short bursts of focus on tasks, such as <strong>10 minutes focus - 3 minutes breaks.</strong>
                                            </Typography>
                                        </li>
                                        <li>
                                            <Typography > One can also use reverse Pomodoro, such as <strong>10 minutes of work and 30 minutes break.</strong>
                                            </Typography>
                                        </li>
                                    </ul>
                                    <br />
                                    <Typography fontStyle={'italic'}>The use cases of the Pomodoro technique for ADHD students are only limited by your creativity.
                                    </Typography>
                                    <br />
                                    <Typography component={'h2'} variant="h4">How to Use Pomo.do Timer?
                                    </Typography>

                                    <ul>
                                        <li>
                                            <Typography bold> Log in to your account
                                            </Typography>
                                        </li>
                                        <li>
                                            <Typography > Add tasks on the left side ( you can only add 6 tasks at a time)
                                            </Typography>
                                        </li>
                                        <li>
                                            <Typography > Set the time for Pomodoro along with short breaks, long break,s and rounds on the settings page
                                            </Typography>
                                        </li>
                                        <li>
                                            <Typography > Start the timer and focus on your tasks
                                            </Typography>
                                        </li>
                                        <li>
                                            <Typography > Take a break for 5 minutes when the music stops
                                            </Typography>
                                        </li>
                                        <li>
                                            <Typography > Do this for 3-5 times until the music stops
                                            </Typography>
                                        </li>
                                    </ul>
                                    <br />
                                    <Typography component={'h2'} variant="h4"> Frequently Asked Questions
                                    </Typography>

<br/>


                                    <Typography component={'h3'} variant="h5"> Is Pomodoro always 25 minutes?
                                    </Typography>
                                    <br />
                                    <Typography > The general idea of Pomodoro is to have a focus session of <strong>25 minutes followed by a 5 minutes break</strong>. But it may not be suited for students with ADHD. </Typography>

                                    <br />
                                    <Typography >
                                        You can shorten the focus time to only <strong>10 minutes</strong>, followed by a 10 minute break, and slowly increase the focus time to <strong>15, 20, 30 and so on.</strong>
                                        So you can choose your own focus timing and work on the tool,

                                    </Typography>
                                    <br />
                                    <ul>
                                        <li>
                                            <Typography >Go to Settings
                                            </Typography></li>
                                        <li>
                                            <Typography >Change Work Duration, long and short break duration, and rounds according to your needs, and start your Pomodoro.
                                            </Typography></li>
                                    </ul>
                                    <br />
                                    <Typography component={'h3'} variant="h5"> Can Pomodoro be 30 minutes?
                                    </Typography>
                                    <br />
                                    <Typography > Yes, Pomodoro can be <strong>30 minutes, 40 minutes, or any time you want.</strong> On our tool, you can use a maximum of 60 minutes of Pomodoro.
                                    </Typography>
                                    <br />
                                    <Typography component={'h3'} variant="h5"> Is Pomodoro good for studying?
                                    </Typography>
                                    <br />
                                    <Typography > Pomodoro is a great way to study. And it’s not just me who’s saying it. Let’s see what people are saying:

                                    </Typography>
                                    <br />
                                    <TwitterTweetEmbed
                                        tweetId={'1588214675208081409'}
                                    />
                                    <br />
                                    <TwitterTweetEmbed
                                        tweetId={'1532038305709035520'}
                                    />
                                    <br />
                                    <Typography component={'h3'} variant="h5"> How many Pomodoros should you do in a day?
                                    </Typography>
                                    <br />
                                    <Typography > One of the biggests mistakes people do is focus on multiple tasks in a day, and get overwhelmed. The key is to focus on only <strong>3 tasks per day</strong>, and <strong>3-4 pomodoros of 25 minutes for each tasks</strong>. Not more than that. <br />

                                        If the tasks need more than that, it’s better to break that task to different smaller ones.

                                    </Typography>


                                </Grid>




                    </Box>

                </Box>
            {/* </MemoryRouter> */}
</BrowserRouter>
        </SettingContext.Provider>
        </ThemeProvider>
    );
}


export default App;
