interface Props extends React.HTMLProps<HTMLButtonElement> {
  type?: 'button' | 'submit' | 'reset'
  variant?: 'primary' | 'secondary' | 'danger'
  children: React.ReactNode
}

function Button({
  type = 'button',
  variant = 'primary',
  children,
  style,
  ...props
}: Props) {
  return (
    <button type={type} className={variant + ' btn'} style={style} {...props}>
      {children}
    </button>
  )
}

export default Button
