import { getDataTestId } from '../utils'

const ingredient = {
  name: 'Краторная булка N-200i',
  guid: '643d69a5c3f7b9001cfa093c',
}

describe('Открытие модального окна с описанием ингредиента', () => {
	beforeEach(() => {
		cy.visit('/')
  })

  it('Должен открывать/закрывать модальное окно сдетальной информацией об ингридиенте', () => {
    cy.get(getDataTestId('ingredients-list')).as("ingredients")

    cy.get('@ingredients').contains(ingredient.name).click()
    cy.contains('Детали ингредиента')
    cy.contains(ingredient.name)
    cy.url().should('include', `/ingredients/${ingredient.guid}`)
    cy.wait(3000)
    cy.get(getDataTestId('close-modal')).click()
  })
})
