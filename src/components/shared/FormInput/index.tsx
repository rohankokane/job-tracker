// import { useEffect, useReducer, useState } from 'react'
// import { validate } from 'utils/validators'
type InputStateType = {
  value: string | number
  isTouched: boolean
  isValid: boolean
}
type ActionType = {
  type: 'CHANGE' | 'TOUCH'
  value: string | number
  validators: unknown[]
}

const inputReducer = (state: InputStateType, action: ActionType) => {
  switch (action.type) {
    case 'CHANGE':
      return {
        ...state,
        value: action.value,
        isValid: validate(action.value, action.validators),
      }
    case 'TOUCH': {
      return {
        ...state,
        isTouched: true,
      }
    }
    default:
      return state
  }
}

interface FormInputProps extends React.HTMLProps<HTMLInputElement> {
  id: string
  type: 'text' | 'textarea'
  isRequired?: boolean
  onChange: () => void
  validators?: any
  errorMessage?: string
  initialValue?: string | number
  initialValid?: boolean
  rows?: number
}
function FormInput({
  id = '', //req
  type = 'text',
  isRequired = false,
  placeholder = '',
  onChange: formChange, //req
  validators,
  errorMessage = '',
  initialValue,
  initialValid,
  rows, //if textarea
  ...restProps
}:FormInputProps) {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: initialValue || '',
    isTouched: false,
    isValid: initialValid || false,
  })

  const [showPassword, setShowPassword] = useState(false)
  const { value, isValid, isTouched } = inputState

syncing the state of input field {value, isValid, id} with form state
  useEffect(() => {
    formChange(id, value, isValid)
  }, [id, value, isValid, formChange])

  const handleInputChange = (event: any) => {
    // dispatch({
    //   type: 'CHANGE',
    //   value: event.target.value,
    //   validators: validators || [],
    // })
  }

  const handleFocusChange = () => {

    // dispatch({
    //   type: 'TOUCH',
    // })
  }

  let inputType = type

  return (
    <FormControl
      isRequired={isRequired}
      isInvalid={errorMessage && isTouched && !isValid}
    >
      {inputType === 'textarea' ? (
        <Textarea
          id={id}
          rows={rows || 3}
          value={value}
          onChange={handleInputChange}
          onBlur={handleFocusChange}
          placeholder={placeholder}
          size='sm'
        />
      ) : (
        <Input
          id={id}
          type={inputType}
          value={value}
          onChange={handleInputChange}
          onBlur={handleFocusChange}
          placeholder={placeholder}
          {...restProps}
        />
      )}

      {type === 'password' && (
        <InputRightElement>
          <Button
            aria-label='show password'
            variant={'ghost'}
            onClick={() => setShowPassword((s) => !s)}
          >
            {showPassword ? <ViewIcon /> : <ViewOffIcon />}
          </Button>
        </InputRightElement>
      )}
      {errorMessage && !isValid && isTouched && (
        <FormErrorMessage>{errorMessage}</FormErrorMessage>
      )}
    </FormControl>
  )
}

export default FormInput
