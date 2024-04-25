import { useState } from 'react'
import { Participant } from './participants-list'
import * as Dialog from '@radix-ui/react-dialog'
import { ModelInput } from './model-input'
import { toast } from 'sonner'
import { Modal } from './modal'

interface EventCardProps {
  title: string
  desc: string
}

interface ParticipantsInEvent {
  participant: Participant
  event: string
}

export function EventCard({ title, desc }: EventCardProps) {
  const [nameParticipant, setNameParticipante] = useState('')
  const [emailParticipant, setEmailParticipante] = useState('')
  const [participants] = useState<Participant[]>(() => {
    const participants = localStorage.getItem('participants')
    if (participants) {
      return JSON.parse(participants)
    }
    return []
  })
  const [partipantsInEvent, setParticipantsInEvent] = useState<
    ParticipantsInEvent[]
  >(() => {
    const pIE = localStorage.getItem('participantsInEvent')
    if (pIE) {
      return JSON.parse(pIE)
    }
    return []
  })

  function addParticipants() {
    const participant = participants.find(
      p =>
        p.name.toLowerCase().includes(nameParticipant.toLowerCase()) &&
        p.email.includes(emailParticipant)
    )
    if (participant) {
      if (
        partipantsInEvent.some(
          e => participant.id === e.participant.id && title === e.event
        )
      ) {
        alert('Participante já cadastrado neste Evento.')
        return null
      }
      return participant
    }
    alert('Participante não cadastrado!')
    return null
  }

  function salveParticipantInEvent(nome: string, email: string, event: string) {
    const participant: Participant | null = addParticipants()
    if (participant) {
      const newParticipantInEvent: ParticipantsInEvent = {
        participant: {
          ...participant,
          name: nome,
          email: email
        },
        event
      }

      const arrayPIE = [newParticipantInEvent, ...partipantsInEvent]
      setParticipantsInEvent(arrayPIE)
      localStorage.setItem('participantsInEvent', JSON.stringify(arrayPIE))

      setEmailParticipante('')
      setNameParticipante('')

      toast.success('Inscrição realizada!')
    }
  }

  return (
    <Dialog.Root>
      <div className="flex flex-col justify-between gap-5 p-4 bg-slate-500 rounded-md text-slate-100">
        <div className="flex flex-col gap-5">
          <h2 className="text-center font-semibold text-[24px]">{title}</h2>
          <hr />
          <p className="break-words">{desc}</p>
        </div>
        <Dialog.Trigger className="w-full rounded-md bg-green-500 p-2 relative z-100 font-semibold text-slate-100">
          Adicionar Participante
        </Dialog.Trigger>

        <Dialog.Content>
          <Modal title="Entrar no Evento">
            <ModelInput
              label="Nome do Participante:"
              placeholder="Insira o nome"
              type="text"
              onChange={e => {
                setNameParticipante(e.target.value)
              }}
              value={nameParticipant}
            />
            <ModelInput
              label="Email:"
              placeholder="Ex: marcos@gmail.com"
              type="text"
              onChange={e => {
                setEmailParticipante(e.target.value)
              }}
              value={emailParticipant}
            />

            <Dialog.Close
              className="p-2 font-semibold bg-slate-500 rounded-md w-[250px] text-center mx-auto"
              onClick={() =>
                salveParticipantInEvent(
                  nameParticipant,
                  emailParticipant,
                  title
                )
              }
            >
              Salvar
            </Dialog.Close>
          </Modal>
        </Dialog.Content>
      </div>
    </Dialog.Root>
  )
}
