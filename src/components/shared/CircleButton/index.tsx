import styles from './CircleButton.module.scss'

function CircleButton({
  children,
  onClick,
}: {
  children: React.ReactNode
  onClick?: () => void
}) {
  return (
    <button type='button' className={styles.circleBtn} onClick={onClick}>
      {children}
    </button>
  )
}

export default CircleButton
