import { getDataTestId } from '../utils'

const MOCK_ACCESS_TOKEN = 'Bearer ' + crypto.randomUUID()
const MOCK_REFRESH_TOKEN = crypto.randomUUID()

function orderBuilderFilling() {
  cy.get(getDataTestId('ingredients-list')).as("ingredients")
  cy.get(getDataTestId('constructor')).as("constructor")

  // Булочка
  cy.get('@ingredients')
    .contains('Краторная булка N-200i')
    .trigger("dragstart")
  
  cy.get("@constructor")
    .trigger("drop")

  // Ингредиенты
  for (let i = 1; i <= 2; i++) {
    cy.get('@ingredients')
      .contains('Соус фирменный Space Sauce')
      .trigger("dragstart")
    
    cy.get("@constructor")
      .trigger("drop")      
  }

  cy.get('@ingredients')
    .contains('Биокотлета из марсианской Магнолии')
    .trigger("dragstart")
  
  cy.get("@constructor")
    .trigger("drop")
}

describe('Работа конструктора', () => {
	beforeEach(() => {
    cy.visit('/')

    window.localStorage.setItem('accessToken', MOCK_ACCESS_TOKEN)
		window.localStorage.setItem('refreshToken', MOCK_REFRESH_TOKEN)

		cy.intercept('GET', `/api/auth/user`, {
			fixture: 'user.json',
		})

		cy.intercept('POST', `/api/orders`, {
			fixture: 'order.json',
		}).as('postOrder')
  })

  it('Доступность страницы конструктора', () => {
    cy.visit('/')
  })
  
  it('Должен перетаскивать ингредиенты в конструктор', () => {
    orderBuilderFilling()
  })

  it('Должено поизойти оформление заказа + модальное окно с иформацией о заказе', () => {
    orderBuilderFilling()

    cy.get(getDataTestId('order-button')).trigger("click")

    cy.wait('@postOrder')
    cy.contains('29520')
    cy.wait(2000)
    
    cy.get(getDataTestId('close-modal')).click()
  })
})
