import { useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

export function Calendario() {
  const [value, onChange] = useState(new Date())
  return (
    <div className="sidebarRight" >
      <div className="calendario">
        <div>
          {/* <Calendar locale={'pt'} onChange={onChange} value={value} /> */}
        </div>
      </div>
    </div>
  )
}
