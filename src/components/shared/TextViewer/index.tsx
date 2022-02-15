import styles from './TextViewer.module.scss'

function TextViewer({
  value,
  onClick,
}: {
  value: string
  onClick?: () => void
}) {
  return (
    <div className={styles.textViewer}>
      {value ? (
        <div
          onClick={() => {
            onClick?.()
          }}
          className={styles.textDiv}
          dangerouslySetInnerHTML={{ __html: value }}
        />
      ) : (
        <div
          onClick={() => {
            onClick?.()
          }}
          className={styles.emptyDiv}
        >
          Write your notes here...
        </div>
      )}
    </div>
  )
}

export default TextViewer
