import type { FC } from "react"
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components"

import { TABS_TYPES, TABS_TYPES_LOCALE } from "../../../shared/common"

import { TIngredientTypes } from '../../../types/common'

type TProps = {
  activeTabItem: TIngredientTypes,
  callback: (arg: TIngredientTypes) => void,
}

export const BurgerIngredientsTabs: FC<TProps> = ({ activeTabItem, callback }) => {
  const tabList = [
    {
      value: TABS_TYPES.BUN,
      label: TABS_TYPES_LOCALE[TABS_TYPES.BUN],
    },
    {
      value: TABS_TYPES.SAUCE,
      label: TABS_TYPES_LOCALE[TABS_TYPES.SAUCE],
    },
    {
      value: TABS_TYPES.MAIN,
      label: TABS_TYPES_LOCALE[TABS_TYPES.MAIN],
    },
  ]

  function isActiveTab(tabName: string): boolean {
    return activeTabItem === tabName
  }

  function setCurrent(newTabName: TIngredientTypes) {
    if (isActiveTab(newTabName)) return

    callback(newTabName)
  }

  return (
    <div style={{ display: "flex" }} className="mb-10">
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
