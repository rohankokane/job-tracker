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
import { ModalAction } from 'reducers/modalReducer'

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
  if (url === '') return url
  return url.split(',').reduce((finalUrl, url) => {
    if (url.length === 0) return finalUrl
    url = url.trim()
    if (url.substring(0, 4) !== 'http') {
      finalUrl = finalUrl + 'http://' + url + ', '
    } else {
      finalUrl = finalUrl + url + ', '
    }
    return finalUrl
  }, '')
}

function CreateJobForm({
  initialValue,
  modalDispatch,
}: {
  initialValue?: JobType
  modalDispatch?: React.Dispatch<ModalAction>
}) {
  const dispatch = useDispatch()
  const setIsOpenModal = useModalToggle()
  const [selectedCompany, setSelectedCompany] = useState<CompanyData>({
    name: '',
    logo: '',
    domain: '',
  })

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
        let newLinks = initialValue.link
        if (initialValue.link.trim() !== values.link.trim())
          newLinks = URL(values.link.trim())

        const data = {
          ...initialValue,
          ...values,
          companyData: { ...selectedCompany },
          link: newLinks,
          logoUrl: selectedCompany.logo || '',
          lastUpdated: Date.now(),
          prevStatus: initialValue.status,
        }

        dispatch({ type: 'UPDATE', payload: data })

        const isStatusChanged = initialValue.status !== data.status
        modalDispatch?.({
          type: 'EDIT_SUCCESS',
          payload: { isStatusChanged, status: data.status },
        })
      } else {
        const companyData = selectedCompany
        const data = {
          ...values,
          id: uuidv4().slice(0, 10),
          link: URL(values.link),
          logoUrl: companyData.logo || '',
          companyData,
          notes: '',
          lastUpdated: Date.now(),
        }

        dispatch({ type: 'ADD', payload: data })
        setIsOpenModal(false)
      }
    },
  })

  useEffect(() => {
    if (initialValue === undefined) return
    setSelectedCompany({ ...initialValue.companyData })
  }, [])

  const handleSelectedCompanyChange = (selectedItem: CompanyData) => {
    setSelectedCompany({ ...selectedItem })
  }
  const handleStatusChange = (selectedStatus: string) => {
    setValues({ ...values, status: selectedStatus })
  }
  const handleCompanyNameChange = (
    companyName: string,
    selectedItem: CompanyData
  ) => {
    if (companyName !== selectedItem.name) {
      setSelectedCompany({ name: companyName, logo: '', domain: '' })
    }
    setValues({ ...values, company: companyName })
  }

  return (
    <div>
      <form className={styles.newJobForm} onSubmit={handleSubmit}>
        <div>
          <span className={styles.inputLabelError}>
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
          <span className={styles.inputLabelError}>
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
        <div>
          <DropdownSelect
            label={'Status'}
            helperText={'Select the current status of the application'}
            items={statusList}
            initialSelectedItem={
              initialValue === undefined
                ? statusList[0]
                : statusListObject[initialValue.status]
            }
            className={styles.dropdownSelect}
            handleSelectedItem={handleStatusChange}
          />
        </div>
        <div>
          <label htmlFor='link'>Links</label>
          <input
            type='text'
            id='link'
            placeholder='e.g. https://abc.com, https://xyz.com'
            className={'w-100' + ''}
            autoComplete='off'
            {...getFieldProps('link')}
          />
          <p className={styles.helperText}>
            {`Multiple links can be added by separating them with a comma " , "`}
          </p>
        </div>
        <div>
          <label htmlFor='salary'>Salary</label>
          <input
            type='text'
            id='salary'
            className={'w-100' + ''}
            placeholder='e.g. 18,00,000'
            {...getFieldProps('salary')}
          />
          <p className={styles.helperText}>
            Salary can be mentioned with the currency eg. 100,000 USD.
          </p>
        </div>
        <div>
          <label htmlFor='description'>Description</label>
          <textarea
            id='description'
            rows={6}
            className={'w-100 '}
            {...getFieldProps('description')}
          />
          <p className={styles.helperText}>
            You can add job description / requirements here.
          </p>
        </div>
        <div className={styles.formFooter}>
          {initialValue !== undefined && (
            <Button
              variant='secondary'
              onClick={() => {
                modalDispatch?.({
                  type: 'EDIT_CANCEL',
                })
              }}
            >
              Cancel
            </Button>
          )}
          <Button variant='primary' type='submit'>
            {initialValue === undefined ? 'Save' : 'Update'}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default CreateJobForm
