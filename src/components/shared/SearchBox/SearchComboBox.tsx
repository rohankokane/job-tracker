import { useCombobox } from 'downshift'
import debounce from 'lodash.debounce'
import { useMemo, useState } from 'react'
import { CompanyData } from '.'
import Logo from '../Logo'
import styles from './SearchBox.module.scss'

type Props = {
  selectedCompany?: CompanyData
  selectedItem: any
  handleSelectedItemChange: (changes: any) => void
  placeholder?: string
}

function DropdownCombobox({
  selectedCompany,
  selectedItem,
  handleSelectedItemChange,
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
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
  } = useCombobox({
    items: companyList,
    itemToString: (item) => item.name,
    selectedItem,
    onSelectedItemChange: handleSelectedItemChange,
    onInputValueChange: ({ inputValue }) => {
      //async fetch
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
      <label className='required ' {...getLabelProps({ htmlFor: 'company' })}>
        Company:
      </label>
      <div className={styles.searchBox} {...getComboboxProps()}>
        <input
          placeholder={placeholder}
          className='w-100 '
          {...getInputProps({ type: 'text', id: 'company' })}
        />
        {selectedCompany !== undefined && (
          <Logo
            className={styles.companyLogo}
            text={selectedCompany.name}
            url={selectedCompany.logo}
          />
        )}
      </div>
      <ul {...getMenuProps()}>
        {isOpen &&
          companyList.map(({ name: item, logo, domain }, index) => (
            <li
              style={
                highlightedIndex === index ? { backgroundColor: '#eceef8' } : {}
              }
              key={`${item}${index}`}
              {...getItemProps({ item, index })}
            >
              <span className={styles.nameContainer}>
                <Logo url={logo} text={item} />
                <span className={styles.companyName}>{item}</span>
              </span>
              <span className={styles.domain}>{domain}</span>
            </li>
          ))}
      </ul>
    </div>
  )
}
// style={
//   highlightedIndex === index ? { backgroundColor: '#bde4ff' } : {}
// }
export default DropdownCombobox
