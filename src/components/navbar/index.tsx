import CreateJobModal from 'components/ModalForms/CreateJobModal'
import Button from 'components/shared/Button'

import styles from './Navbar.module.scss'

function NavBar() {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>Job Board</li>
        <div>
          <CreateJobModal>
            <Button variant='primary'>Add</Button>
          </CreateJobModal>
        </div>
      </ul>
    </nav>
  )
}

export default NavBar
