import * as React from 'react'
import VisuallyHidden from '@reach/visually-hidden'
import { callAll } from 'utils/callAll'
import CircleButton from '../CircleButton'
import Dialog from '../Dialog'
import { FiX } from 'react-icons/fi'

type ModalContextType = [boolean, React.Dispatch<React.SetStateAction<boolean>>]

const ModalContext = React.createContext(null as unknown as ModalContextType)

function Modal({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <ModalContext.Provider value={[isOpen, setIsOpen]}>
      {children}
    </ModalContext.Provider>
  )
}

function ModalDismissButton({ children }: { children: React.ReactElement }) {
  const child = children
  const [, setIsOpen] = React.useContext(ModalContext)
  return React.cloneElement(child, {
    onClick: callAll(() => {
      console.log('dismiss')
      setIsOpen(false)
    }, child.props.onClick),
  })
}

function ModalOpenButton({ children }: { children: React.ReactElement }) {
  const child = children
  const [, setIsOpen] = React.useContext(ModalContext)
  return React.cloneElement(child, {
    onClick: callAll(() => {
      console.log('open')
      setIsOpen(true)
    }, child.props.onClick),
  })
}

function ModalDeleteButton({ children }: { children: React.ReactElement }) {
  const child = children
  const [, setIsOpen] = React.useContext(ModalContext)
  return React.cloneElement(child, {
    onClick: callAll(() => {
      console.log('delete')
      setIsOpen(true)
    }, child.props.onClick),
  })
}

interface ModalContentsBaseProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
}
function ModalContentsBase({ children, ...props }: ModalContentsBaseProps) {
  const [isOpen, setIsOpen] = React.useContext(ModalContext)
  return (
    <Dialog isOpen={isOpen} onDismiss={() => setIsOpen(false)} {...props}>
      {children}
    </Dialog>
  )
}

interface ModalContentsProps extends React.HTMLAttributes<HTMLElement> {
  title: string
  children: React.ReactNode
}
function ModalContents({ title, children, ...props }: ModalContentsProps) {
  return (
    <ModalContentsBase {...props}>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <ModalDismissButton>
          <CircleButton>
            <VisuallyHidden>Close</VisuallyHidden>
            <FiX aria-hidden />
          </CircleButton>
        </ModalDismissButton>
      </div>
      <h3 style={{ textAlign: 'center', fontSize: '2em' }}>{title}</h3>
      {children}
    </ModalContentsBase>
  )
}

export { Modal, ModalDismissButton, ModalOpenButton, ModalContents }
