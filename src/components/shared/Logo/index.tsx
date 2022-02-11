import styles from './index.module.scss'

function Logo({
  url,
  text,
  className,
}: {
  url?: string
  text: string
  className?: string
}) {
  if (url) {
    return (
      <span
        className={styles.logo + ' ' + className}
        style={{ backgroundImage: `url(${url})` }}
      />
    )
  } else {
    return (
      <span className={styles.logo + ' ' + styles.text + ' ' + className}>
        {text.charAt(0)}
      </span>
    )
  }
}

export default Logo
