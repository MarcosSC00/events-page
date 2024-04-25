import * as Dialog from '@radix-ui/react-dialog'
import { EventCard } from './event-card'
import { ModelInput } from './model-input'
import { useState } from 'react'
import { toast } from 'sonner'
import { Modal } from './modal'
import { Header } from './header'

interface NewEvent {
  name: string
  desc: string
}

export function Events() {
  const [nameEvent, setNameEvent] = useState('')
  const [descEvent, setDescEvent] = useState('')
  const [events, setEvents] = useState<NewEvent[]>(() => {
    const events = localStorage.getItem('events')
    if (events) {
      return JSON.parse(events)
    }
    return []
  })

  function onCreatedNewEvent(name: string, desc: string) {
    const newEvent = {
      name,
      desc
    }
    const arrayEvents = [newEvent, ...events]
    setEvents(arrayEvents)

    localStorage.setItem('events', JSON.stringify(arrayEvents))
  }

  function salveEvent() {
    if (nameEvent === '' || descEvent === '') {
      return
    }
    onCreatedNewEvent(nameEvent, descEvent)
    setDescEvent('')
    setNameEvent('')

    toast.success('Evento salvo!')
  }
  return (
    <div className="max-w-[1216px] mx-auto p-5 gap-10">
      <Header />
      <Dialog.Root>
        <div className="flex flex-col gap-10">
          <h1 className="text-2xl font-bold">Eventos</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {events.map(event => (
              <EventCard
                title={event.name}
                desc={event.desc}
                key={event.name}
              />
            ))}
          </div>

          <Dialog.Trigger className="relative p-2 font-semibold bg-slate-500 rounded-md w-[90%] md:w-[250px] text-center mx-auto">
            + Novo evento
          </Dialog.Trigger>

          <Dialog.Content>
            <Modal title="Novo Evento">
              <ModelInput
                label="Nome do Evento:"
                placeholder="Ex.: Banco de Dados"
                type="text"
                onChange={e => {
                  setNameEvent(e.target.value)
                }}
                value={nameEvent}
              />
              <ModelInput
                label="Descrição:"
                placeholder="Resuma o envento aqui"
                type="text"
                onChange={e => {
                  setDescEvent(e.target.value)
                }}
                value={descEvent}
              />

              <Dialog.Close
                className="w-full p-2 font-semibold bg-green-500 rounded-md mx-auto"
                onClick={salveEvent}
              >
                Salvar
              </Dialog.Close>
            </Modal>
          </Dialog.Content>
        </div>
      </Dialog.Root>
    </div>
  )
}
