import { useFormik } from 'formik'
import { useDispatch } from 'hooks/useDispatch'
import styles from './CreateJobForm.module.scss'
import * as Yup from 'yup'
import SearchBox from 'components/shared/SearchBox'

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
      console.log(values)
      // dispatch ADD
    },
  })

  // useEffect(() => {
  //   //debounce
  //   const timeout = 300
  //   if (values.company && isDebounced.current) {
  //     isDebounced.current = false
  //     return
  //   }

  // const timer = setTimeout(() => {
  //   // async call
  //   //   fetch(
  //   //     'https://autocomplete.clearbit.com/v1/companies/suggest?query=:' + name
  //   // )
  //   // .then(function(response) {
  //   //     return response.json();
  //   // })
  // }, timeout)

  //   return () => {
  //     clearTimeout(timer)
  //   }
  // }, [values.company])

  const onSelectCompany = () => {
    // setValues({
    //   ...values,
    //   company: `@${values.email.split("@")[0]}`,
    //   companyData,
    //   companyImgUrl
    // });
  }
  const handleSearchBoxChange = (value: string) => {
    setValues({ ...values, company: value })
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
          <label htmlFor='company' className={'required ' + styles.inputLabel}>
            Company
          </label>
          <SearchBox
            type='text'
            id='company'
            className={'w-100' + ''}
            placeholder='e.g. Razorpay'
            handleChange={handleSearchBoxChange}
            {...getFieldProps('company')}
          />
        </div>
      </form>
    </div>
  )
}

export default CreateJobForm
