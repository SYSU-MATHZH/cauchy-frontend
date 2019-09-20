const parseDate = (date) => `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`

const parseSchoolYear = ({begin, end}) => `${begin.getFullYear()}~${end.getFullYear()}学年`

const isInThisSchoolYear = ({begin, end}) => (item) => begin <= item.date && item.date <= end

export { parseDate, parseSchoolYear, isInThisSchoolYear }