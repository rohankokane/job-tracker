import styles from './JobInfo.module.scss'

import { JobType } from 'types'
import TextEditor from 'components/shared/TextEditor'
import { useState } from 'react'
import TextViewer from 'components/shared/TextViewer'
import { useDispatch } from 'hooks/useDispatch'

function JobInfo({ data }: { data: JobType }) {
  const [editNotes, setEditNotes] = useState(false)
  const dispatch = useDispatch()
  const handleNotesClick = () => {
    setEditNotes(true)
  }
  const handleEditSave = (value: string) => {
    //dispatch update notes
    dispatch({
      type: 'UPDATE_NOTES',
      payload: { id: data.id, status: data.status, notes: value },
    })
    setEditNotes(false)
  }
  const handleEditCancel = () => {
    setEditNotes(false)
  }
  return (
    <div>
      <div className={styles.grid2}>
        <div className={styles.infoContainer}>
          <div className={styles.infoLabel}>Location:</div>
          <div className={styles.infoData}>{data.location}</div>
        </div>
        <div className={styles.infoContainer}>
          <div className={styles.infoLabel}>Status:</div>
          <div className={styles.infoData}>{data.status}</div>
        </div>
      </div>
      <div className={styles.infoContainer}>
        <div className={styles.infoLabel}>Links:</div>
        <div>
          {/* <span href={data.link} target='_blank' rel='noopener noreferrer'> */}
          <a href={data.link} target='_blank' rel='noopener noreferrer'>
            {data.link}
          </a>
        </div>
      </div>
      <div className={styles.infoContainer}>
        <div className={styles.infoLabel}>Salary:</div>
        <div className={styles.infoData}>{data.salary}</div>
      </div>
      <div className={styles.infoContainer}>
        <div className={styles.infoLabel}>Description:</div>
        <div>
          {data.description.split(/\n/).map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </div>
      <div className={styles.infoContainer}>
        <div className={styles.infoLabel}>
          Notes:
          <span className='helper-msg'> (click on the text below to edit)</span>
        </div>
        <div className='my-1'>
          {editNotes ? (
            <TextEditor
              initialValue={data.notes}
              onCancel={handleEditCancel}
              onSave={handleEditSave}
            />
          ) : (
            <TextViewer onClick={handleNotesClick} value={data.notes} />
          )}
        </div>
      </div>
    </div>
  )
}

export default JobInfo
