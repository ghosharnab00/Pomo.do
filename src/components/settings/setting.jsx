import React from 'react'
import "./settings.css"
import ReactSlider from 'react-slider'
function Setting() {
  return (
    <div className='settings'>
      <p className= "leble">Work duration</p>
      <ReactSlider
    className="slider"
    markClassName="mark"
    min={1}
    max={120}
    value={25}
    thumbClassName="thumb"
    trackClassName="track"
    
/>
<p className= "leble">Long Brake duration</p>
      <ReactSlider
    className="slider"
    markClassName="mark"
    min={1}
    max={120}
    value={20}
    thumbClassName="thumb"
    trackClassName="track"
    
/>

<p className= "leble">Short Brake duration</p>
      <ReactSlider
    className="slider"
    markClassName="mark"
    min={1}
    max={120}
    value={5}
    thumbClassName="thumb"
    trackClassName="track"
    
/>
      
    </div>
  )
}

export default Setting
