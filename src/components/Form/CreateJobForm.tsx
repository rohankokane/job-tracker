import { useFormik } from 'formik'
import { useDispatch } from 'hooks/useDispatch'
import styles from './CreateJobForm.module.scss'
import * as Yup from 'yup'
import SearchBox, { CompanyData } from 'components/shared/SearchBox'
import { useState } from 'react'
import DropdownCombobox from 'components/shared/SearchBox/DropdownMenu'

const formDataSchema = Yup.object().shape({
  jobTitle: Yup.string().required('Required'),
  company: Yup.string().required('Required'),
  location: Yup.string(),
  link: Yup.string(),
  description: Yup.string(),
  salary: Yup.string(),
  status: Yup.string(),
  logoUrl: Yup.string(),
})
const initialFormState = {
  id: '',
  jobTitle: '',
  company: '',
  lastUpdated: '',
  deadline: '',
  location: '',
  link: '',
  description: '',
  salary: '',
  status: '',
  logoUrl: '',
}

type FormDataType = Yup.InferType<typeof formDataSchema>

function CreateJobForm() {
  const dispatch = useDispatch()
  const [selectedCompany, setSelectedCompany] = useState<CompanyData>()

  const {
    values,
    handleSubmit,
    submitCount,
    getFieldProps,
    setValues,
    touched,
    errors,
    setFieldValue,
  } = useFormik({
    initialValues: initialFormState,
    validationSchema: formDataSchema,
    onSubmit(values) {
      console.log('SUBMITTED')
      // console.log(values)
      // dispatch ADD
    },
  })

  // const handleSearchBoxChange = (value: string) => {
  //   setValues({ ...values, company: value })
  // }

  const handleSelectedCompanyChange = (changes: any) => {
    console.log({ changes })

    setSelectedCompany({ ...changes.selectedItem })
    // setValues({ ...values, company: value })
  }

  return (
    <div>
      <form className={styles.newJobForm} onSubmit={handleSubmit}>
        <div>
          <label htmlFor='jobTitle' className={'required ' + styles.inputLabel}>
            Title
          </label>
          <input
            type='text'
            id='jobTitle'
            className={'w-100' + ''}
            placeholder='e.g. Web Developer '
            {...getFieldProps('jobTitle')}
          />
        </div>
        <div>
          <DropdownCombobox
            selectedItem={selectedCompany?.name}
            selectedCompany={selectedCompany}
            handleSelectedItemChange={handleSelectedCompanyChange}
          />
        </div>
        <div>
          <label htmlFor='status' className={'required ' + styles.inputLabel}>
            Status
          </label>
          <input className='w-100' type='text' id='status' />
        </div>
      </form>
    </div>
  )
}

export default CreateJobForm
