import CreateJobForm from 'components/form/CreateJobForm'
import {
  Modal,
  ModalContents,
  ModalHeader,
  ModalOpenButton,
} from 'components/shared/Modal'

function CreateJobModal({ children }: { children: React.ReactElement }) {
  return (
    <Modal>
      <ModalOpenButton>{children}</ModalOpenButton>
      <ModalContents style={{ maxWidth: '520px' }} aria-label='Add job form'>
        <ModalHeader>
          <h3 style={{ textAlign: 'left', fontSize: '1.5em' }}>
            Add a new job
          </h3>
        </ModalHeader>
        <CreateJobForm />
      </ModalContents>
    </Modal>
  )
}

export default CreateJobModal
