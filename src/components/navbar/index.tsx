import Button from 'components/shared/Button'
import styles from './Navbar.module.scss'

function NavBar() {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>Job Board</li>
        <Button>Add</Button>
      </ul>
    </nav>
  )
}

export default NavBar
