import { Link } from 'react-router-dom'
import { Header } from './header'

export function HomePage() {
  return (
    <div className="flex flex-col text-center w-full my-auto text-slate-50 max-w-[1216px] mx-auto p-5 gap-10">
      <Header />
      <h1 className="font-bold text-[40px] mb-10">Bem Vindo!</h1>
      <h2 className="font-semibold text-[30px] mb-10">
        Veja seus eventos e participantes
      </h2>
      <div className="flex md:flex-row justify-evenly">
        <Link
          className="font-semibold p-3 rounded-md shadow-modal"
          to={'/participantes'}
        >
          Participantes
        </Link>
        <Link
          className="font-semibold p-3 rounded-md shadow-modal"
          to={'eventos'}
        >
          Eventos
        </Link>
      </div>
    </div>
  )
}
