import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

interface InconButtonProps extends ComponentProps<'button'> {
  transparent?: boolean
}

export function IconButton({ transparent, ...props }: InconButtonProps) {
  return (
    <button
      {...props}
      className={twMerge(
        'flex border border-white/10 rounded-md p-1.5 justify-self-center',
        transparent ? 'bg-black/20' : 'bg-white/10',
        props.disabled && 'opacity-50'
      )}
    />
  )
}
