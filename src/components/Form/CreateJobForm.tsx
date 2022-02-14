import { useFormik } from 'formik'
import { useDispatch } from 'hooks/useDispatch'
import styles from './CreateJobForm.module.scss'
import * as Yup from 'yup'
import { CompanyData, JobType, StateType } from 'types'
import { useEffect, useState } from 'react'
import DropdownCombobox from 'components/shared/SearchBox/SearchComboBox'
import DropdownSelect from 'components/shared/DropdownSelect'
import { statusList, statusListObject } from 'utils/status'
import Button from 'components/shared/Button'
import { useModalToggle } from 'components/shared/Modal'
import { v4 as uuidv4 } from 'uuid'

const formDataSchema = Yup.object().shape({
  jobTitle: Yup.string().required('Required'),
  company: Yup.string().required('Required'),
  location: Yup.string(),
  link: Yup.string(),
  description: Yup.string(),
  salary: Yup.string(),
  status: Yup.string(),
  // companyData: Yup.object(),
})
const initialFormState = {
  // id: '',
  jobTitle: '',
  company: '',
  // lastUpdated: '',
  // deadline: '',
  location: '',
  link: '',
  description: '',
  salary: '',
  status: 'saved',
}

type FormDataType = Yup.InferType<typeof formDataSchema>

const URL = (url: string) => {
  if (url.substring(0, 4) === 'http') return url
  else {
    return 'http://' + url
  }
}

function CreateJobForm({ initialValue }: { initialValue?: JobType }) {
  const dispatch = useDispatch()
  const setIsOpenModal = useModalToggle()
  const [selectedCompany, setSelectedCompany] = useState<CompanyData>()

  const {
    values,
    handleSubmit,
    submitCount,
    getFieldProps,
    setValues,
    errors,
    setFieldValue,
  } = useFormik({
    initialValues: initialValue ?? initialFormState,
    validationSchema: formDataSchema,
    onSubmit: (values) => {
      if (initialValue !== undefined) {
        if (selectedCompany === undefined) return

        const data = { ...initialValue, ...values }
        dispatch({ type: 'UPDATE', payload: data })
      } else {
        const defaultCompanyData = {
          name: values.company,
          domain: '',
          logo: '',
        }
        const companyData = selectedCompany ?? defaultCompanyData
        const data = {
          ...values,
          id: uuidv4().slice(0, 10),
          link: URL(values.link),
          logoUrl: selectedCompany?.logo || '',
          companyData,
          notes: '',
        }
        dispatch({ type: 'ADD', payload: data })
      }
      setIsOpenModal(false)
    },
  })

  useEffect(() => {
    if (initialValue === undefined) return
    setSelectedCompany({ ...initialValue.companyData })
  }, [])

  const handleSelectedCompanyChange = (
    selectedItem: CompanyData | undefined
  ) => {
    if (selectedItem === undefined) {
      setSelectedCompany(undefined)
      setValues({ ...values, company: '' })
    } else {
      setSelectedCompany({ ...selectedItem })
      setValues({ ...values, company: selectedItem.name })
    }
  }
  const handleStatusChange = (selectedStatus: string) => {
    setValues({ ...values, status: selectedStatus })
  }
  const handleCompanyNameChange = (companyName: string) => {
    setValues({ ...values, company: companyName })
  }

  return (
    <div>
      <form className={styles.newJobForm} onSubmit={handleSubmit}>
        <div>
          <span className={styles.inputLabel}>
            <label htmlFor='jobTitle' className={'required '}>
              Title
            </label>
            {errors['jobTitle'] && submitCount !== 0 && (
              <span className={styles.errorMsg}>{errors['jobTitle']}</span>
            )}
          </span>
          <input
            type='text'
            id='jobTitle'
            className={'w-100' + ''}
            placeholder='e.g. Web Developer '
            {...getFieldProps('jobTitle')}
          />
        </div>
        <div>
          <span className={styles.inputLabel}>
            <label htmlFor='company' className={'required '}>
              Company
            </label>
            {errors['company'] && submitCount !== 0 && (
              <span className={styles.errorMsg}>{errors['company']}</span>
            )}
          </span>
          <DropdownCombobox
            placeholder='Search company name'
            selectedItem={selectedCompany}
            handleSelectedItemChange={handleSelectedCompanyChange}
            handleInputChange={handleCompanyNameChange}
            {...getFieldProps('company')}
          />
        </div>
        <div>
          <label htmlFor='location'>Location</label>
          <input
            type='text'
            id='location'
            className={'w-100' + ''}
            {...getFieldProps('location')}
          />
        </div>
        <>
          <DropdownSelect
            label={'Status'}
            items={statusList}
            initialSelectedItem={
              initialValue === undefined
                ? statusList[0]
                : statusListObject[initialValue.status]
            }
            className={styles.dropdownSelect}
            handleSelectedItem={handleStatusChange}
          />
        </>
        <div>
          <label htmlFor='link'>Link</label>
          <input
            type='text'
            id='link'
            className={'w-100' + ''}
            autoComplete='off'
            {...getFieldProps('link')}
          />
        </div>
        <div>
          <label htmlFor='salary'>Salary</label>
          <input
            type='text'
            id='salary'
            className={'w-100' + ''}
            {...getFieldProps('salary')}
          />
        </div>
        <div>
          <label htmlFor='description'>Description</label>
          <textarea
            id='description'
            rows={3}
            className={'w-100 '}
            {...getFieldProps('description')}
          />
        </div>
        <div className={styles.formFooter}>
          <Button variant='primary' type='submit'>
            {initialValue === undefined ? 'Add job' : 'Save'}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default CreateJobForm
