import * as React from 'react'
import VisuallyHidden from '@reach/visually-hidden'
import { callAll } from 'utils/callAll'
import CircleButton from '../CircleButton'
import Dialog from '../Dialog'
import { FiX } from 'react-icons/fi'
import { DialogProps } from '@reach/dialog'

type ModalContextType = [boolean, React.Dispatch<React.SetStateAction<boolean>>]

const ModalContext = React.createContext(null as unknown as ModalContextType)

export function useModalToggle() {
  const modalContext = React.useContext(ModalContext)
  if (!modalContext) {
    throw Error(
      'to use modal dismiss hook it has to be used within a Modal component'
    )
  }
  return modalContext[1]
}

function Modal({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <ModalContext.Provider value={[isOpen, setIsOpen]}>
      {children}
    </ModalContext.Provider>
  )
}
{
  /* <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
<ModalDismissButton>
  <CircleButton>
    <VisuallyHidden>Close</VisuallyHidden>
    <FiX aria-hidden />
  </CircleButton>
</ModalDismissButton>
</div> */
}

function ModalHeader({
  children,
  title,
}: {
  children?: React.ReactNode
  title: string
}) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1rem',
      }}
    >
      <h3 style={{ textAlign: 'left', fontSize: '1.5em' }}>{title}</h3>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
      >
        {children}
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
  const [, setIsOpen] = React.useContext(ModalContext)
  return React.cloneElement(child, {
    onClick: callAll(() => {
      console.log('dismiss modal')
      setIsOpen(false)
    }, child.props.onClick),
    'aria-label': 'close',
  })
}

function ModalOpenButton({ children }: { children: React.ReactElement }) {
  const child = children
  const [, setIsOpen] = React.useContext(ModalContext)
  return React.cloneElement(child, {
    onClick: callAll(() => {
      console.log('open modal')
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
  const [isOpen, setIsOpen] = React.useContext(ModalContext)
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
