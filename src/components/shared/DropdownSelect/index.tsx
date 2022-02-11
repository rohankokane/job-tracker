import { useSelect } from 'downshift'
import { FiChevronDown } from 'react-icons/fi'
import { HEADING } from 'utils/status'
import styles from './Dropdown.module.scss'

// type OptionValue = number | string

type Option = {
  value: string
  label: string
  icon: string
}

type SelectProps = {
  // options: Option<Type>[];
  items: Option[]
  initialSelectedItem?: Option
  label: string
  className?: string
}

// function Select<Type extends OptionValue>({ options }: SelectProps<Type>) {

function DropdownSelect({
  items,
  initialSelectedItem,
  label,
  className,
}: SelectProps) {
  const {
    isOpen,
    selectedItem,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
  } = useSelect({
    items,
    itemToString: (item) => (item ? item.label : ''),
    initialSelectedItem,
  })

  return (
    <div className={styles.dropdownContainer}>
      <label {...getLabelProps()}>{label}</label>
      <button
        type='button'
        className={styles.dropdownSelect + ' w-100 ' + className}
        {...getToggleButtonProps()}
      >
        {selectedItem && (
          <span className={styles.listIcon}>{HEADING[selectedItem.value]}</span>
        )}

        {selectedItem?.label}
        <FiChevronDown className={styles.downArrow} />
      </button>
      <ul {...getMenuProps()}>
        {isOpen &&
          items.map(({ value, label, icon }, index) => (
            <li
              style={
                highlightedIndex === index ? { backgroundColor: '#eceef8' } : {}
              }
              key={`${value}${index}`}
              {...getItemProps({ item: { value, label, icon }, index })}
            >
              <span className={styles.listIcon}>{HEADING[value]}</span>
              {label}
            </li>
          ))}
      </ul>
    </div>
  )
}

export default DropdownSelect
