import { useCombobox } from 'downshift'
import debounce from 'lodash.debounce'
import { useMemo, useState } from 'react'
import { CompanyData } from 'types'
import Logo from '../Logo'
import styles from './SearchBox.module.scss'

type Props = {
  selectedItem: CompanyData
  handleSelectedItemChange: (arg: CompanyData) => void
  handleInputChange: (arg: string, arg2: CompanyData) => void
  placeholder?: string
}

function DropdownCombobox({
  selectedItem,
  handleSelectedItemChange,
  handleInputChange,
  placeholder,
}: Props) {
  const [companyList, setCompanyList] = useState([] as CompanyData[])

  const handleSearch = (query: string) => {
    fetchCompanyData(query)
  }
  const debouncedSearch = useMemo(() => {
    return debounce(handleSearch, 300)
  }, [debounce])

  const {
    isOpen,
    inputValue,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
  } = useCombobox({
    items: companyList,
    itemToString: (item) => (item ? item.name : ''),
    selectedItem: selectedItem,
    onSelectedItemChange: ({ selectedItem }) => {
      if (selectedItem) {
        handleSelectedItemChange(selectedItem)
      }
    },
    onInputValueChange: (val) => {
      const { inputValue, selectedItem } = val
      console.log({ val }, 'INPUT')

      if (inputValue === undefined) return
      if (selectedItem == null) return

      handleInputChange(inputValue, selectedItem)
      // if (selectedItem.name !== inputValue) {
      //   console.log({ val }, 'SELECTED')

      //   handleSelectedItemChange(selectedItem)
      // }
      if (inputValue) {
        debouncedSearch(inputValue)
      }
    },
  })

  const fetchCompanyData = async (companyName: string) => {
    fetch(
      'https://autocomplete.clearbit.com/v1/companies/suggest?query=:' +
        companyName
    )
      .then(function (response) {
        return response.json()
      })
      .then((data) => {
        setCompanyList([...data])
      })
  }

  return (
    <div className={styles.boxContainer}>
      <div className={styles.searchBox} {...getComboboxProps()}>
        <input
          placeholder={placeholder}
          className='w-100 '
          {...getInputProps({ type: 'text', id: 'company' })}
        />
        {selectedItem !== undefined && (
          <Logo
            className={styles.companyLogo}
            text={selectedItem.name}
            url={selectedItem.logo}
          />
        )}
      </div>
      <ul {...getMenuProps()}>
        {isOpen &&
          companyList.map((item, index) => (
            <li
              style={
                highlightedIndex === index ? { backgroundColor: '#eceef8' } : {}
              }
              key={`${item}${index}`}
              {...getItemProps({ item, index })}
            >
              <span className={styles.nameContainer}>
                <Logo url={item?.logo} text={item.name} />
                <span className={styles.companyName}>{item.name}</span>
              </span>
              <span className={styles.domain}>{item.domain}</span>
            </li>
          ))}
      </ul>
    </div>
  )
}

export default DropdownCombobox
