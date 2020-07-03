import moment from 'moment'

const formatDigit = (n) => (n > 9 ? n : `0${n}`)

export default (format) => {
  const today = new Date()
  const day = `${today.getFullYear()}-${formatDigit(
    today.getMonth() + 1
  )}-${formatDigit(today.getDate())}`

  return format ? moment(day).format('LL') : day
}
