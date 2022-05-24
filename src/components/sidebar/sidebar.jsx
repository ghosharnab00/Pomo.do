import React from 'react'
import { NavLink } from 'react-router-dom';
import './sidebar.css';
import Setting from '../settings/states/settings';
import States from '../state/state';
import Pomodoro from '../pomodo/pomodo';

export default function Sidebar() {
  return (
    
    <div className='sidebar'>
     
      <div className="sidebar-inner">
        <div className="logo-wrapper"> <span className="logo">Pomo.do</span></div>
     <div className="menulist">
     <NavLink>
     <link href="/" ><div className='ico'><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>Timer</div></link>
       
     </NavLink>
         <ul className="list">
             <li className='listitem'>
               

</li>
             <li className='listitem'><img src="" alt="" className="logo" />
             <div className='ico'><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
</svg></div>States</li>
             <li className='listitem'><img src="" alt="" className="logo" />
             <div className='ico'><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
</svg></div>Settings</li>
         </ul>
     </div>
     </div>
    </div>
  )
}
