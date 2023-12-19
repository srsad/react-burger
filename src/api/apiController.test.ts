import { checkResponse } from './apiController'

function mockResponse(status: boolean, message: string): Response {
  // Игнор для того чтоб не писать полный объект Response
  // @ts-ignore
  return {
    ok: status,
    json: () => Promise.resolve(message),
    status: status ? 200 : 400,
  }
}

describe('check checkResponse function', () => {
  test('should return success', async () => {
    const responseMessage = JSON.stringify({ result: 'OK' })
    const result = checkResponse(mockResponse(true, responseMessage))

    await expect(result).resolves.toEqual(responseMessage)
  })

  test('should return error', async () => {
    const responseMessage = 'Status: 400. Error message.'
    const result = checkResponse(mockResponse(false, responseMessage))

    await expect(result).rejects.toEqual(responseMessage)
  })
})
