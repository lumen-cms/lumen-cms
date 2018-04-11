export const pagination = {
  rowsPerPage: 20,
  page: 1,
  sortBy: 'updatedAt',
  descending: true
}

export const getSkipFirst = (pag) => {
  const {page, rowsPerPage} = pag
  const first = rowsPerPage
  const skip = (page - 1) * first
  return {
    first, skip
  }
}
