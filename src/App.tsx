import { useState } from 'react'
import './App.css'
import CountDown from './CountDown'

function App() {
  const [hourse, setHourse] = useState<number>(0)
  const [minutes, setMinutes] = useState<number>(0)
  const [seconds, setSeconds] = useState<number>(0)

  return (
    <>
      <CountDown hours={Number(hourse)} seconds={Number(seconds)} minutes={Number(minutes)} />
      <div className='inpts'>
        <label>
          <p>Hourse</p>
          <input type="number" value={hourse} placeholder='Hourse' onChange={e => setHourse(Number(e.target.value))} />
        </label>
        <label>
          <p>Minutes</p>
          <input type="number" value={minutes} placeholder='Minutes' onChange={e => setMinutes(prev => Number(e.target.value) < 60? Number(e.target.value) : prev)} />
        </label>
        <label>
          <p>Seconds</p>
          <input type="number" value={seconds} onChange={e => setSeconds(prev => Number(e.target.value) < 60? Number(e.target.value) : prev)} />
        </label>
      </div>
    </>
  )
}

export default App
