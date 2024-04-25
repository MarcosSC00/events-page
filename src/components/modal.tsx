import { ReactNode } from 'react'

interface ModalProps {
  title: string
  children: ReactNode
}

export function Modal({ title, children }: ModalProps) {
  return (
    <div className="flex w-[90%] md:w-[600px] flex-col gap-5 p-5 text- bg-slate-950 shadow-modal fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md z-10">
      <h2 className="text-[24px] text-center font-semibold">{title}</h2>
      <hr />
      {children}
    </div>
  )
}
