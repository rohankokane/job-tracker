import List from 'components/List'
import { StateType } from 'types'
import JobList from '../JobList'
import styles from './JobListTable.module.scss'

const JobListTable = ({ state }: { state: StateType }): JSX.Element => {
  return (
    <>
      {Object.keys(state).map((key, index) => {
        return (
          <div key={key + index} className={styles.listContainer}>
            <span className={styles.heading}>{key.toUpperCase()}</span>
            <List key={key + index} dropId={key}>
              {state[key].length ? (
                <JobList list={state[key]} key={key} keyTitle={key} />
              ) : (
                <span className='unavailable'>No jobs added</span>
              )}
            </List>
          </div>
        )
      })}
    </>
  )
}

export default JobListTable
