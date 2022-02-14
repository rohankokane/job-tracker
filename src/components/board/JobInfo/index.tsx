import styles from './JobInfo.module.scss'

import { JobType } from 'types'

function JobInfo({ data }: { data: JobType }) {
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
        <div className={styles.infoData}>{data.description}</div>
      </div>
      <div className={styles.infoContainer}>
        <div className={styles.infoLabel}>Notes:</div>
        <div className={styles.infoData}>{data.notes}</div>
      </div>
    </div>
  )
}

export default JobInfo
