const formatDigit = (n) => (n > 9 ? n : `0${n}`)

export default () => {
  const today = new Date()
  return `${today.getFullYear()}-${formatDigit(
    today.getMonth() + 1
  )}-${formatDigit(today.getDate())}`
}
