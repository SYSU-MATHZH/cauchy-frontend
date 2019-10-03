const parseDate = (date) => `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`

const parseSchoolYear = ({begin, end}) => `${begin.getFullYear()}~${end.getFullYear()}学年`

const isInThisSchoolYear = ({begin, end}) => (item) => begin <= item.date && item.date <= end

export { parseDate, parseSchoolYear, isInThisSchoolYear }