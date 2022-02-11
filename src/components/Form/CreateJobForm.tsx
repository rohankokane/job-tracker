import { useFormik } from 'formik'
import { useDispatch } from 'hooks/useDispatch'
import styles from './CreateJobForm.module.scss'
import * as Yup from 'yup'
import { CompanyData } from 'components/shared/SearchBox'
import { useState } from 'react'
import DropdownCombobox from 'components/shared/SearchBox/SearchComboBox'
import DropdownSelect from 'components/shared/DropdownSelect'
import { statusList } from 'utils/status'

const formDataSchema = Yup.object().shape({
  jobTitle: Yup.string().required('Required'),
  company: Yup.string().required('Required'),
  location: Yup.string(),
  link: Yup.string(),
  description: Yup.string(),
  salary: Yup.string(),
  status: Yup.string(),
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
  console.log({ values })
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
        <>
          <DropdownCombobox
            placeholder='Search company name'
            selectedItem={selectedCompany?.name}
            selectedCompany={selectedCompany}
            handleSelectedItemChange={handleSelectedCompanyChange}
          />
        </>
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
          />
        </>
        <div>
          <label htmlFor='link'>Link</label>
          <input
            type='text'
            id='link'
            className={'w-100' + ''}
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
      </form>
    </div>
  )
}

export default CreateJobForm
