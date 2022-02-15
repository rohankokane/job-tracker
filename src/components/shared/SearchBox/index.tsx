import debounce from 'lodash.debounce'
import { useEffect, useMemo, useRef, useState } from 'react'
import { CompanyData } from 'types'
import Logo from '../Logo'
import styles from './SearchBox.module.scss'

interface Props extends React.HTMLProps<HTMLInputElement> {
  handleChange(value: string): void
  setCompanyData: React.Dispatch<React.SetStateAction<CompanyData | undefined>>
  companyData: CompanyData | undefined
}

function SearchBox(props: Props) {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchBoxFocus, setSearchBoxFocus] = useState(false)
  const [companyList, setCompanyList] = useState([] as CompanyData[])
  const searchBoxRef = useRef<HTMLInputElement>(null)

  const {
    value,
    onChange,
    companyData,
    setCompanyData,
    handleChange,
    ...restProps
  } = props

  useEffect(() => {
    handleChange(searchTerm)
  }, [searchTerm])

  useEffect(() => {
    setTimeout(() => {
      if (searchBoxFocus) {
        window.addEventListener('click', closeList)
      } else {
        window.removeEventListener('click', closeList)
      }
    }, 0)
    return () => {
      window.removeEventListener('click', closeList)
    }
  }, [searchBoxFocus])

  const closeList = () => {
    setSearchBoxFocus(false)
  }

  const handleSearch = (query: string) => {
    fetchCompanyData(query)
  }
  const debouncedSearch = useMemo(() => {
    return debounce(handleSearch, 300)
  }, [debounce])

  const handleInputStateChange: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    if (companyData !== undefined) {
      setCompanyData(undefined)
    }
    setSearchTerm(e.target.value)
    debouncedSearch(e.target.value)
  }

  const handleCompanySelect: React.MouseEventHandler<HTMLElement> = (e) => {
    e.stopPropagation()
    if (searchBoxRef.current == null) return

    searchBoxRef.current.focus()

    const { index } = e.currentTarget.dataset
    if (!index) return

    const indexNum = Number(index)
    setSearchTerm(companyList[indexNum].name)
    setCompanyData({ ...companyList[indexNum] })
    setCompanyList([])
  }

  const handleKeySelect: React.KeyboardEventHandler<HTMLElement> = (e) => {
    // e.stopPropagation()

    if (e.key === ' ' || e.key === 'Spacebar' || e.key === 'Enter') {
      const { index } = e.currentTarget.dataset
      if (!index) return

      const indexNum = Number(index)
      setSearchTerm(companyList[indexNum].name)
      setCompanyData({ ...companyList[indexNum] })
      setCompanyList([])

      // if (searchBoxRef.current == null) return
      // searchBoxRef.current.focus()
    }
  }

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
      <div className='search-box'>
        <input
          {...restProps}
          value={searchTerm}
          onChange={handleInputStateChange}
          autoComplete='off'
          onFocus={() => {
            setSearchBoxFocus(true)
          }}
          ref={searchBoxRef}
        />
        {companyData !== undefined && (
          <Logo text={companyData.name} url={companyData?.logo} />
        )}
      </div>
      {companyList.length !== 0 && (
        <ul
          className={
            styles.companyList + ' ' + (searchBoxFocus ? styles.focused : '')
          }
        >
          {companyList.length === 0 ? (
            <li>Not found</li>
          ) : (
            companyList.map((obj, index) => {
              return (
                <li
                  tabIndex={0}
                  onClick={handleCompanySelect}
                  onKeyDown={handleKeySelect}
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
