import { Link } from 'react-router-dom'
import logo from '../assets/Frame 7108.svg'
import { useState } from 'react'

export function Header() {
  const [participantsPage, setParticipantsPage] = useState(Boolean)
  const [eventsPage, setEventsPage] = useState(Boolean)
  function onPageSelected() {
    if (participantsPage) {
      setParticipantsPage(false)
      setEventsPage(true)
    } else {
      setParticipantsPage(true)
      setEventsPage(false)
    }
  }

  return (
    <div>
      <div className="flex items-center gap-5 py-2 mb-2 font-semibold">
        <img src={logo} />

        <nav className="flex items-center gap-5">
          <Link
            to="/participantes"
            className={participantsPage ? 'text-slate-50' : ''}
            onClick={onPageSelected}
          >
            Participantes
          </Link>
          <Link
            to="/eventos"
            className={eventsPage ? 'text-slate-50' : ''}
            onClick={onPageSelected}
          >
            Eventos
          </Link>
          <Link to="/">Home</Link>
        </nav>
      </div>
      <hr />
    </div>
  )
}
