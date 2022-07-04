import * as React from 'react'
import VisuallyHidden from '@reach/visually-hidden'
import { callAll } from 'utils/callAll'
import CircleButton from '../CircleButton'
import Dialog from '../Dialog'
import { FiX } from 'react-icons/fi'
import { DialogProps } from '@reach/dialog'

type ModalContextType = [boolean, React.Dispatch<React.SetStateAction<boolean>>]

const ModalValueContext = React.createContext(null as unknown as boolean)
const ModalToggleContext = React.createContext(
  null as unknown as React.Dispatch<React.SetStateAction<boolean>>
)

export function useModalToggle() {
  const modalContext = React.useContext(ModalToggleContext)
  if (!modalContext) {
    throw Error('to use modal hook it has to be used within a Modal component')
  }
  return modalContext
}

function Modal({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <ModalToggleContext.Provider value={setIsOpen}>
      <ModalValueContext.Provider value={isOpen}>
        {children}
      </ModalValueContext.Provider>
    </ModalToggleContext.Provider>
  )
}

function ModalHeader({
  modalButtons,
  children,
}: {
  modalButtons?: React.ReactNode
  children?: React.ReactNode
}) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '1rem',
      }}
    >
      <div>{children}</div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
      >
        {modalButtons}
        <ModalDismissButton>
          <CircleButton size={8}>
            <VisuallyHidden>Close</VisuallyHidden>
            <FiX size={'20'} aria-hidden />
          </CircleButton>
        </ModalDismissButton>
      </div>
    </div>
  )
}

function ModalDismissButton({ children }: { children: React.ReactElement }) {
  const child = children
  const setIsOpen = React.useContext(ModalToggleContext)
  return React.cloneElement(child, {
    onClick: callAll(() => {
      setIsOpen(false)
    }, child.props.onClick),
    'aria-label': 'close',
  })
}

function ModalOpenButton({ children }: { children: React.ReactElement }) {
  const child = children
  const setIsOpen = React.useContext(ModalToggleContext)
  return React.cloneElement(child, {
    onClick: callAll(() => {
      setIsOpen(true)
    }, child.props.onClick),
  })
}

// function ModalDeleteButton({ children }: { children: React.ReactElement }) {
//   const child = children
//   const [, setIsOpen] = React.useContext(ModalContext)
//   return React.cloneElement(child, {
//     onClick: callAll(() => {
//       console.log('delete')
//       setIsOpen(true)
//     }, child.props.onClick),
//   })
// }

// interface ModalContentsBaseProps {
//   children: React.ReactNode
// }
interface ModalContentsProps extends React.HTMLProps<HTMLDivElement> {
  children: React.ReactNode
}
function ModalContentsBase({ children, ...props }: ModalContentsProps) {
  const setIsOpen = React.useContext(ModalToggleContext)
  const isOpen = React.useContext(ModalValueContext)
  return (
    <Dialog isOpen={isOpen} onDismiss={() => setIsOpen(false)} {...props}>
      {children}
    </Dialog>
  )
}

function ModalContents({ children, ...props }: ModalContentsProps) {
  return <ModalContentsBase {...props}>{children}</ModalContentsBase>
}

export {
  Modal,
  ModalHeader,
  ModalDismissButton,
  ModalOpenButton,
  ModalContents,
}
