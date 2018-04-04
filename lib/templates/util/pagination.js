export const pagination = {
  itemsPerPage: 20,
  page: 1,
  sortBy: 'updatedAt',
  descending: true
}

export const getSkipFirst = (pagination) => {
  const {page, itemsPerPage} = pagination
  const first = itemsPerPage
  const skip = (page - 1) * first
  return {
    first, skip
  }
}
