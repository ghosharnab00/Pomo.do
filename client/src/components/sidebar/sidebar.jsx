import React from 'react'
import { NavLink } from 'react-router-dom';
import './sidebar.css';
import { BsGearFill, BsBarChartLine, BsClock } from 'react-icons/bs'
import { useContext } from 'react';
import SettingContext from '../settings/settingcontext';
import { Typography , Button} from '@mui/material';
export default function Sidebar() {

  let settingcontext = useContext(SettingContext);


  return (

    <div className='sidebar'>
      <div className="logo-wrapper "> <header ><Typography variant='h4' component="h1" className="logo">Pomo.do</Typography></header>
      
      </div>


      <div className="sidebar-inner">
      
        <div className="menulist">

          <ul className="list">
            <li className='listitem'>
              <NavLink to="/" className='navlink' >

                <div className='ico'>
                  <BsClock className='h-6' />
                  <Typography>Timer</Typography>
                  
  
                </div>
              </NavLink>

            </li>

            {
              (settingcontext.stateswitch)
                ? <li className='listitem' style={{ backgroundColor: "var(--color3)50" }}> <NavLink to="/state" className='navlink' style={{ pointerEvents: 'none' }}>
                  <div className='ico'>
                    <BsBarChartLine className='h-6' style={{ color: "var(--offwhite)" }} />
                    <Typography style={{ color: "var(--offwhite)" }}>States</Typography>
                  </div>
                </NavLink></li>
                : <li className='listitem' ><NavLink to="/state" className='navlink'>
                  <div className='ico'>
                    <BsBarChartLine className='h-6' />
                    <Typography>States</Typography>
                  </div>
                </NavLink></li>
            }
            {
              (settingcontext.stateswitch)
                ? <li className='listitem' style={{ backgroundColor: "var(--color3)50" }}> <NavLink to="/setting" className='navlink' style={{ pointerEvents: 'none' }}>
                  <div className='ico'>
                    <BsGearFill className='h-6' style={{ color: "var(--offwhite)" }} />
                    <Typography style={{ color: "var(--offwhite)" }}>Settings</Typography>
                  </div>
                </NavLink></li>
                : <li className='listitem' ><NavLink to="/setting" className='navlink' >
                  <div className='ico'>
                    <BsGearFill className='h-6' />
                    <Typography>Settings</Typography>
                  </div>
                </NavLink></li>
            }
          </ul>
          
         
        </div>
        
      </div>
       
    </div>
  )
}
