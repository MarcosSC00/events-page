import { ComponentProps } from 'react'

interface ModelInputProps extends ComponentProps<'input'> {
  label: String
}

export function ModelInput({ label, ...props }: ModelInputProps) {
  return (
    <div className="flex flex-col gap-5 w-full">
      <label>{label}</label>
      <input
        {...props}
        className="rounded-md p-2 outline-none text-slate-700"
      />
    </div>
  )
}
