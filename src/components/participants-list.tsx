import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Library,
  Search,
  Trash2,
  X
} from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { IconButton } from './icon-button'
import { Table } from './table/table'
import { TableHeader } from './table/table-header'
import { TableCell } from './table/table-cell'
import { TableRow } from './table/table-row'
import { ChangeEvent, useState } from 'react'
//import { attendees } from '../data/attendees'
import * as Dialog from '@radix-ui/react-dialog'
import { ModelInput } from './model-input'
import { faker } from '@faker-js/faker'
import { toast } from 'sonner'
import { Modal } from './modal'
import { Header } from './header'

export interface Participant {
  id: number
  name: string
  email: string
  createAt: Date
  createInAt: Date
}

interface ParticipantsInEvent {
  participant: Participant
  event: string
}

export function ParticipantsList() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [events] = useState<ParticipantsInEvent[]>(() => {
    const events = localStorage.getItem('participantsInEvent')
    if (events) return JSON.parse(events)
    return []
  })
  const [participants, setParticipantes] = useState<Participant[]>(() => {
    const participantsOnStorage = localStorage.getItem('participants')
    if (participantsOnStorage) {
      return JSON.parse(participantsOnStorage)
    }
    return []
  })
  const totalPages = Math.ceil(participants.length / 10)

  function onParticipantsCreated(name: string, email: string) {
    const newParticipant = {
      id: faker.number.int({ min: 10000, max: 20000 }),
      name,
      email,
      createAt: faker.date.recent({ days: 30 }),
      createInAt: faker.date.recent({ days: 7 })
    }

    const arrayParticipants = [newParticipant, ...participants]
    setParticipantes(arrayParticipants)

    localStorage.setItem('participants', JSON.stringify(arrayParticipants))
  }

  function salveParticipant() {
    if (name === '' || email === '') {
      return
    }
    onParticipantsCreated(name, email)
    setName('')
    setEmail('')

    toast.success('Salvo com sucesso!')
  }

  function deleteParticipant(id: number) {
    const newArrayparticipants = participants.filter(
      participant => participant.id != id
    )

    setParticipantes(newArrayparticipants)
    localStorage.setItem('participants', JSON.stringify(newArrayparticipants))

    toast.success('Participante deletado com sucesso!')
  }

  function goToNextPage() {
    setPage(page + 1)
  }

  function goToPreviousPage() {
    setPage(page - 1)
  }

  function goToFirstPage() {
    setPage(1)
  }

  function goToLastPage() {
    setPage(totalPages)
  }

  function onSearchInputChange(event: ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value)
  }

  function inscritions(id: number) {
    return events.filter(e =>
      e.participant.id.toString().includes(id.toString())
    )
  }

  const filteredAttendees =
    search !== ''
      ? participants.filter(attendee =>
          attendee.name.toLowerCase().includes(search.toLowerCase())
        )
      : participants

  return (
    <div className="max-w-[1216px] mx-auto p-5 gap-10">
      <Header />
      <div className="flex flex-col gap-4">
        <Dialog.Root>
          <div className="flex flex-col md:flex items-center gap-3">
            <h1 className="text-2xl font-bold">Participantes</h1>
            <div className="w-full flex flex-col gap-3 items-center md:flex-row justify-between">
              <div className="bg-transparent px-3 py-1.5 border border-white/10 rounded-lg text-sm flex items-center gap-3">
                <Search className="size-4 text-emerald-300" />
                <input
                  className="bg-transparent flex-1 outline-none"
                  value={search}
                  placeholder="pesquisar..."
                  onChange={onSearchInputChange}
                />
              </div>
              <Dialog.Trigger>
                <IconButton>+ Novo Participante</IconButton>
              </Dialog.Trigger>
            </div>
          </div>
          <Dialog.Content>
            <Modal title="Novo Participante">
              <ModelInput
                label="Nome:"
                type="text"
                placeholder="Inisira seu nome"
                required={true}
                onChange={e => setName(e.target.value)}
                value={name}
              />
              <ModelInput
                label="Email:"
                type="email"
                placeholder="Ex.: nome@gmail.com"
                required={true}
                onChange={e => setEmail(e.target.value)}
                value={email}
              />
              <Dialog.Close
                disabled={name === '' || email === ''}
                className="w-full bg-green-500 p-2 rounded-md"
                onClick={salveParticipant}
              >
                Salvar
              </Dialog.Close>

              <Dialog.Close className="absolute top-0 right-0 p-2 bg-slate-500 rounded-md">
                <X />
              </Dialog.Close>
            </Modal>
          </Dialog.Content>
        </Dialog.Root>
        <div className="overflow-x-auto">
          <Table>
            <thead>
              <tr className="border-b border-white/10">
                <TableHeader>Código</TableHeader>
                <TableHeader>Participantes</TableHeader>
                <TableHeader>Data de inscrição</TableHeader>
                <TableHeader>Data do check-in</TableHeader>
                <TableHeader style={{ width: 64 }}></TableHeader>
              </tr>
            </thead>
            <tbody>
              {filteredAttendees
                .slice((page - 1) * 10, page * 10)
                .map(attendee => {
                  return (
                    <TableRow key={attendee.id}>
                      <TableCell>{attendee.id}</TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-1">
                          <span className="font-semibold text-white">
                            {attendee.name}
                          </span>
                          <span>{attendee.email}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {formatDistanceToNow(attendee.createAt, {
                          locale: ptBR,
                          addSuffix: true
                        })}
                      </TableCell>
                      <TableCell>
                        {formatDistanceToNow(attendee.createInAt, {
                          locale: ptBR,
                          addSuffix: true
                        })}
                      </TableCell>
                      <TableCell>
                        <Dialog.Root>
                          <div className="flex flex-row gap-2.5">
                            <Dialog.DialogTrigger>
                              <IconButton transparent>
                                <Library
                                  onClick={() => inscritions(attendee.id)}
                                />
                              </IconButton>
                            </Dialog.DialogTrigger>
                            <IconButton transparent={true}>
                              <Trash2
                                onClick={() => deleteParticipant(attendee.id)}
                              />
                            </IconButton>
                          </div>
                          <Dialog.Content>
                            <Modal
                              title={`Estes são seus eventos ${attendee.name}`}
                            >
                              {inscritions(attendee.id).map(e => (
                                <div className="w-full text-center rounded-md bg-slate-700 border p-2 text-[20px]">
                                  {e.event}
                                </div>
                              ))}
                              <Dialog.Close className="absolute top-0 right-0 bg-slate-500 rounded-md p-1">
                                <X />
                              </Dialog.Close>
                            </Modal>
                          </Dialog.Content>
                        </Dialog.Root>
                      </TableCell>
                    </TableRow>
                  )
                })}
            </tbody>
            <tfoot>
              <tr>
                <TableCell colSpan={3}>
                  Mostrando {participants.length} de {participants.length} itens
                </TableCell>
                <TableCell colSpan={3} className=" text-right">
                  <div className="inline-flex items-center md:gap-8">
                    <span>
                      Página {page} de {totalPages}
                    </span>
                    <div className="flex gap-1.5">
                      <IconButton transparent={false} disabled={page === 1}>
                        <ChevronsLeft
                          className="size-4"
                          onClick={goToFirstPage}
                        />
                      </IconButton>
                      <IconButton transparent={false} disabled={page === 1}>
                        <ChevronLeft
                          className="size-4"
                          onClick={goToPreviousPage}
                        />
                      </IconButton>
                      <IconButton
                        transparent={false}
                        disabled={page === totalPages}
                      >
                        <ChevronRight
                          className="size-4"
                          onClick={goToNextPage}
                        />
                      </IconButton>
                      <IconButton
                        transparent={false}
                        disabled={page === totalPages}
                      >
                        <ChevronsRight
                          className="size-4"
                          onClick={goToLastPage}
                        />
                      </IconButton>
                    </div>
                  </div>
                </TableCell>
              </tr>
            </tfoot>
          </Table>
        </div>
      </div>
    </div>
  )
}
