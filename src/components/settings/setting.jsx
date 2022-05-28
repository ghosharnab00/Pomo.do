import React, {useContext} from 'react'
import "./settings.css"
import ReactSlider from 'react-slider'
import SettingContext from './settingcontext'
function Setting() {
  let settingsInfo = useContext(SettingContext);
  
let newWrokduration = (e) =>{
  settingsInfo.setWorktime(e);
}
let newLongbrkduration= (e) =>{
  settingsInfo.setLongbrktime(e);
}
let newShortbrkduration= (e) =>{
  settingsInfo.setShortbrktime(e);
}
let newRounds= (e) =>{
  settingsInfo.setRounds(e);
}
  return (
    <div className='settings'>
      <p className= "leble">Work duration</p>
      <div className="sliderwrap">
      <div className="startend">
  <p className='start'>5 m.</p>
  <p className='end'>60 m.</p>
</div>
      <ReactSlider
    className="slider"
    markClassName="mark"
    min={5}
    max={60}
    value={settingsInfo.worktime}
    thumbClassName="thumb"
    trackClassName="track"
    renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
    onChange={newWrokduration}
    
/>

      </div>
      
<p className= "leble">Long Brake duration</p>
<div className="sliderwrap">
      <div className="startend">
  <p className='start'>15 m.</p>
  <p className='end'>30 m.</p>
</div>
      <ReactSlider
    className="slider"
    markClassName="mark"
    min={15}
    max={30}
    value={settingsInfo.longbrktime}
    thumbClassName="thumb"
    trackClassName="track"
    renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
    onChange={newLongbrkduration}
    
/>
</div>
<p className= "leble">Short Brake duration</p>
<div className="sliderwrap">
      <div className="startend">
  <p className='start'>5 m.</p>
  <p className='end'>15 m.</p>
</div>
      <ReactSlider
    className="slider"
    markClassName="mark"
    min={5}
    max={15}
    value={settingsInfo.shortbrktime}
    thumbClassName="thumb"
    trackClassName="track"
    renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
    onChange={newShortbrkduration}
/>
</div>
<p className= "leble">Rounds</p>
<div className="sliderwrap">
      <div className="startend">
  <p className='start'>2</p>
  <p className='end'>12</p>
</div>
      <ReactSlider
    className="slider"
    markClassName="mark"
    min={2}
    max={12}
    value={settingsInfo.rounds}
    thumbClassName="thumb"
    trackClassName="track"
    renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
    onChange={newRounds}
/>
</div>
    </div>
  )
}

export default Setting
