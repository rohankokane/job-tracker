import CreateJobForm from 'components/Form/CreateJobForm'
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
        <ModalHeader title='Add job' />
        <CreateJobForm />
      </ModalContents>
    </Modal>
  )
}

export default CreateJobModal
