import { MouseEventHandler, useEffect, useState } from 'react'
import ReactQuill from 'react-quill'
import Button from '../Button'
import styles from './TextEditor.module.scss'

const modules = {
  toolbar: [
    [{ header: [false, 3, 2, 1] }],
    ['bold', 'italic', 'underline', 'blockquote', 'code-block'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['link'],
  ],
}
const formats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'code-block',
  'list',
  'bullet',
  'indent',
  'link',
]

function TextEditor({
  initialValue,
  onCancel,
  onSave,
}: {
  initialValue?: string
  onCancel: () => void
  onSave: (value: string) => void
}) {
  const [value, setValue] = useState('')
  useEffect(() => {
    if (initialValue === undefined) return
    setValue(initialValue)
  }, [])
  const onChange = (value: string) => {
    setValue(value)
  }

  // const handleSave: React.MouseEventHandler<HTMLButtonElement> = (e) => {
  //   console.log(value)
  //   //dispatch
  //   // setValue(value)
  // }
  // const handleCancel: React.MouseEventHandler<HTMLButtonElement> = (e) => {
  //   console.log(value)
  //   // setValue(value)
  // }

  return (
    <div>
      <ReactQuill
        theme='snow'
        className={'textEditor'}
        modules={modules}
        formats={formats}
        onChange={onChange}
        placeholder='write your notes'
        defaultValue={initialValue}
      />
      <div
        style={{
          display: 'flex',
          margin: '0.8rem 0 0',
        }}
      >
        <Button
          onClick={() => {
            onSave(value)
          }}
          style={{ margin: '0 0.2rem' }}
        >
          Save
        </Button>
        <Button
          onClick={() => {
            onCancel()
          }}
          style={{ margin: '0 0.2rem' }}
          variant='secondary'
        >
          Cancel
        </Button>
      </div>
    </div>
  )
}

export default TextEditor
