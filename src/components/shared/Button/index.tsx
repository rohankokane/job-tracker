function Button({
  type = 'primary',
  children,
  ...props
}: {
  type?: string
  children: React.ReactNode
  props?: React.HTMLProps<HTMLButtonElement>[]
}) {
  return (
    <button type='button' className={'primary' + ' btn'} {...props}>
      {children}
    </button>
  )
}

export default Button
