import { Dialog as ReachDialog, DialogProps } from '@reach/dialog'
import styles from './Dialog.module.scss'

interface DialogComponentProps extends DialogProps {
  children: React.ReactNode
}
function Dialog({ children, ...props }: DialogComponentProps) {
  return (
    <ReachDialog className={styles.Dialog} {...props}>
      {children}
    </ReachDialog>
  )
}

export default Dialog
