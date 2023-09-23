import PropTypes from 'prop-types'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'

import { TABS_TYPES, TABS_TYPES_LOCALE } from '../../../shared/common'

export const BurgerIngredientsTabs = ({activeTabItem, callback}) => {
  const tabList = [
    {
      value: TABS_TYPES.BUN,
      label: TABS_TYPES_LOCALE[TABS_TYPES.BUN]
    },
    {
      value: TABS_TYPES.SAUCE,
      label: TABS_TYPES_LOCALE[TABS_TYPES.SAUCE]
    },
    {
      value: TABS_TYPES.MAIN,
      label: TABS_TYPES_LOCALE[TABS_TYPES.MAIN]
    },
  ]

  function isActiveTab(tabName) {
    return activeTabItem === tabName
  }

  function setCurrent(newTabName) {
    if (isActiveTab(newTabName)) return

    callback(newTabName)
  }

  return (
    <div style={{ display: 'flex' }} className="mb-10">
      {tabList.map((tabItem) => (            
        <Tab
          value={tabItem.value}
          active={isActiveTab(tabItem.value)}
          onClick={() => setCurrent(tabItem.value)}
          key={tabItem.value}
        >
          {tabItem.label}
        </Tab>
      ))}
    </div>
  )
}

BurgerIngredientsTabs.propTypes = {
  activeTabItem: PropTypes.oneOf(Object.values(TABS_TYPES)).isRequired,
  callback: PropTypes.func.isRequired
}
