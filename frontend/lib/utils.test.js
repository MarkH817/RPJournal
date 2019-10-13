import { objectExtract } from './utils'

describe('Utils', () => {
  test('objectReduce', () => {
    const actual = objectExtract({ useful: true, something: 'something' }, [
      'useful',
      'non-exist'
    ])
    const expected = { useful: true }

    expect(actual).toMatchObject(expected)
  })
})
