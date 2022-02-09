import debounce from 'lodash.debounce'
import { SetStateAction, useEffect, useMemo, useState } from 'react'
import Logo from '../Logo'
import styles from './SearchBox.module.scss'

interface Props extends React.HTMLProps<HTMLInputElement> {
  handleChange(value: string): void
}
type CompanyList = {
  domain: string
  logo?: string
  name: string
}

function SearchBox(props: Props) {
  const [searchTerm, setSearchTerm] = useState('')
  const [companyList, setCompanyList] = useState([] as CompanyList[])

  const { onChange, handleChange, value, ...restProps } = props
  console.log(value)
  useEffect(() => {
    handleChange(searchTerm)
  }, [searchTerm])

  const handleSearch = (query: string) => {
    fetchCompanyData(query)
  }
  const debouncedSearch = useMemo(() => {
    return debounce(handleSearch, 300)
  }, [debounce])

  const handleInputStateChange: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    setSearchTerm(e.target.value)
    debouncedSearch(e.target.value)
  }

  const handleCompanySelect: React.MouseEventHandler<HTMLElement> = (e) => {
    const { index } = e.currentTarget.dataset
    if (!index) return

    const indexNum = Number(index)
    // console.log(companyList[Number(index)])
    setSearchTerm(companyList[indexNum].name)
  }

  const fetchCompanyData = async (companyName: string) => {
    // async call
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
      <div className='search-box'>
        <input
          {...restProps}
          value={searchTerm}
          onChange={handleInputStateChange}
          autoComplete='off'
        />
        {/* <Logo value={} /> */}
      </div>
      {companyList.length !== 0 && (
        <ul className={styles.companyList}>
          {companyList.length === 0 ? (
            <li>Not found</li>
          ) : (
            companyList.map((obj, index) => {
              return (
                <li
                  onClick={handleCompanySelect}
                  data-index={+index}
                  key={+index}
                >
                  <span className={styles.nameContainer}>
                    <Logo url={obj.logo} text={obj.name} />
                    <span className={styles.companyName}>{obj.name}</span>
                  </span>
                  <span className={styles.domain}>{obj.domain}</span>
                </li>
              )
            })
          )}
        </ul>
      )}
    </div>
  )
}

export default SearchBox
