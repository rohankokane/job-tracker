import styles from './index.module.scss'

function Logo({ url, text }: { url?: string; text: string }) {
  if (url) {
    return (
      <span
        className={styles.logo}
        style={{ backgroundImage: `url(${url})` }}
      />
    )
  } else {
    return (
      <span className={styles.logo + ' ' + styles.text}>{text.charAt(0)}</span>
    )
  }
}

export default Logo
