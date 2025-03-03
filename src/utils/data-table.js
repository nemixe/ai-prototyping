export const makeSource = (source) => {
  if (!source) return;
  return {
    data: source.data.items,
    meta: {
      page: source.data.meta.page,
      pageSize: source.data.meta.per_page,
      total: source.data.meta.total,
    },
  };
};
