import CreateJobModal from 'components/ModalForms/CreateJobModal'
import Button from 'components/shared/Button'
import { FiInfo } from 'react-icons/fi'

import styles from './Navbar.module.scss'

function NavBar() {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>Job Board</li>
        <div className={styles.btnContainer}>
          <FiInfo size={16} />
          <p className={styles.helperText}>
            Try dragging the cards to manage the board
          </p>

          <CreateJobModal>
            <Button variant='primary'>Add</Button>
          </CreateJobModal>
        </div>
      </ul>
    </nav>
  )
}

export default NavBar
