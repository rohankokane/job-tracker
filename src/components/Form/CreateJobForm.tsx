import { useDispatch } from 'hooks/useDispatch'
import styles from './CreateJobForm.module.scss'

function CreateJobForm() {
  const dispatch = useDispatch()
  // const [formState, inputHandler, setFormData] = useForm(
  //   {
  //     email: {
  //       value: '',
  //       isValid: false,
  //     },
  //     username: {
  //       value: '',
  //       isValid: false,
  //     },
  //     fullname: {
  //       value: '',
  //       isValid: false,
  //     },
  //     password: {
  //       value: '',
  //       isValid: false,
  //     },
  //     bio: {
  //       value: '',
  //       isValid: false,
  //     },
  //   },
  //   false
  // )
  const onSubmit = () => {
    console.log('form submitted create job')
    // dispatch form data to add with status
  }
  return (
    <div>
      <form className={styles.newJobForm} onSubmit={onSubmit}>
        <div>
          <label className={'required ' + styles.inputLabel}>Title</label>
          <input
            type='text'
            defaultValue='software developer'
            className='w-100'
            required
          />
        </div>
        <div>
          <label className={'required ' + styles.inputLabel}>Company</label>
          <input type='text' defaultValue='' className='w-100' required />
        </div>
      </form>
    </div>
  )
}
{
  /* <FormInput
      id='fullname'
      type='text'
      onChange={inputHandler}
      placeholder='Full name'
      validators={[VALIDATOR_REQUIRE()]}
      errorMessage='Please enter your full name.'
/> */
}

export default CreateJobForm
