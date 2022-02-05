import styles from './IconButton.module.scss'

function IconButton({
  children,
  className,
  onClick,
}: {
  children: React.ReactNode
  className: string
  onClick: () => void
}) {
  return (
    <button
      type='button'
      className={styles.iconBtn + ' ' + className}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default IconButton
