import Button from 'components/shared/Button'
import { Modal, ModalContents, ModalOpenButton } from 'components/shared/Modal'
import styles from './Navbar.module.scss'

function NavBar() {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>Job Board</li>
        <Modal>
          <ModalOpenButton>
            <Button>Add</Button>
          </ModalOpenButton>
          <ModalContents aria-label='Login form' title='Login'>
            <div>Hi!</div>
            {/* <LoginForm
              onSubmit={login}
              submitButton={<Button variant="primary">Login</Button>}
            /> */}
          </ModalContents>
        </Modal>
      </ul>
    </nav>
  )
}

export default NavBar
