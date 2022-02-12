import { useFormik } from 'formik'
import { useDispatch } from 'hooks/useDispatch'
import styles from './CreateJobForm.module.scss'
import * as Yup from 'yup'
import { CompanyData } from 'types'
import { useState } from 'react'
import DropdownCombobox from 'components/shared/SearchBox/SearchComboBox'
import DropdownSelect from 'components/shared/DropdownSelect'
import { statusList } from 'utils/status'
import Button from 'components/shared/Button'
import { useModalToggle } from 'components/shared/Modal'

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

function CreateJobForm() {
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
    initialValues: initialFormState,
    validationSchema: formDataSchema,
    onSubmit: (values) => {
      console.log('SUBMITTED')
      const defaultCompanyData = {
        name: values.company,
        domain: '',
        logo: '',
      }
      console.log(values)
      const companyData = selectedCompany ?? defaultCompanyData

      const data = {
        ...values,
        logoUrl: selectedCompany?.logo || '',
        companyData,
        notes: '',
      }
      dispatch({ type: 'ADD', payload: data })
      setIsOpenModal(false)
      // dispatch ADD
    },
  })

  // const handleSearchBoxChange = (value: string) => {
  //   setValues({ ...values, company: value })
  // }

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
  const handleInputChange = (companyName: string) => {
    setValues({ ...values, company: companyName })
  }

  // const formSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
  //   e.preventDefault()
  //   console.log('submitting....')
  //   handleSubmit(e)
  // }

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
            handleInputChange={handleInputChange}
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
            initialSelectedItem={statusList[0]}
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
            Add job
          </Button>
        </div>
      </form>
    </div>
  )
}

export default CreateJobForm
