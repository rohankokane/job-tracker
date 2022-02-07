import styles from './CircleButton.module.scss'

interface CircleButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  children: React.ReactNode
  onClick?: () => void
}

function CircleButton({
  children,
  className,
  onClick,
  ...props
}: CircleButtonProps) {
  return (
    <button
      type='button'
      className={styles.circleBtn + ' ' + className}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  )
}

export default CircleButton
