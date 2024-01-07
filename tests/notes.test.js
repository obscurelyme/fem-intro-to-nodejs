function add(a, b) {
  return a + b
}

test('add takes two numbers and returns their sum', () => {
  const result = add(1, 2)

  expect(result).toBe(3)
})