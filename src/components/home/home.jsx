import React from 'react'
import Stopwatch from './stopwatch/stopwatch'
import Todo from './todo/todo'
import "./home.css"

export default function Home() {
  return (
      <div className="home">
          <div className="home_left">
              <div className="tabs"></div>
              <div className="tab active-tab">Pomodo</div>
              <div className="tab active-tab">Stopwatch</div>



          </div>
          <div className="home_right"><Todo/></div>
      </div>
  )
}
