function Button({
  type = 'button',
  variant = 'primary',
  children,
  ...props
}: {
  type?: 'button' | 'submit' | 'reset'
  variant?: 'primary' | 'secondary'
  children: React.ReactNode
  props?: React.HTMLProps<HTMLButtonElement>[]
}) {
  return (
    <button type={type} className={variant + ' btn'} {...props}>
      {children}
    </button>
  )
}

export default Button
