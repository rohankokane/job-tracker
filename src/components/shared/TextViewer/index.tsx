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
          onKeyUp={() => {
            onClick?.()
          }}
          className={styles.textDiv}
          dangerouslySetInnerHTML={{ __html: value }}
          tabIndex={0}
        />
      ) : (
        <div
          onClick={() => {
            onClick?.()
          }}
          className={styles.emptyDiv}
          onKeyUp={() => {
            onClick?.()
          }}
          tabIndex={0}
        >
          Write your notes here...
        </div>
      )}
    </div>
  )
}

export default TextViewer
