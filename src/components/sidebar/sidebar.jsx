import React from 'react'
import { Link } from 'react-router-dom';
import './sidebar.css';
import {BsGearFill, BsBarChartLine, BsClock} from 'react-icons/bs'

export default function Sidebar() {
  return (

    <div className='sidebar'>

<div className="logo-wrapper"> <span className="logo">Pomo.do</span></div>
      
      
      <div className="sidebar-inner">
        
        <div className="menulist">

          <ul className="list">
            <li className='listitem'>
              <Link to="/" className='navlink'>

                <div className='ico'>
                <BsClock className='h-6'  />
                  <p>Timer</p>

                </div>
              </Link>

            </li>
            <li className='listitem' >
              <Link to="/state" className='navlink'>
                <div className='ico'>
                <BsBarChartLine className='h-6'/>
                  <p>States</p>

                </div>
              </Link>
            </li>
            <li className='listitem'>
              <Link to="/setting" className='navlink'>
                <div className='ico'>
                <BsGearFill className='h-6'/>
                  <p>Settings</p>
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
