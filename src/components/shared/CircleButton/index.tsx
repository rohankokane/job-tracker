import styles from './CircleButton.module.scss'

interface CircleButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  children: React.ReactNode
  onClick?: () => void
  size?: number
}

function CircleButton({
  children,
  className,
  size = 6,
  onClick,
  ...props
}: CircleButtonProps) {
  return (
    <button
      type='button'
      className={styles.circleBtn + ' ' + className}
      onClick={onClick}
      style={{
        width: `${size * 4}px`,
        height: `${size * 4}px`,
      }}
      {...props}
    >
      {children}
    </button>
  )
}

export default CircleButton
