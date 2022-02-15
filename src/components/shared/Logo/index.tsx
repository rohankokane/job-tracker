import styles from './index.module.scss'

function Logo({
  url,
  text,
  className,
  size = 6,
}: {
  url?: string
  text: string
  className?: string
  size?: number
}) {
  if (url) {
    return (
      <span
        className={styles.logo + ' ' + className}
        style={{
          backgroundImage: `url(${url})`,
          width: `${size * 4}px`,
          height: `${size * 4}px`,
        }}
      />
    )
  } else {
    return (
      <span
        style={{
          width: `${size * 4}px`,
          height: `${size * 4}px`,
        }}
        className={styles.logo + ' ' + styles.text + ' ' + className}
      >
        {text.charAt(0)}
      </span>
    )
  }
}

export default Logo
