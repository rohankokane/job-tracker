import CreateJobModal from 'components/ModalForms/CreateJobModal'
import Button from 'components/shared/Button'
import { FiInfo, FiPlus } from 'react-icons/fi'

import styles from './Navbar.module.scss'

function NavBar() {
  return (
    <nav className='nav-contain'>
      <div className={styles.nav + ' contain'}>
        <ul>
          <li>Job Board</li>
          <div className={styles.btnContainer}>
            <FiInfo size={16} />
            <p className={styles.helperText}>
              You can drag the cards to manage the board.
            </p>

            <CreateJobModal>
              <Button variant='primary'>
                <FiPlus style={{ marginRight: '8px' }} size={18} />
                Add
              </Button>
            </CreateJobModal>
          </div>
        </ul>
      </div>
    </nav>
  )
}

export default NavBar
