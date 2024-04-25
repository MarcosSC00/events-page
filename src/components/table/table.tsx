import { ComponentProps } from 'react'

interface TableProps extends ComponentProps<'table'> {}

export function Table(props: TableProps) {
  return (
    <div className="border border-white/10 rounded-lg p-5">
      <table className="w-max md:w-full" {...props} />
    </div>
  )
}
