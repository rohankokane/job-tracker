import List from 'components/List'
import Counter from 'components/shared/Counter'
import { StateType } from 'types'
import JobList from '../JobList'
import styles from './JobListTable.module.scss'

type headingType = {
  [k: string]: string
}
const HEADING: headingType = {
  saved: '🗃️',
  applied: '⚡',
  interview: '🚀',
  offer: '🏆',
  rejected: '💣',
}

const JobListTable = ({ state }: { state: StateType }) => {
  const getUnavailableMessage = () => {
    return 'no jobs added'
  }

  return (
    <>
      {Object.keys(state).map((key, index) => {
        return (
          <div key={key + index} className={styles.listContainer}>
            <span className={styles.heading}>
              <span className={styles.headingIcon}>{HEADING[key]}</span>
              {key.toUpperCase()} <Counter value={state[key].length} />
            </span>
            <List key={key + index} dropId={key}>
              {state[key].length ? (
                <JobList list={state[key]} key={key} keyTitle={key} />
              ) : (
                <span className='unavailable'>{getUnavailableMessage()}</span>
              )}
            </List>
          </div>
        )
      })}
    </>
  )
}

export default JobListTable
